const { askGemini } = require("../services/geminiService");
const { getFileFromS3 } = require("../services/s3Service");
const { extractTextFromPDF } = require("../services/pdfService");

const Note = require("../models/Note");
const Activity = require("../models/Activity");


// =========================
// TEST AI
// =========================

const testAI = async (req, res) => {
  try {
    const answer = await askGemini(
      "Explain cloud computing in simple words for a college student."
    );

    res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("AI test error:", error);

    res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
};


// =========================
// ASK AI ABOUT NOTE
// =========================

const askAI = async (req, res) => {
  try {
    const { question, noteId } = req.body;

    // Check question
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    // Check note
    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Please select a note",
      });
    }

    // Find student's note
    const note = await Note.findOne({
      _id: noteId,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Download PDF from S3
    const pdfBuffer = await getFileFromS3(note.s3Key);

    // Extract PDF text
    const pdfText = await extractTextFromPDF(pdfBuffer);

    if (!pdfText || !pdfText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF",
      });
    }

    // Limit text sent to Gemini
    const noteText = pdfText.substring(0, 30000);

    // AI prompt
    const prompt = `
You are AI StudyMate, an AI learning assistant.

Answer the student's question using the study note provided below.

Rules:
- Use simple language suitable for a college student.
- Base the answer primarily on the provided study note.
- If the answer is not available in the note, clearly say that it is not mentioned in the uploaded note.
- Give examples when useful.
- Do not make up information.

STUDY NOTE:
${noteText}

STUDENT QUESTION:
${question}
`;

    // Get AI answer
    const answer = await askGemini(prompt);

    // Save activity in MongoDB
    await Activity.create({
      userId: req.user._id,
      noteId: note._id,
      noteTitle: note.title,
      type: "question",
      question: question.trim(),
      result: answer,
    });

    // Send response
    res.status(200).json({
      success: true,
      question,
      noteTitle: note.title,
      answer,
    });

  } catch (error) {
    console.error("Ask AI error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to answer the question",
    });
  }
};


// =========================
// SUMMARIZE NOTE
// =========================

const summarizeNote = async (req, res) => {
  try {
    const { noteId } = req.body;

    // Check note ID
    if (!noteId) {
      return res.status(400).json({
        success: false,
        message: "Please select a note",
      });
    }

    // Find student's note
    const note = await Note.findOne({
      _id: noteId,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Download PDF from S3
    const pdfBuffer = await getFileFromS3(note.s3Key);

    // Extract PDF text
    const pdfText = await extractTextFromPDF(pdfBuffer);

    if (!pdfText || !pdfText.trim()) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from this PDF",
      });
    }

    // Limit text sent to Gemini
    const noteText = pdfText.substring(0, 30000);

    // AI summary prompt
    const prompt = `
You are AI StudyMate, an AI learning assistant for college students.

Create a useful study summary of the following study note.

Requirements:
- Use simple language.
- Identify the main concepts.
- Use headings and bullet points.
- Include important definitions.
- Include important examples.
- Do not add information that is not present in the note.
- Make the summary useful for exam revision.

STUDY NOTE:

${noteText}
`;

    // Generate summary
    const summary = await askGemini(prompt);

    // Save summary activity in MongoDB
    await Activity.create({
      userId: req.user._id,
      noteId: note._id,
      noteTitle: note.title,
      type: "summary",
      question: "",
      result: summary,
    });

    // Send response
    res.status(200).json({
      success: true,
      noteTitle: note.title,
      summary,
    });

  } catch (error) {
    console.error("Summarize error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate summary",
    });
  }
};


// =========================
// EXPORT CONTROLLERS
// =========================

module.exports = {
  testAI,
  askAI,
  summarizeNote,
};