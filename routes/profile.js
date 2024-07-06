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
    const answers = await Answer.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("question");
    res.render("profile", { questions, answers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

// Delete Question Route
router.post("/questions/:id/delete", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (question.user.toString() === req.user.id) {
      await question.remove();
      res.redirect("/profile");
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (err) {
    console.error(`Error deleting question: ${err.message}`);
    res.status(500).send("Server error");
  }
});

// Delete Answer Route
router.post("/answers/:id/delete", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (answer.user.toString() === req.user.id) {
      await answer.remove();
      res.redirect("/profile");
    } else {
      res.status(403).send("Forbidden");
    }
  } catch (err) {
    console.error(`Error deleting answer: ${err.message}`);
    res.status(500).send("Server error");
  }
});

module.exports = router;
