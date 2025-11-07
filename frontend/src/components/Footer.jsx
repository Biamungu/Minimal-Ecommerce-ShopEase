import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopEase</h3>
          <p>Your one-stop destination for all your shopping needs. Quality products at affordable prices with exceptional customer service.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/shipping">Shipping Information</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📧 Email: support@shopease.com</p>
          <p>📞 Phone: (555) 123-4567</p>
          <p>📍 Address: 123 Commerce St, City, State 12345</p>
          <p>🕒 Hours: Mon-Fri 9AM-6PM</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 ShopEase. All rights reserved. | Built with MERN Stack</p>
      </div>
    </footer>
  );
};

export default Footer;