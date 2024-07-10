const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { jwtSecret } = require("../config");
const router = express.Router();

// Register
router.get("/register", (req, res) => res.render("register", { error: null }));

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .render("register", { error: "User already exists" });
    }
    user = new User({ username, email, password });
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.redirect("/auth/login");
    });
  } catch (err) {
    console.error(`Register route error: ${err.message}`);
    res.status(500).send("Server error");
  }
});

// Login
router.get("/login", (req, res) => res.render("login", { error: null }));

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("login", { error: "invalid_usrcredentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .render("login", { error: "invalid_pwdcredentials" });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/");
    });
  } catch (err) {
    console.error(`Login route error: ${err.message}`);
    res.status(500).send("Server error");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
