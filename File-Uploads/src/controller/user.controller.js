/** @format */

const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");
const Gallery = require("../model/gallery.model");
const fs = require("fs");

//get
router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    // res.send(user);
    return res.render("home", { user });
  } catch (error) {
    return res.send(error);
  }
});

//post
router.post("", uploadSingle("profile_pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });

    return res.status(201).send(user);
  } catch (error) {
    return res.send(error);
  }
});

//update
router.patch("/:id", uploadSingle("profile_pic"), async (req, res) => {
  let user;
  try {
    if (req.file != undefined) {
      let searchImg = await User.findById(req.params.id);
      fs.unlink(searchImg.profile_pic, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted");
        }
      });
      user = await User.findByIdAndUpdate(
        req.params.id,
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          profile_pic: req.file.path,
        },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }
    return res.status(201).send(user);
  } catch (error) {
    return res.send(error);
  }
});

//delete
router.delete("/:id", uploadSingle("profile_pic"), async (req, res) => {
  try {
    // let { image_urls } = await Gallery.find({ user_id: { $eq: req.params.id } })
    //   .lean()
    //   .exec();

    // image_urls.map((img) => {
    //   fs.unlink(img, (err) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("deleted");
    //     }
    //   });
    // });
    // const userDelete = await Gallery.findByIdAndDelete({
    //   user_id: { $eq: req.params.id },
    // });

    let searchImg = await User.findById(req.params.id);
    fs.unlink(searchImg.profile_pic, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted");
      }
    });

    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(201).send(user);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
