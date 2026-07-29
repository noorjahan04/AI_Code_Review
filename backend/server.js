const express = require("express");
const router = require("./routes/Ai.routes");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-code-review-ebon.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working...");
});

// 🔥 AI Review Route
app.use("/ai", router);

// 🔥 Compiler Execution Route (via JDoodle)
app.post("/execute", async (req, res) => {
  try {
    const { language, versionIndex, files } = req.body;
    const script = files?.[0]?.content || "";

    const response = await axios.post("https://api.jdoodle.com/v1/execute", {
      clientId: process.env.JDOODLE_CLIENT_ID,
      clientSecret: process.env.JDOODLE_CLIENT_SECRET,
      script,
      language,
      versionIndex,
      stdin: req.body.stdin || "",
    });

    const { output, statusCode } = response.data;
    const isError = statusCode !== 200;

    res.json({
      run: {
        output: isError ? "" : output,
        stderr: isError ? output : "",
      },
    });
  } catch (error) {
    console.error("JDoodle Error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(
      error.response?.data || { error: "Execution failed" }
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});