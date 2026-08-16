const Note = require("../models/Note");
const Activity = require("../models/Activity");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const notesUploaded = await Note.countDocuments({
      userId,
    });

    const aiQuestions = await Activity.countDocuments({
      userId,
      type: "question",
    });

    const summaries = await Activity.countDocuments({
      userId,
      type: "summary",
    });

    const recentActivities = await Activity.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        notesUploaded,
        aiQuestions,
        summaries,
      },
      recentActivities,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};