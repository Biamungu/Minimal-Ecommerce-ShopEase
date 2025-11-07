import React, { useState } from 'react';
import axios from 'axios';

const ProductsTab = ({ products, onDelete, onRefresh }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image
    });
  };

  const handleUpdate = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/products/${productId}`, 
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingProduct(null);
      onRefresh();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  return (
    <div className="products-tab">
      <h2>Product Management</h2>
      <div className="products-grid-management">
        {products.map(product => (
          <div key={product._id} className="product-management-card">
            <img src={product.image} alt={product.name} />
            <div className="product-management-info">
              {editingProduct === product._id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    placeholder="Product Name"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    placeholder="Price"
                    step="0.01"
                  />
                  <input
                    type="number"
                    value={editForm.stock}
                    onChange={(e) => setEditForm({...editForm, stock: e.target.value})}
                    placeholder="Stock"
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleUpdate(product._id)} className="btn-save">Save</button>
                    <button onClick={handleCancelEdit} className="btn-cancel">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <h4>{product.name}</h4>
                  <p className="product-price">${product.price}</p>
                  <p className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
                    Stock: {product.stock}
                  </p>
                  <p>Category: {product.category}</p>
                </>
              )}
            </div>
            <div className="product-management-actions">
              {editingProduct !== product._id && (
                <>
                  <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                  <button 
                    className="btn-delete"
                    onClick={() => onDelete(product._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;