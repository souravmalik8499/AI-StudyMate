const { uploadFileToS3 } = require("../services/s3Service");
const Note = require("../models/Note");

const uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a PDF file",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    const title = req.body.title;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Note title is required",
      });
    }

    // Upload PDF to S3
    const result = await uploadFileToS3(req.file);

    // Save note information in MongoDB
    const note = await Note.create({
      userId: req.user?._id || null,
      title: title.trim(),
      fileName: req.file.originalname,
      s3Key: result.key,
      bucketName: result.bucket,
    });

    res.status(201).json({
      success: true,
      message: "Note uploaded successfully",
      note: {
        id: note._id,
        title: note.title,
        fileName: note.fileName,
        s3Key: note.s3Key,
        bucketName: note.bucketName,
        createdAt: note.createdAt,
      },
    });
  } catch (error) {
    console.error("Upload note error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload note",
    });
  }
};

module.exports = {
  uploadNote,
};