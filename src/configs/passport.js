/** @format */

require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../model/user.model");
const { newToken } = require("../controller/auth.controller");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "785539319249-c4mse5mkucm2qlvsml85fq6f6ugm22lb.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();

      if (!user) {
        user = await User.create({
          fullname: profile?._json?.name,
          email: profile?._json?.email,
          password: uuidv4(),
          roles: ["seller"],
        });
      }

      const token = newToken(user);

      return done(null, { user, token });
    }
  )
);
module.exports = passport;
