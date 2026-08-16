const Activity = require("../models/Activity");

const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error("Get activities error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
    });
  }
};

module.exports = {
  getMyActivities,
};