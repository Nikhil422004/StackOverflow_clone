const express = require("express");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const auth = require("../middleware/auth");
const router = express.Router();

// Post an answer to a specific question
router.post("/:questionId", auth, async (req, res) => {
  const { content } = req.body;
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ msg: "Question not found" });
    }
    const newAnswer = new Answer({
      content,
      question: req.params.questionId,
      user: req.user.id,
    });
    await newAnswer.save();
    res.redirect(`/questions/${req.params.questionId}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
