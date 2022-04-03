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
      if (req.user.user.roles.includes("admin")) {
        const post = await Post.find()
          .populate({ path: "user_id", select: { fullname: 1 } })
          .lean()
          .exec();
        return res.status(200).send(post);
      } else {
        const post = await Post.find({
          user_id: { $eq: req.user.user._id },
        }).populate({ path: "user_id", select: { fullname: 1 } });
        return res.status(200).send(post);
      }
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

router.patch(
  "/:postId",
  authenticate,
  authorize(["admin", "editor"]),
  async (req, res) => {
    try {
      if (req.user.user.roles.includes("admin")) {
        const post = await Post.findByIdAndUpdate(req.params.postId, req.body, {
          new: true,
        });
        return res.status(200).send(post);
      } else {
        const post = await Post.findById(req.params.postId);
        if (post.user_id == req.user.user._id) {
          const post = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            {
              new: true,
            }
          );
          return res.status(200).send(post);
        } else {
          return res
            .status(403)
            .send({ message: "You are not authorized to update this posts" });
        }
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.delete(
  "/:postId",
  authenticate,
  authorize(["admin", "editor"]),
  async (req, res) => {
    try {
      if (req.user.user.roles.includes("admin")) {
        const post = await Post.findByIdAndDelete(req.params.postId);
        return res.status(200).send(post);
      } else {
        const post = await Post.findById(req.params.postId);
        if (post.user_id == req.user.user._id) {
          const post = await Post.findByIdAndDelete(req.params.postId);
          return res.status(200).send(post);
        } else {
          return res
            .status(403)
            .send({ message: "You are not authorized to delete this posts" });
        }
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);
module.exports = router;
