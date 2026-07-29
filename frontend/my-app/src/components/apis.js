import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-code-review-ttod.onrender.com", // your backend
});

const JDOODLE_LANGUAGE_MAP = {
  javascript: { language: "nodejs", versionIndex: "4" },
  typescript: { language: "typescript", versionIndex: "4" },
  nodejs: { language: "nodejs", versionIndex: "4" },
  python: { language: "python3", versionIndex: "4" },
  java: { language: "java", versionIndex: "4" },
  cpp: { language: "cpp17", versionIndex: "1" },
  c: { language: "c", versionIndex: "5" },
};

export const executeCode = async (language, sourceCode) => {
  if (language === "html" || language === "css") {
    return {
      run: {
        output: `${language.toUpperCase()} cannot be executed.`,
      },
    };
  }

  const jdoodleLang = JDOODLE_LANGUAGE_MAP[language] || { language, versionIndex: "0" };

  const response = await API.post("/execute", {
    language: jdoodleLang.language,
    versionIndex: jdoodleLang.versionIndex,
    files: [
      {
        content: sourceCode,
      },
    ],
  });

  return response.data;
};