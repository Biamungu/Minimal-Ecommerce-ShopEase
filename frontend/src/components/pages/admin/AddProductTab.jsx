import React, { useState } from 'react';
import axios from 'axios';

const AddProductTab = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/products', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        image: ''
      });
      
      onProductAdded();
      alert('✅ Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      const errorMessage = error.response?.data?.error || 'Error adding product';
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const predefinedImages = [
    { name: 'Electronics', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { name: 'Fashion', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { name: 'Home', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500' },
    { name: 'Sports', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500' },
    { name: 'Books', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500' }
  ];

  const setPredefinedImage = (url) => {
    setFormData({
      ...formData,
      image: url
    });
  };

  return (
    <div className="add-product-tab">
      <div className="tab-header">
        <h2>Add New Product</h2>
        <p>Fill in the details below to add a new product to your store</p>
      </div>

      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            className={errors.description ? 'error' : ''}
            required
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
              className={errors.price ? 'error' : ''}
              required
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="stock">Stock Quantity *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              placeholder="0"
              className={errors.stock ? 'error' : ''}
              required
            />
            {errors.stock && <span className="error-text">{errors.stock}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select 
            id="category"
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
            required
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
          </select>
          {errors.category && <span className="error-text">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL *</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={errors.image ? 'error' : ''}
            required
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
          
          {/* Quick Image Selection */}
          <div className="quick-images">
            <p>Quick select:</p>
            <div className="image-options">
              {predefinedImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className="image-option"
                  onClick={() => setPredefinedImage(img.url)}
                >
                  <img src={img.url} alt={img.name} />
                  <span>{img.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        {formData.image && (
          <div className="image-preview">
            <p>Preview:</p>
            <img src={formData.image} alt="Preview" onError={(e) => {
              e.target.style.display = 'none';
            }} />
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading} 
          className={`submit-btn ${loading ? 'loading' : ''}`}
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Adding Product...
            </>
          ) : (
            'Add Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProductTab;