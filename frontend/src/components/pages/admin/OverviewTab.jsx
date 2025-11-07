import React, { useState, useEffect } from 'react';

const OverviewTab = ({ stats, orders, products }) => {
  const [animatedStats, setAnimatedStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Animation for number counting
  useEffect(() => {
    if (stats && Object.keys(stats).length > 0) {
      setIsLoading(false);
      
      const animateValue = (start, end, duration, key) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);
          setAnimatedStats(prev => ({ ...prev, [key]: value }));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };

      // Animate main stats
      animateValue(0, stats.totalRevenue || 0, 1500, 'totalRevenue');
      animateValue(0, stats.totalOrders || 0, 1200, 'totalOrders');
      animateValue(0, products?.length || 0, 1000, 'totalProducts');
      animateValue(0, stats.totalUsers || 0, 1000, 'totalUsers');
    }
  }, [stats, products]);

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  const getProgressPercentage = (current, total) => {
    return total > 0 ? (current / total) * 100 : 0;
  };

  const lowStockProducts = products?.filter(p => p.stock < 10).length || 0;
  const outOfStockProducts = products?.filter(p => p.stock === 0).length || 0;
  const pendingOrders = orders?.filter(o => o.status === 'pending').length || 0;
  const deliveredOrders = orders?.filter(o => o.status === 'delivered').length || 0;

  if (isLoading) {
    return (
      <div className="overview-tab-loading">
        <div className="skeleton-header"></div>
        <div className="skeleton-grid">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overview-tab">
      {/* Mini Stats Cards */}
      <div className="mini-stats-grid">
        <div className="mini-stat-card">
          <div className="mini-stat-icon">⏳</div>
          <div className="mini-stat-content">
            <h4>Pending Orders</h4>
            <p className="mini-stat-value">{pendingOrders}</p>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">📦</div>
          <div className="mini-stat-content">
            <h4>Delivered</h4>
            <p className="mini-stat-value">{deliveredOrders}</p>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">⚠️</div>
          <div className="mini-stat-content">
            <h4>Low Stock</h4>
            <p className="mini-stat-value">{lowStockProducts}</p>
          </div>
        </div>

        <div className="mini-stat-card">
          <div className="mini-stat-icon">❌</div>
          <div className="mini-stat-content">
            <h4>Out of Stock</h4>
            <p className="mini-stat-value">{outOfStockProducts}</p>
          </div>
        </div>
      </div>

      <div className="overview-content-grid">
        {/* Recent Orders Section */}
        <div className="overview-section recent-orders-section">
          <div className="section-header">
            <h3>📋 Recent Orders</h3>
            <span className="section-badge">{orders.length}</span>
          </div>
          
          <div className="orders-list-container">
            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <p>No orders yet</p>
                <small>Orders will appear here once customers start purchasing</small>
              </div>
            ) : (
              orders.slice(0, 8).map((order, index) => (
                <div key={order._id || index} className="order-list-item">
                  <div className="order-list-info">
                    <div className="order-list-id">#{order._id?.slice(-8) || 'N/A'}</div>
                    <div className="order-list-customer">{order.userId?.name || 'Guest'}</div>
                  </div>
                  <div className="order-list-details">
                    <div className="order-list-amount">${order.total?.toFixed(2) || '0.00'}</div>
                    <div 
                      className="order-list-status"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </div>
                    <div className="order-list-date">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="overview-section analytics-section">
          <div className="section-header">
            <h3>📊 Quick Analytics</h3>
          </div>
          
          <div className="analytics-grid">
            <div className="analytics-card">
              <h4>Order Status Distribution</h4>
              <div className="status-bars">
                <div className="status-bar">
                  <span>Pending</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill pending-bar"
                      style={{ width: `${getProgressPercentage(pendingOrders, orders.length)}%` }}
                    ></div>
                  </div>
                  <span>{pendingOrders}</span>
                </div>
                <div className="status-bar">
                  <span>Processing</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill processing-bar"
                      style={{ width: `${getProgressPercentage(orders.filter(o => o.status === 'processing').length, orders.length)}%` }}
                    ></div>
                  </div>
                  <span>{orders.filter(o => o.status === 'processing').length}</span>
                </div>
                <div className="status-bar">
                  <span>Delivered</span>
                  <div className="bar-container">
                    <div 
                      className="bar-fill delivered-bar"
                      style={{ width: `${getProgressPercentage(deliveredOrders, orders.length)}%` }}
                    ></div>
                  </div>
                  <span>{deliveredOrders}</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h4>Inventory Health</h4>
              <div className="inventory-stats">
                <div className="inventory-item">
                  <span className="inventory-label">Total Products</span>
                  <span className="inventory-value total">{products?.length || 0}</span>
                </div>
                <div className="inventory-item">
                  <span className="inventory-label">Low Stock</span>
                  <span className="inventory-value warning">{lowStockProducts}</span>
                </div>
                <div className="inventory-item">
                  <span className="inventory-label">Out of Stock</span>
                  <span className="inventory-value critical">{outOfStockProducts}</span>
                </div>
                <div className="inventory-item">
                  <span className="inventory-label">Categories</span>
                  <span className="inventory-value success">{stats.totalCategories || 4}</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h4>Revenue Today</h4>
              <div className="revenue-display">
                <div className="revenue-amount">${stats.todayRevenue?.toFixed(2) || '0.00'}</div>
                <div className="revenue-comparison">
                  <span className="comparison positive">+12.5%</span>
                  <span>vs yesterday</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h4>Store Performance</h4>
              <div className="performance-metrics">
                <div className="performance-metric">
                  <span>Conversion Rate</span>
                  <span className="metric-value">2.4%</span>
                </div>
                <div className="performance-metric">
                  <span>Avg. Order Value</span>
                  <span className="metric-value">
                    ${orders.length > 0 ? (stats.totalRevenue / orders.length).toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="performance-metric">
                  <span>Customer Satisfaction</span>
                  <span className="metric-value">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;