const Note = require("../models/Note");

const getMyNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error("Get notes error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notes",
    });
  }
};

module.exports = {
  getMyNotes,
};