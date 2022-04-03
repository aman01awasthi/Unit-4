/** @format */

const express = require("express");
const passport = require("./configs/passport");
const app = express();

app.use(express.json());

const postController = require("./controller/post.controller");
const userController = require("./controller/user.controller");
const { register, login } = require("./controller/auth.controller");

app.post("/register", register);
app.post("/login", login);
// app.use(passport.initialize());

// passport.serializeUser(function (user, callback) {
//   callback(null, user);
// });

// passport.deserializeUser(function (user, callback) {
//   callback(null, user);
// });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", (req, res) => {
  return res.send("failure");
});

app.use("/posts", postController);
app.use("/user", userController);

module.exports = app;
