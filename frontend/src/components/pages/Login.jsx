import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;
      onLogin(user, token);
      
      // Redirect based on user role
      if (user.isAdmin) {
        navigate('/admin'); // Redirect to admin dashboard for admin users
      } else {
        navigate('/'); // Redirect to home page for regular users
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (type) => {
    if (type === 'admin') {
      setFormData({
        email: 'admin@shopease.com',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'user@shopease.com',
        password: 'user123'
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to ShopEase</h2>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>

        <div className="demo-accounts">
          <h4>Demo Accounts:</h4>
          <div className="demo-account-item">
            <div className="demo-info">
              <strong>👑 Admin:</strong> admin@shopease.com / admin123
              <br />
              <small>Access to admin dashboard</small>
            </div>
            <button 
              onClick={() => fillDemoCredentials('admin')}
              className="demo-btn"
            >
              Fill
            </button>
          </div>
          <div className="demo-account-item">
            <div className="demo-info">
              <strong>👤 User:</strong> user@shopease.com / user123
              <br />
              <small>Regular customer account</small>
            </div>
            <button 
              onClick={() => fillDemoCredentials('user')}
              className="demo-btn"
            >
              Fill
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .demo-account-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin: 15px 0;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #007bff;
        }

        .demo-account-item:first-child {
          border-left-color: #28a745;
        }

        .demo-account-item:last-child {
          border-left-color: #6c757d;
        }

        .demo-info {
          flex: 1;
          font-size: 14px;
        }

        .demo-info strong {
          display: block;
          margin-bottom: 4px;
        }

        .demo-info small {
          color: #6c757d;
          font-size: 12px;
        }

        .demo-btn {
          padding: 8px 16px;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: background 0.3s ease;
          margin-left: 10px;
          min-width: 60px;
        }

        .demo-btn:hover {
          background: #5a6268;
          transform: translateY(-1px);
        }

        .demo-accounts h4 {
          color: #2c3e50;
          margin-bottom: 15px;
          text-align: center;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default Login;