// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css'; // Ensure this path is correct and matches your project structure
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import App from './App';

// Get the root element from your HTML
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Render your application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
