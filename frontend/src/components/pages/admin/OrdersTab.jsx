import React from 'react';

const OrdersTab = ({ orders, onUpdateStatus }) => (
  <div className="orders-tab">
    <h2>Order Management</h2>
    <div className="orders-management-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>#{order._id?.slice(-8)}</td>
              <td>{order.userId?.name || 'N/A'}</td>
              <td>${order.total?.toFixed(2)}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn-view">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersTab;
