require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

const SYSTEM_INSTRUCTION = fs.readFileSync(
  path.join(__dirname, "../services/systemInstruction.md"),
  "utf-8"
);

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_AI_API_KEY });

async function generateContent(prompt) {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
    });
    return result.text;
  } catch (error) {
    console.error("Error generating content:", error.message);
    return "⚠️ Content generation failed. Check logs.";
  }
}

module.exports = generateContent;