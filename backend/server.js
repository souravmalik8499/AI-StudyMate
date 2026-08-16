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

// Home API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI StudyMate API is running",
  });
});

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));

// Upload
app.use("/api/upload", require("./routes/uploadRoutes"));

// Notes
app.use("/api/notes", require("./routes/notesRoutes"));

// AI
app.use("/api/ai", require("./routes/aiRoutes"));
// Activities
app.use("/api/activities", require("./routes/activityRoutes"));
// Dashboard
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});