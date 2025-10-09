import axios from 'axios';
import { LANGUAGE_VERSIONS } from './constants';

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

const PISTON_LANGUAGE_MAP = {
  javascript: 'javascript',
  typescript: 'typescript',
  nodejs: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  html: 'html', 
  css: 'css',   
};

export const executeCode = async (language, sourceCode) => {
  if (language === 'html' || language === 'css') {
    return {
      run: {
        output: `${language.toUpperCase()} code cannot be executed. This is markup/styling code that needs to be rendered in a browser.`,
        stderr: null,
        code: 0
      }
    };
  }

  const pistonLanguage = PISTON_LANGUAGE_MAP[language] || language;
  
  const response = await API.post('/execute', {
    language: pistonLanguage,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        name: `main.${getFileExtension(language)}`,
        content: sourceCode,
      },
    ],
  });

  return response.data;
};

const getFileExtension = (language) => {
  const extensions = {
    javascript: 'js',
    typescript: 'ts',
    nodejs: 'js',
    python: 'py',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    html: 'html',
    css: 'css',
  };
  
  return extensions[language] || language;
};