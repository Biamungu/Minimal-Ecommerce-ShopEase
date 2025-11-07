import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import OverviewTab from './OverviewTab.jsx';
import OrdersTab from './OrdersTab.jsx';
import ProductsTab from './ProductsTab.jsx';
import UsersTab from './UsersTab.jsx';
import AddProductTab from './AddProductTab.jsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }

      console.log('🔍 Starting admin dashboard data fetch...');
      
      // Get all data in parallel
      const [dashboardResponse, productsResponse, usersResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/products', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      console.log('📊 Dashboard response:', dashboardResponse.data);
      console.log('🛍️ Products response:', productsResponse.data);
      console.log('👥 Users response:', usersResponse.data);

      // Map backend data to frontend expectations
      const dashboardData = dashboardResponse.data;
      
      setStats({
        totalRevenue: dashboardData.stats?.totalRevenue || 0,
        totalOrders: dashboardData.stats?.totalOrders || 0,
        totalUsers: dashboardData.stats?.totalUsers || 0,
        totalProducts: dashboardData.stats?.totalProducts || 0,
        pendingOrders: dashboardData.stats?.pendingOrders || 0,
        lowStockProducts: dashboardData.stats?.lowStockProducts || 0,
        totalCategories: dashboardData.stats?.totalCategories || 0
      });

      // Use recentOrders from dashboard or empty array
      setOrders(dashboardData.recentOrders || []);
      
      // Products from admin/products endpoint
      setProducts(productsResponse.data || []);
      
      // Users from admin/users endpoint  
      setUsers(usersResponse.data || []);
      
      console.log('✅ All admin data loaded successfully');
      
    } catch (err) {
      console.error('💥 Error in fetchDashboardData:', err);
      
      if (err.response) {
        if (err.response.status === 401) {
          setError('Unauthorized: Please login again');
        } else if (err.response.status === 403) {
          setError('Access denied: Admin privileges required');
        } else {
          setError(`Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`);
        }
      } else if (err.request) {
        setError('Backend server is not responding. Make sure the backend is running on port 5000.');
      } else {
        setError('Failed to load dashboard data: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading Admin Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-message">
          <h3>🚨 Error Loading Dashboard</h3>
          <p>{error}</p>
          
          <div className="debug-info">
            <h4>Debug Information:</h4>
            <p><strong>User:</strong> {localStorage.getItem('user') ? 'Logged in' : 'Not logged in'}</p>
            <p><strong>Token:</strong> {localStorage.getItem('token') ? 'Present' : 'Missing'}</p>
            <p><strong>Backend URL:</strong> http://localhost:5000</p>
            <p><strong>User Role:</strong> {JSON.parse(localStorage.getItem('user') || '{}')?.isAdmin ? 'Admin' : 'Regular User'}</p>
          </div>
          
          <div className="error-actions">
            <button onClick={fetchDashboardData} className="btn-retry">
              🔄 Try Again
            </button>
            <button 
              onClick={() => window.location.href = '/'} 
              className="btn-cancel"
            >
              ↩️ Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header with Stats and Refresh */}
      <div className="admin-header">
        <div className="header-main">
          <h1>👑 Admin Dashboard</h1>
          <button 
            onClick={refreshData}
            className="refresh-btn"
            title="Refresh Data"
          >
            🔄 Refresh
          </button>
        </div>
        
        <div className="admin-stats">
          <div className="stat-card revenue">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-value">${stats.totalRevenue?.toFixed(2) || '0.00'}</p>
              <span className="stat-trend">Overall earnings</span>
            </div>
          </div>

          <div className="stat-card orders">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders || 0}</p>
              <span className="stat-trend">{stats.pendingOrders || 0} pending</span>
            </div>
          </div>

          <div className="stat-card products">
            <div className="stat-icon">🛍️</div>
            <div className="stat-content">
              <h3>Total Products</h3>
              <p className="stat-value">{products.length || 0}</p>
              <span className="stat-trend">{stats.lowStockProducts || 0} low stock</span>
            </div>
          </div>

          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Total Users</h3>
              <p className="stat-value">{stats.totalUsers || 0}</p>
              <span className="stat-trend">{users.filter(u => u.isAdmin).length} admins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-content">
        {/* Navigation Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-header">
            <h3>Management</h3>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Overview</span>
            </button>
            
            <button 
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <span className="nav-icon">📦</span>
              <span className="nav-text">Orders</span>
              {orders.length > 0 && (
                <span className="nav-badge">{orders.length}</span>
              )}
            </button>
            
            <button 
              className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="nav-icon">🛍️</span>
              <span className="nav-text">Products</span>
              <span className="nav-badge">{products.length}</span>
            </button>
            
            <button 
              className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Users</span>
              <span className="nav-badge">{users.length}</span>
            </button>
            
            <button 
              className={`nav-btn ${activeTab === 'add-product' ? 'active' : ''}`}
              onClick={() => setActiveTab('add-product')}
            >
              <span className="nav-icon">➕</span>
              <span className="nav-text">Add Product</span>
            </button>
          </nav>

          {/* Quick Stats in Sidebar */}
          <div className="sidebar-footer">
            <div className="quick-stat">
              <span>Active Products</span>
              <strong>{products.length}</strong>
            </div>
            <div className="quick-stat">
              <span>Pending Orders</span>
              <strong>{stats.pendingOrders || 0}</strong>
            </div>
          </div>
        </div>

        {/* Main Content Panel */}
        <div className="admin-main">
          <div className="main-header">
            <h2>
              {activeTab === 'overview' && '📊 Dashboard Overview'}
              {activeTab === 'orders' && `📦 Order Management (${orders.length})`}
              {activeTab === 'products' && `🛍️ Product Management (${products.length} products)`}
              {activeTab === 'users' && `👥 User Management (${users.length} users)`}
              {activeTab === 'add-product' && '➕ Add New Product'}
            </h2>
            <div className="main-actions">
              <span className="last-updated">
                Updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="main-content">
            {activeTab === 'overview' && <OverviewTab stats={stats} orders={orders} products={products} users={users} />}
            {activeTab === 'orders' && <OrdersTab orders={orders} onUpdateStatus={updateOrderStatus} />}
            {activeTab === 'products' && (
              <ProductsTab 
                products={products} 
                onDelete={deleteProduct} 
                onRefresh={fetchDashboardData} 
              />
            )}
            {activeTab === 'users' && <UsersTab users={users} />}
            {activeTab === 'add-product' && <AddProductTab onProductAdded={fetchDashboardData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

