const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answers");
const profileRoutes = require("./routes/profile");
const Question = require("./models/Question");
const app = express();
const PORT = process.env.PORT || 3000;
const { mongoURI, jwtSecret } = require("./config");
const auth = require("./middleware/auth");

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(auth); // Apply the auth middleware globally

// Serve static files
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/profile", profileRoutes);

// Home route
app.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", ["username"])
      .sort({ date: -1 });
    res.render("index", { questions, user: res.locals.user });
  } catch (err) {
    console.error(`Home route error: ${err.message}`);
    res.status(500).send("Server error");
  }
});

// Add question page
app.get("/add-question", auth, (req, res) => {
  res.render("add-question");
});

// Remove question
app.get("/remove-question/:id", auth, async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.error(`Remove question error: ${err.message}`);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
