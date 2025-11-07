import React from 'react';

const Returns = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 20px 20px' }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' }}>Returns & Exchanges</h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>Hassle-free return policy</p>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '30px', textAlign: 'center', padding: '20px', background: '#d4edda', borderRadius: '8px' }}>
          <h2 style={{ color: '#155724', marginBottom: '10px' }}>30-Day Money-Back Guarantee</h2>
          <p style={{ color: '#155724', fontSize: '1.1rem' }}>Not satisfied? We make returns easy and risk-free.</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Return Policy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📅</div>
              <h3 style={{ color: '#2c3e50' }}>30 Days to Return</h3>
              <p>Return any item within 30 days of delivery</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔄</div>
              <h3 style={{ color: '#2c3e50' }}>Free Returns</h3>
              <p>Free return shipping on all US orders</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💳</div>
              <h3 style={{ color: '#2c3e50' }}>Full Refund</h3>
              <p>Receive your money back, no questions asked</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>How to Return an Item</h2>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Step 1: Request Return</h3>
              <p>Log into your account and go to "Orders" to initiate a return</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Step 2: Print Label</h3>
              <p>Print the prepaid shipping label we email you</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Step 3: Pack & Ship</h3>
              <p>Pack the item securely and drop it off at any shipping location</p>
            </div>
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '5px' }}>Step 4: Get Refund</h3>
              <p>Receive your refund within 3-5 business days after we process your return</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Return Conditions</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Items must be in original condition with tags attached</li>
            <li>Electronics must be returned in original packaging</li>
            <li>Final sale items are not eligible for return</li>
            <li>Personalized items cannot be returned</li>
          </ul>
        </div>

        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Exchanges</h2>
          <p>Need a different size or color? We recommend returning your original item for a refund and placing a new order for the correct item. This is usually faster than an exchange.</p>
        </div>
      </div>
    </div>
  );
};

export default Returns;