const express = require("express");

const {
  testAI,
  askAI,
  summarizeNote,
} = require("../controllers/aiController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Gemini connection test
router.get("/test", testAI);

// Ask questions about a note
router.post("/ask", protect, askAI);

// Generate summary of a note
router.post("/summarize", protect, summarizeNote);

module.exports = router;