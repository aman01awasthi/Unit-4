/** @format */

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [{ type: String, required: true }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//check before register
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

//check before login
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("user", userSchema);
