import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Products from './components/pages/Products.jsx';
import Cart from './components/pages/Cart.jsx';
import Checkout from './components/pages/Checkout.jsx';
import Orders from './components/pages/Orders.jsx';
import Login from './components/pages/Login.jsx';
import Register from './components/pages/Register.jsx';
import About from './components/pages/About.jsx';
import Contact from './components/pages/Contact.jsx';
import ShippingInfo from './components/pages/ShippingInfo.jsx';
import Returns from './components/pages/Returns.jsx';
import PrivacyPolicy from './components/pages/PrivacyPolicy.jsx';
import TermsOfService from './components/pages/TermsOfService.jsx';
import AdminDashboard from './components/pages/admin/AdminDashboard.jsx'; // Updated import path
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Route Component
const AdminRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product._id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Loading ShopEase...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
          cartItemCount={getCartCount()} // Fixed prop name to match Navbar component
        />
        
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/" 
              element={<Products addToCart={addToCart} />} 
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<ShippingInfo />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route 
              path="/login" 
              element={<Login onLogin={handleLogin} />} 
            />
            <Route 
              path="/register" 
              element={<Register onLogin={handleLogin} />} 
            />
            
            {/* Protected routes */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute user={user}>
                  <Cart 
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemoveFromCart={removeFromCart}
                    getCartTotal={getCartTotal}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute user={user}>
                  <Checkout 
                    cart={cart}
                    total={getCartTotal()}
                    onClearCart={clearCart}
                    user={user}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin-only route */}
            <Route 
              path="/admin" 
              element={
                <AdminRoute user={user}>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;