import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Orders.css'; // 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Safe fallback image
  const safeImage = 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop';

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: '⏳ Pending' },
      processing: { class: 'status-processing', text: '🔄 Processing' },
      shipped: { class: 'status-shipped', text: '🚚 Shipped' },
      delivered: { class: 'status-delivered', text: '✅ Delivered' },
      cancelled: { class: 'status-cancelled', text: '❌ Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  const handleImageError = (e) => {
    e.target.src = safeImage;
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h3>⚠️ Error Loading Orders</h3>
          <p>{error}</p>
          <button onClick={fetchOrders} className="auth-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>📦 My Orders</h1>
        <p>View your order history and track your purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here</p>
          <Link to="/" className="start-shopping">
            🛍️ Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <div className="order-id">📋 Order #{order._id?.slice(-8)?.toUpperCase() || 'N/A'}</div>
                  <div className="order-date">
                    📅 Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="order-status">
                  {getStatusBadge(order.status)}
                  <div className="order-total-amount">💰 ${order.total?.toFixed(2) || '0.00'}</div>
                </div>
              </div>

              <div className="order-products">
                {order.products?.map((item, index) => (
                  <div key={index} className="order-product">
                    <img
                      src={item.product?.image || safeImage}
                      alt={item.product?.name || 'Product'}
                      className="order-product-image"
                      onError={handleImageError}
                    />
                    <div className="order-product-details">
                      <h4 className="order-product-name">
                        {item.product?.name || 'Product not available'}
                      </h4>
                      <p className="order-product-quantity">📦 Quantity: {item.quantity}</p>
                    </div>
                    {item.product && (
                      <div className="order-product-price">
                        💰 ${((item.product.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;