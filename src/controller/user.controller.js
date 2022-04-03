/** @format */

const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const { body, validationResult } = require("express-validator");
let formatError = require("../utils/formateErrors");

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(201).send(user);
  } catch (error) {
    return res.send(error);
  }
});

router.post(
  "",
  body("first_name").notEmpty().withMessage("First_name field is required"),
  body("last_name").notEmpty().withMessage("Last_name field is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be a valid email"),
  body("pincode")
    .notEmpty()
    .withMessage("Pincode is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Pincode should be exactly 6 numbers"),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error("Age should be between 1 and 100.");
      }
      return true;
    })
    .withMessage("Age should be between 1 and 100."),
  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isLength({ min: 4 })
    .custom((value) => {
      let gender = ["Male", "Female", "Others"];
      if (!gender.includes(value)) {
        throw new Error("Gender should be either Male, Female or Others");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: formatError(errors.array()) });
      }

      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (error) {
      return res.send(error);
    }
  }
);

module.exports = router;
