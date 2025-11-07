const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
  }],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
