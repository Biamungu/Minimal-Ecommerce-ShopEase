import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Cart.css'; // ✅ Import the CSS file

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart, getCartTotal }) => {
  const navigate = useNavigate();

  // Safe fallback image
  const safeImage = 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop';

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleImageError = (e) => {
    e.target.src = safeImage;
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Shopping Cart</h1>
        </div>
        <div className="cart-empty">
          <h3>Your cart is empty</h3>
          <p>Browse our products and add some items to your cart</p>
          <Link to="/" className="continue-shopping">
            🏠 Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-items">
        {cart.map(item => (
          <div key={item.product._id} className="cart-item">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="cart-item-image"
              onError={handleImageError}
            />
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.product.name}</h4>
              <p className="cart-item-category">🏷️ {item.product.category}</p>
              <p className="cart-item-price">💰 ${item.product.price}</p>
            </div>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                className="quantity-btn"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="quantity-display">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <div className="cart-item-total">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
            <button
              onClick={() => onRemoveFromCart(item.product._id)}
              className="remove-btn"
            >
              🗑️ Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>📋 Order Summary</h3>
        <div className="summary-row">
          <span>Items ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>🚚 Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-row">
          <span>🏛️ Tax</span>
          <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>💳 Total</span>
          <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="checkout-btn"
        >
          🛍️ Proceed to Checkout
        </button>
        <Link to="/" className="continue-shopping-btn">
          🏠 Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;