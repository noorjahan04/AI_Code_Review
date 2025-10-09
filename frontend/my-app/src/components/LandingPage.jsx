import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './styles/LandingPage.css';
import {useNavigate} from 'react-router-dom'

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  return {
    isDarkMode,
    toggleTheme: () => setIsDarkMode(!isDarkMode)
  };
};

const LandingPage = () => {
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`);

  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate()

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="app" data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className="background">
        <div className="stars"></div>
        <div className="grid-overlay"></div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">CodeAuditAI</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Code with
            <span className="gradient-text"> AI-Powered Reviews</span>
          </h1>
          
          <p className="hero-description">
            Get instant, intelligent code reviews that help you write better, 
            cleaner, and more efficient code. Let AI analyze your code and 
            provide professional feedback in seconds.
          </p>

          <button className="cta-button" onClick={() => navigate("/compiler")}>
            Start Reviewing Code
          </button>
        </div>

        <div className="demo-section">
          <div className="demo-container">
            <div className="code-input-section">
              <h3 className="section-title">Paste Your Code Here</h3>
              <div className="code-editor">
                <div className="editor-header">
                  <div className="editor-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="file-name">example.js</span>
                </div>
                <textarea
                  className="code-textarea"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Paste your code here..."
                />
                <button className="review-button">
                  🔍 Analyze Code
                </button>
              </div>
            </div>

            <div className="preview-section">
              <div className="preview-container">
                <div className="preview-header">
                  <h4>AI Code Analysis</h4>
                  <span className="status-badge">✨ Ready</span>
                </div>
                <div className="preview-content">
                  <div className="analysis-item">
                    <div className="analysis-icon good">✅</div>
                    <div className="analysis-text">
                      <strong>Code Structure:</strong> Function is well-defined
                    </div>
                  </div>
                  <div className="analysis-item">
                    <div className="analysis-icon warning">⚠️</div>
                    <div className="analysis-text">
                      <strong>Performance:</strong> Consider memoization for optimization
                    </div>
                  </div>
                  <div className="analysis-item">
                    <div className="analysis-icon suggestion">💡</div>
                    <div className="analysis-text">
                      <strong>Suggestion:</strong> Add input validation for edge cases
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Why Choose AICode Reviewer?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Get comprehensive code reviews in seconds, not hours</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Accurate Analysis</h3>
              <p>AI-powered insights that catch bugs and suggest improvements</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Your code stays private and secure throughout the review process</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;