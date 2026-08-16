const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askGemini = async (prompt) => {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    return interaction.output_text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get response from Gemini");
  }
};

module.exports = {
  askGemini,
};