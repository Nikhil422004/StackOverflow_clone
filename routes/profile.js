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
    console.error(`Server error in profile.js: ${err.message}`);
    res.status(500).send("Server error in profile.js");
  }
});

// Delete Question Route
router.post("/questions/:id/delete", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      console.error(`Question not found with ID: ${req.params.id}`);
      return res.status(404).send("Question not found");
    }
    if (question.user.toString() === req.user.id) {
      await Answer.deleteMany({ question: req.params.id }); // Delete related answers
      await Question.deleteOne({ _id: req.params.id });
      console.log(
        `Question with ID ${req.params.id} and its related answers deleted`
      );
      res.redirect("/profile");
    } else {
      console.error(
        `User ${req.user.id} unauthorized to delete question ${req.params.id}`
      );
      res.status(403).send("Forbidden");
    }
  } catch (err) {
    console.error(
      `Error deleting question with ID ${req.params.id}: ${err.message}`
    );
    res.status(500).send("Server error in delete question");
  }
});

// Delete Answer Route
router.post("/answers/:id/delete", auth, async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      console.error(`Answer not found with ID: ${req.params.id}`);
      return res.status(404).send("Answer not found");
    }
    if (answer.user.toString() === req.user.id) {
      await Answer.deleteOne({ _id: req.params.id });
      console.log(`Answer with ID ${req.params.id} deleted`);
      res.redirect("/profile");
    } else {
      console.error(
        `User ${req.user.id} unauthorized to delete answer ${req.params.id}`
      );
      res.status(403).send("Forbidden");
    }
  } catch (err) {
    console.error(
      `Error deleting answer with ID ${req.params.id}: ${err.message}`
    );
    res.status(500).send("Server error");
  }
});

module.exports = router;
