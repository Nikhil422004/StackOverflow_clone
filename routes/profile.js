const express = require("express");
const auth = require("../middleware/auth");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const router = express.Router();

// Get logged-in user's profile
router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find({ user: req.user.id }).sort({
      date: -1,
    });
    const answers = await Answer.find({ user: req.user.id }).sort({ date: -1 });
    res.render("profile", { questions, answers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

module.exports = router;
