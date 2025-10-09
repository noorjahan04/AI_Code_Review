import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CompilerDashboard from './components/CompilerDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Import Routes and Route
import './index.css';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/compiler" element={<CompilerDashboard />} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;