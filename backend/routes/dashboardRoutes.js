const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in student's dashboard statistics
router.get("/stats", protect, getDashboardStats);

module.exports = router;