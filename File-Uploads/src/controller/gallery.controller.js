/** @format */

const express = require("express");
const router = express.Router();
const Gallery = require("../model/gallery.model");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");
const fs = require("fs");
//get
router.get("", async (req, res) => {
  try {
    const gallery = await Gallery.find()
      .populate({ path: "user_id", select: { first_name: 1 } })
      .lean()
      .exec();

    return res.status(201).send(gallery);
  } catch (error) {
    return res.send(error);
  }
});

//post
router.post("", uploadMultiple(5, "image_urls"), async (req, res) => {
  try {
    const filesPath = req.files.map((file) => file.path);
    const gallery = await Gallery.create({
      user_id: req.body.user_id,
      image_urls: filesPath,
    });

    return res.status(201).send(gallery);
  } catch (error) {
    return res.send(error);
  }
});

//delete Gallery
router.delete("/:id", async (req, res) => {
  try {
    let { image_urls } = await Gallery.findById(req.params.id);
    console.log(image_urls);
    image_urls.map((img) => {
      fs.unlink(img, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("deleted");
        }
      });
    });

    const user = await Gallery.findByIdAndDelete(req.params.id);
    return res.status(201).send(user);
  } catch (error) {
    return res.send(error);
  }
});
module.exports = router;
