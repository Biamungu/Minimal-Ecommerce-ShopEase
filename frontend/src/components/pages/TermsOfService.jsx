import React from 'react';

const TermsOfService = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 20px 20px' }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' }}>Terms of Service</h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>Last updated: December 2024</p>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: '1.6' }}>
            By accessing and using ShopEase ("the Service"), you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to these terms, please do not use our Service.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>2. Use of Service</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            You agree to use the Service only for lawful purposes and in a way that does not infringe the rights 
            of, restrict or inhibit anyone else's use and enjoyment of the Service.
          </p>
          <p style={{ lineHeight: '1.6' }}>
            Prohibited behavior includes harassing or causing distress or inconvenience to any other user, 
            transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Service.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>3. Account Registration</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>You must be at least 18 years old to create an account</li>
            <li>You are responsible for maintaining the confidentiality of your account and password</li>
            <li>You agree to accept responsibility for all activities that occur under your account</li>
            <li>You must provide accurate and complete registration information</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>4. Products and Pricing</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>All products are subject to availability</li>
            <li>We reserve the right to discontinue any product at any time</li>
            <li>Prices are subject to change without notice</li>
            <li>We are not responsible for typographical errors in pricing</li>
            <li>Sales tax will be added to orders as required by law</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>5. Order Acceptance</h2>
          <p style={{ lineHeight: '1.6' }}>
            Your receipt of an electronic or other form of order confirmation does not signify our acceptance 
            of your order, nor does it constitute confirmation of our offer to sell. We reserve the right 
            to accept or decline your order for any reason.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>6. Intellectual Property</h2>
          <p style={{ lineHeight: '1.6' }}>
            All content included on this site, such as text, graphics, logos, images, and software, is the 
            property of ShopEase or its content suppliers and protected by international copyright laws.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>7. Limitation of Liability</h2>
          <p style={{ lineHeight: '1.6' }}>
            ShopEase shall not be liable for any indirect, incidental, special, consequential, or punitive 
            damages resulting from your use of or inability to use the service.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>8. Changes to Terms</h2>
          <p style={{ lineHeight: '1.6' }}>
            We reserve the right to modify these terms at any time. We will notify users of any changes by 
            posting the new Terms of Service on this page and updating the "Last updated" date.
          </p>
        </div>

        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>9. Contact Information</h2>
          <p style={{ lineHeight: '1.6' }}>
            Questions about the Terms of Service should be sent to us at:
            <br />
            <strong>Email:</strong> legal@shopease.com
            <br />
            <strong>Address:</strong> 123 Commerce Street, Shopping District, City, State 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;