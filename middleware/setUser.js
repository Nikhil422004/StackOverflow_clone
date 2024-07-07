// middleware/setUser.js
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const setUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      res.locals.user = decoded; // Attach user information to res.locals
    } catch (err) {
      res.locals.user = null;
    }
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports = setUser;
