import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANGUAGE_VERSIONS } from './constants';

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  

  const languages = Object.entries(LANGUAGE_VERSIONS);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };


    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selectedLanguage) => {
    onSelect(selectedLanguage);
    setIsOpen(false);
  };

  const getCurrentLanguageInfo = () => {
    const langInfo = languages.find(([lang]) => lang === language);
    return langInfo || [language, ''];
  };

  const [currentLang, currentVersion] = getCurrentLanguageInfo();

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="language-info">
          <span className="language-name">{currentLang}</span>
          <span className="language-version">v{currentVersion}</span>
        </div>
        <ChevronDown 
          size={16} 
          className={`chevron ${isOpen ? 'open' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(([lang, version]) => (
            <button
              key={lang}
              className={`language-option ${lang === language ? 'active' : ''}`}
              onClick={() => handleSelect(lang)}
            >
              <div className="language-info">
                <span className="language-name">{lang}</span>
                <span className="language-version">v{version}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;