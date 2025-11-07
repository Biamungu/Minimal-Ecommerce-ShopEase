import React from 'react';

const ShippingInfo = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 20px 20px 20px' }}>
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#2c3e50' }}>Shipping Information</h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>Everything you need to know about shipping</p>
      </div>

      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Shipping Options & Delivery Times</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>🚚 Standard Shipping</h3>
              <p><strong>Delivery Time:</strong> 5-7 business days</p>
              <p><strong>Cost:</strong> $4.99 or FREE on orders over $50</p>
            </div>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>⚡ Express Shipping</h3>
              <p><strong>Delivery Time:</strong> 2-3 business days</p>
              <p><strong>Cost:</strong> $12.99</p>
            </div>
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>🚀 Next Day Delivery</h3>
              <p><strong>Delivery Time:</strong> 1 business day</p>
              <p><strong>Cost:</strong> $24.99</p>
              <p><em>Order before 2 PM for next day delivery</em></p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Shipping Policy</h2>
          <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>All orders are processed within 24 hours during business days</li>
            <li>You will receive a tracking number once your order ships</li>
            <li>Shipping times are estimates and may vary based on destination</li>
            <li>We ship to all 50 US states</li>
            <li>International shipping available for select countries</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Order Tracking</h2>
          <p>Once your order ships, you'll receive an email with your tracking number. You can track your package using our tracking system or directly with the carrier.</p>
        </div>

        <div>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Shipping Restrictions</h2>
          <p>Some items may have shipping restrictions due to size, weight, or regulatory requirements. These restrictions will be clearly noted on the product page.</p>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;