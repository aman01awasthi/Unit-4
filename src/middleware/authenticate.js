/** @format */

require("dotenv").config();

const jwt = require("jsonwebtoken");
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "sdfbasdfbasewffgsgfe", function (err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = async (req, res, next) => {
  //check if authentication token is inside the request headers
  if (!req.headers?.authorization) {
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });
  }

  //if yes then check that its a Bearer Token
  const bearerToken = req.headers.authorization;

  if (!bearerToken.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });

  //uf yes then verify the token and get the user from the token
  const token = bearerToken.split(" ")[1];

  try {
    const user = await verifyToken(token);
    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Please provide a valid authorization token" });
  }
};
