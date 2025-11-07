import React from 'react';
import './About.css'; // ✅ Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About ShopEase</h1>
        <p className="about-subtitle">Learn more about our story and mission</p>
      </div>

      <div className="about-content">
        <div className="about-story">
          <div className="about-story-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, ShopEase was born from a simple idea: shopping should be easy, enjoyable, and accessible to everyone. 
              We believe that everyone deserves access to quality products at fair prices.
            </p>
            <p>
              What started as a small online store has grown into a trusted destination for thousands of customers 
              looking for the latest electronics, fashionable items, and home essentials.
            </p>
          </div>
          <div>
            <div className="about-quote">
              "Making online shopping simple, secure, and satisfying for everyone."
            </div>
          </div>
        </div>

        <div className="about-mission">
          <h2>Our Mission</h2>
          <div className="mission-grid">
            <div className="mission-item">
              <span className="mission-icon">🎯</span>
              <h3>Quality Products</h3>
              <p>Curated selection of high-quality items from trusted brands</p>
            </div>
            <div className="mission-item">
              <span className="mission-icon">🚚</span>
              <h3>Fast Shipping</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
            <div className="mission-item">
              <span className="mission-icon">💝</span>
              <h3>Customer First</h3>
              <p>Exceptional service and support for every customer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;