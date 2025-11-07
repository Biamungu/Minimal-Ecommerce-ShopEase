import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css'; // ✅ Import the CSS file

const Checkout = ({ cart, total, onClearCart, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    address: '123 Main Street',
    city: 'New York',
    postalCode: '10001',
    country: 'United States'
  });
  const navigate = useNavigate();

  // Safe fallback image
  const safeImage = 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop';

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const orderData = {
        products: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        total: total * 1.1, // Including tax
        shippingAddress
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      onClearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = safeImage;
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>🛒 Checkout</h1>
        </div>
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Add some items to your cart before checkout</p>
          <button 
            onClick={() => navigate('/')}
            className="continue-shopping"
          >
            🏠 Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>🛒 Checkout</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="checkout-grid">
        {/* Order Summary Section */}
        <div>
          <div className="checkout-section">
            <h3>📋 Order Summary</h3>
            {cart.map(item => (
              <div key={item.product._id} className="order-item">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="order-item-image"
                  onError={handleImageError}
                />
                <div className="order-item-details">
                  <h4 className="order-item-name">{item.product.name}</h4>
                  <p className="order-item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="order-item-price">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="order-total">
              <span>💳 Total (including tax):</span>
              <span>${(total * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping & Payment Section */}
        <div>
          <div className="checkout-section">
            <h3>🚚 Shipping Information</h3>
            <div className="shipping-info">
              <p><strong>👤 Name:</strong> {shippingAddress.name}</p>
              <p><strong>📍 Address:</strong> {shippingAddress.address}</p>
              <p><strong>🏙️ City:</strong> {shippingAddress.city}</p>
              <p><strong>📮 Postal Code:</strong> {shippingAddress.postalCode}</p>
              <p><strong>🌎 Country:</strong> {shippingAddress.country}</p>
            </div>

            <h3>💳 Payment Method</h3>
            <div className="shipping-info">
              <p><strong>💳 Card:</strong> **** **** **** 4242</p>
              <p><strong>📅 Expiry:</strong> 12/2025</p>
              <p><em>This is a demo store. No real payments will be processed.</em></p>
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <div className="checkout-actions">
              <button
                onClick={handlePlaceOrder}
                disabled={loading || cart.length === 0}
                className="place-order-btn"
              >
                {loading ? '⏳ Placing Order...' : `✅ Place Order - $${(total * 1.1).toFixed(2)}`}
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="back-to-cart-btn"
              >
                🛒 Back to Cart
              </button>
            </div>

            <div className="demo-notice">
              <p>📝 Note: This is a demo store. No real payments will be processed and no actual products will be shipped.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;