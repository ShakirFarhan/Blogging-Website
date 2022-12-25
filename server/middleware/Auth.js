const jwt = require("jsonwebtoken");
const secretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";
const Users = require("../models/user.js");
const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const verifyToken = jwt.verify(token, secretKey);
    const rootUser = await Users.findOne({ _id: verifyToken._id });
    if (!rootUser) {
      res.status(422).json({ error: "user not found" });
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.json({ status: 401, message: "UnAuthorise User" });
    console.log(error);
  }
};
module.exports = authentication;
