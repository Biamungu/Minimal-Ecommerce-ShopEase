const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// =======================
// Authentication Middleware
// =======================
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    req.user = decoded;
    next();
  });
};

// =======================
// Create a New Order
// =======================
router.post('/', auth, async (req, res) => {
  try {
    const { products, total, shippingAddress } = req.body;

    // 1️⃣ Validate request body
    if (!products || !products.length) {
      return res.status(400).json({ error: 'No products to order' });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total amount is required' });
    }
    if (!shippingAddress || !shippingAddress.address) {
      return res.status(400).json({ error: 'Shipping address is required' });
    }

    // 2️⃣ Validate products and stock
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: `Product with ID ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for "${product.name}". Available: ${product.stock}`
        });
      }
    }

    // 3️⃣ Create the order
    const order = new Order({
      userId: req.user.id,
      products,
      total,
      shippingAddress,
      status: 'pending'
    });

    await order.save();

    // 4️⃣ Update product stock atomically
    for (let item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // 5️⃣ Populate products & user info
    await order.populate('products.product');
    await order.populate('userId', 'name email');

    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error while placing order' });
  }
});

// =======================
// Get Current User Orders
// =======================
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('products.product')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Server error while fetching orders' });
  }
});

// =======================
// Get Single Order by ID
// =======================
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('userId', 'name email');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Only owner or admin can access
    if (order.userId._id.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Server error while fetching order' });
  }
});

module.exports = router;
