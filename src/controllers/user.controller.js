const EventEmitter = require("events");
const path = require("path");

const express = require("express");

const User = require("../models/user.model");
const { verificationMail, welcomeMail } = require("../utils");

const router = express.Router();

const eventEmitter = new EventEmitter();

router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body);
    eventEmitter.on("User Registered", welcomeMail);
    eventEmitter.emit("User Registered", {
      from: "admin@masai.com",
      to: user.email,
      user,
      attachments: [
        {
          // file on disk as an attachment
          filename: "name.txt",
          path: path.join(__dirname, "../name.txt"),
        },
      ],
      alternatives: [
        {
          contentType: "text/html",
          path: path.join(__dirname, "../name.html"),
        },
      ],
    });

    return res.send("Mail sent");
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// /users
router.get("", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;
    const query = { gender: "Female" };
    const users = await User.find(query) // 30 documents
      .skip((page - 1) * size) // page 1 first 15 documents
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find(query).countDocuments()) / size
    );

    return res.send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:gender", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 15;
    const query = { gender: req.params.gender };
    const users = await User.find(query) // 30 documents
      .skip((page - 1) * size) // page 1 first 15 documents
      .limit(size)
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await User.find(query).countDocuments()) / size
    );

    return res.send({ users, totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
