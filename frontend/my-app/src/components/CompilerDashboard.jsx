import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import AIReview from "./AIReviewer";
import { CODE_SNIPPETS } from "./constants";
import { Sun, Moon, Play, Download, Copy } from "lucide-react";
import "./styles/CompilerDashboard.css";
import { executeCode } from "./apis";
import { useNavigate } from "react-router-dom";

const CompilerDashboard = () => {
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const editorRef = useRef();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(CODE_SNIPPETS[language]);
  }, [language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setError("");
    setIsError(false);

    try {
      const result = await executeCode(language, value);

      if (result.run && result.run.output) {
        setOutput(result.run.output);
      } else if (result.run && result.run.stderr) {
        setError(result.run.stderr);
        setIsError(true);
        setOutput("");
      } else {
        setOutput("No output");
      }
    } catch (error) {
      console.error("Execution error:", error);
      setError(error.message || "An error occurred while executing the code");
      setIsError(true);
      setOutput("");
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(value);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([value], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language === "javascript" ? "js" : language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="compiler-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <span
            className="logo-icon"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            🤖
          </span>
          <h1
            className="dashboard-title"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            CodeAuditAI
          </h1>
          <LanguageSelector
            language={language}
            onSelect={handleLanguageSelect}
          />
        </div>

        <div className="header-actions">
          <button className="action-btn" onClick={copyCode} title="Copy Code">
            <Copy size={18} />
          </button>
          <button
            className="action-btn"
            onClick={downloadCode}
            title="Download Code"
          >
            <Download size={18} />
          </button>
          <button
            className={`run-btn ${isRunning ? "running" : ""}`}
            onClick={runCode}
            disabled={isRunning}
          >
            <Play size={18} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="editor-panel">
          <div className="editor-section">
            <div className="editor-header">
              <span className="section-title">Code Editor</span>
            </div>
            <div className="editor-container">
              <Editor
                height="100%"
                theme={isDarkMode ? "vs-dark" : "light"}
                language={language}
                value={value}
                onMount={onMount}
                onChange={(val) => setValue(val || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>
          </div>

          <Output
            output={output}
            isRunning={isRunning}
            error={error}
            isError={isError}
          />
        </div>

        <div className="ai-panel">
          <AIReview code={value} language={language} />
        </div>
      </div>
    </div>
  );
};

export default CompilerDashboard;