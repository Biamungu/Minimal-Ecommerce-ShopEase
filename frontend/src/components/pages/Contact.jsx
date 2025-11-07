import React, { useState } from 'react';
import './Contact.css'; // ✅ Import the CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">Get in touch with our team</p>
      </div>

      <div className="contact-content">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="form-textarea"
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="info-item">
              <h3>📍 Address</h3>
              <p>123 Commerce Street<br />Shopping District<br />City, State 12345</p>
            </div>
            <div className="info-item">
              <h3>📞 Phone</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className="info-item">
              <h3>✉️ Email</h3>
              <p>support@shopease.com</p>
            </div>
            <div className="info-item">
              <h3>🕒 Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;