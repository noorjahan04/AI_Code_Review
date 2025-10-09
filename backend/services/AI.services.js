require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const SYSTEM_INSTRUCTION = fs.readFileSync(
  path.join(__dirname, "../services/systemInstruction.md"),
  "utf-8"
);


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_AI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: SYSTEM_INSTRUCTION
});

async function generateContent(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    return responseText;
  } catch (error) {
    console.error("Error generating content:", error.message);
    return "⚠️ Content generation failed. Check logs.";
  }
}

module.exports = generateContent;