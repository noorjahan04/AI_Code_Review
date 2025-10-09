import React, { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const AIReview = ({ code, language }) => {
  const [review, setReview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    if (!code || !code.trim()) return;

    setIsAnalyzing(true);

    try {
      const response = await axios.post('https://codeauditai.onrender.com/ai/check', {
        code,
        language,
      });

      setReview(response.data);
    } catch (error) {
      console.error('Error analyzing code:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* Header with button on the right side */}
      <div className="section-header">
        <div className="section-header-left">
          <Bot size={16} />
          <span className="section-title">AI Review</span>
          <Sparkles size={14} className="sparkle-icon" />
        </div>
        <button
          onClick={analyzeCode}
          disabled={!code || !code.trim() || isAnalyzing}
          className="review-btn"
        >
          <Bot size={16} />
          {isAnalyzing ? 'Analyzing...' : 'Review Code'}
        </button>
      </div>

      {/* Content area */}
      <div className="ai-review-container">
        {isAnalyzing ? (
          <div className="analyzing-state">
            <div className="analysis-loader">
              <div className="pulse-ring"></div>
              <Bot size={24} />
            </div>
            <p>Analyzing your code...</p>
          </div>
        ) : review ? (
          <div className="review-result">
            <div className="markdown-content">
              <ReactMarkdown>
                {typeof review === 'string' ? review : JSON.stringify(review, null, 2)}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <Bot size={32} />
            <p>Click "Review Code" to get AI-powered insights and suggestions!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AIReview;