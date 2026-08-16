const express = require("express");

const {
  getMyActivities,
} = require("../controllers/activityController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in student's activities
router.get("/my", protect, getMyActivities);

module.exports = router;