const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", AnswerSchema);
