import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // ✅ Import the CSS file

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const safeImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop'
  ];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      
      console.log('API Response:', response.data);
      
      let productsData = [];
      
      if (Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data.products && Array.isArray(response.data.products)) {
        productsData = response.data.products;
      } else {
        productsData = response.data || [];
      }
      
      const productsWithSafeImages = productsData.map((product, index) => ({
        ...product,
        image: product.image || safeImages[index % safeImages.length]
      }));
      
      setProducts(productsWithSafeImages);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      
      let categoriesData = [];
      if (Array.isArray(response.data)) {
        categoriesData = response.data;
      } else {
        categoriesData = response.data || [];
      }
      
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Accessories']);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const handleImageError = (e, index) => {
    e.target.src = safeImages[index % safeImages.length];
    e.target.alt = 'Product image';
  };

  if (loading) {
    return (
      <div className="products-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="products-container">
        <div className="error">
          <h3>Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={fetchProducts} className="auth-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover amazing products at great prices</p>
        {products.length > 0 && (
          <p style={{color: '#666', fontSize: '14px', marginTop: '10px'}}>
            Showing {filteredProducts.length} of {products.length} products
          </p>
        )}
      </div>

      <div className="filters-section">
        <div className="search-form">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {(searchTerm || selectedCategory) && (
          <div className="active-filters">
            <span>Active filters: </span>
            {searchTerm && <span className="filter-tag">Search: "{searchTerm}"</span>}
            {selectedCategory && <span className="filter-tag">Category: {selectedCategory}</span>}
            <button onClick={clearFilters} className="clear-filters-btn">
              ✕ Clear All
            </button>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 && products.length > 0 ? (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="auth-btn">
            Show All Products
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>No products available</h3>
          <p>Products will appear here once they are added to the database</p>
          <button onClick={fetchProducts} className="auth-btn">
            Refresh
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={product._id || index} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => handleImageError(e, index)}
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-category">{product.category}</div>
                <p className={`product-stock ${product.stock < 10 ? 'low' : ''}`}>
                  {product.stock === 0 
                    ? 'Out of Stock' 
                    : product.stock < 10 
                      ? `Only ${product.stock} left!` 
                      : `In Stock (${product.stock})`
                  }
                </p>
                <p className="product-price">${product.price?.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;