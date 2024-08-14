import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <a 
        href="https://paolofiol.github.io/survey/index.html" 
        target="_blank" 
        rel="noopener noreferrer"
        style={linkStyle}
      >
        Contact Me
      </a>
      <span style={bulletStyle}> • </span>
      <span>2024 Paolo Fiol</span>
    </footer>
  );
}

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
  position: 'fixed',
  bottom: '0',
  width: '100%',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: '5px',
};

const bulletStyle = {
  margin: '0 5px',
};

export default Footer;
