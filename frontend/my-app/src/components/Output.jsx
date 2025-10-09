import React from 'react';
import { Terminal, Loader } from 'lucide-react';

const Output = ({ output, isRunning, error, isError }) => {
  return (
    <div className="output-section">
      <div className="output-header">
        <Terminal size={16} />
        <span className="section-title">Output</span>
        {isRunning && <Loader size={16} className="animate-spin" />}
      </div>
      
      <div className="output-container">
        {isRunning ? (
          <div className="output-loading">
            <div className="loading-spinner">
              <Loader size={20} className="animate-spin" />
            </div>
            <span>Executing code...</span>
          </div>
        ) : (
          <pre className={`output-content ${isError ? 'error' : ''}`}>
            {isError ? error : (output || 'Click "Run Code" to see output here...')}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Output;