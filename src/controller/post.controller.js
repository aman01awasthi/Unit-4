/** @format */

const express = require("express");

const router = express.Router();
const Post = require("../model/post.model");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.get(
  "",
  authenticate,
  authorize(["admin", "editor"]),
  async (req, res) => {
    try {
      const post = await Post.find().lean().exec();
      return res.status(200).send(post);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
