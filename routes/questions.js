const express = require("express");
const Question = require("../models/Question");
const auth = require("../middleware/auth");
const router = express.Router();
const Answer = require("../models/Answer");

// Add a new question
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newQuestion = new Question({
      title,
      description,
      user: req.user.id,
    });
    const question = await newQuestion.save();
    res.redirect("/");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a question by ID
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user", [
      "username",
    ]);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    const answers = await Answer.find({ question: req.params.id })
      .populate("user", ["username"])
      .sort({ date: -1 });
    res.render("question", { question, answers, user: req.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in question.ejs");
  }
});

module.exports = router;
