const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDatabase = require("./config/db");

dotenv.config();

const app = express();

connectDatabase();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI StudyMate API is running",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});