/** @format */

const express = require("express");

const app = express();

app.use(express.json());

const postController = require("./controller/post.controller");
const userController = require("./controller/user.controller");
const { register, login } = require("./controller/auth.controller");

app.post("/register", register);
app.post("/login", login);
app.use("/posts", postController);
app.use("/user", userController);

module.exports = app;
