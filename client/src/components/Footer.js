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
  padding: '5px 0', // Reduced padding for a thinner footer
  backgroundColor: 'rgba(51, 51, 51, 0.6)', // More transparent background
  color: '#fff',
  position: 'fixed',
  bottom: '0',
  width: '100%',
  fontSize: '14px', // Compact font size
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
