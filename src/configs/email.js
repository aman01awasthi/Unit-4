/** @format */

const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "e4ea795680f04e",
    pass: "ecae050f7dcaf6",
  },
});
