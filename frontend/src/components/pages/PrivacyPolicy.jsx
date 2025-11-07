import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ maxWidth: '1200px', margain: '0 auto', padding: '100px 20px 20px 20px' }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' }}>Privacy Policy</h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>Last updated: December 2024</p>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>1. Information We Collect</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            We collect information you provide directly to us, including:
          </p>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px', marginBottom: '15px' }}>
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address</li>
            <li><strong>Payment Information:</strong> Credit card details (processed securely by our payment partners)</li>
            <li><strong>Account Information:</strong> Username, password, purchase history</li>
            <li><strong>Communications:</strong> Customer service inquiries and feedback</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>2. How We Use Your Information</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Personalize your shopping experience</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>3. Information Sharing</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            We do not sell your personal information to third parties. We may share your information with:
          </p>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>Service Providers:</strong> Shipping carriers, payment processors, and IT services</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>4. Data Security</h2>
          <p style={{ lineHeight: '1.6' }}>
            We implement appropriate security measures to protect your personal information, including encryption, 
            secure servers, and regular security assessments. However, no method of transmission over the Internet 
            is 100% secure.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>5. Your Rights</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            You have the right to:
          </p>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Access and review your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request data portability</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>6. Cookies and Tracking</h2>
          <p style={{ lineHeight: '1.6' }}>
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
            and personalize content. You can control cookie settings through your browser preferences.
          </p>
        </div>

        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>7. Contact Us</h2>
          <p style={{ lineHeight: '1.6' }}>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <strong>Email:</strong> privacy@shopease.com
            <br />
            <strong>Phone:</strong> (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;