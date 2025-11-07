import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout, cartItemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isAdmin = user && user.isAdmin;

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          🛍️ ShopEase
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Main Navigation Links */}
          <Link 
            to="/" 
            className={`nav-link ${isActiveRoute('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            🏠 Products
          </Link>
          
          <Link 
            to="/about" 
            className={`nav-link ${isActiveRoute('/about') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            ℹ️ About Us
          </Link>
          
          <Link 
            to="/contact" 
            className={`nav-link ${isActiveRoute('/contact') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            📞 Contact
          </Link>
          
          {/* User-specific Navigation */}
          {user ? (
            <>
              {/* Cart with item count */}
              <Link 
                to="/cart" 
                className={`nav-link ${isActiveRoute('/cart') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                🛒 Cart 
                {cartItemCount > 0 && (
                  <span className="cart-count">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </Link>
              
              {/* Orders */}
              <Link 
                to="/orders" 
                className={`nav-link ${isActiveRoute('/orders') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                📦 Orders
              </Link>
              
              {/* Admin Dashboard (only for admins) */}
              {isAdmin && (
                <div className="admin-section">
                  <Link 
                    to="/admin" 
                    className={`nav-link admin-link ${isActiveRoute('/admin') ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    👑 Admin Dashboard
                  </Link>
                </div>
              )}
              
              {/* User Profile & Logout */}
              <div className="user-section">
                <span className="user-greeting">
                  👋 Hello, {user.name}
                  {isAdmin && <span className="admin-badge"> (Admin)</span>}
                </span>
                <button 
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            /* Authentication Links for non-logged in users */
            <div className="auth-section">
              <Link 
                to="/login" 
                className={`nav-link ${isActiveRoute('/login') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                🔑 Login
              </Link>
              <Link 
                to="/register" 
                className={`nav-link register-link ${isActiveRoute('/register') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                ✨ Register
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;