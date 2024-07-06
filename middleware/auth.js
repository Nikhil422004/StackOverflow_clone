const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { jwtSecret } = require("../config");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.user.id).select("-password");
    res.locals.user = req.user; // Attach user to res.locals
  } catch (err) {
    console.error(`Auth middleware error: ${err.message}`);
  }
  next();
};
