/** @format */

const { Schema, model } = require("mongoose");

const gallerySchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  image_urls: [{ type: String, required: true }],
});

module.exports = model("gallery", gallerySchema);
