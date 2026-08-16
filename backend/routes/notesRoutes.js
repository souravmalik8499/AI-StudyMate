const express = require("express");

const { getMyNotes } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my", protect, getMyNotes);

module.exports = router;