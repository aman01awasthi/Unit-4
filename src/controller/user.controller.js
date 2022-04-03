/** @format */

const express = require("express");

const router = express.Router();
const User = require("../model/user.model");

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
