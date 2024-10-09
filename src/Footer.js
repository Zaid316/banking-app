import React from 'react';
import './footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Maverick Bank. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
