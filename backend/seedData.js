const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/product');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@shopease.com',
      password: 'admin123',
      isAdmin: true
    });
    await adminUser.save();
    console.log('✅ Admin user created');

    // Create regular user
    const regularUser = new User({
      name: 'Demo User',
      email: 'user@shopease.com',
      password: 'user123',
      isAdmin: false
    });
    await regularUser.save();
    console.log('✅ Regular user created');

    // Create sample products with SAFE image URLs
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
        price: 99.99,
        category: 'Electronics',
        stock: 15,
        image: 'https://picsum.photos/300/300?random=1'
      },
      {
        name: 'Smart Watch Series 5',
        description: 'Feature-rich smartwatch with health monitoring, GPS, and water resistance',
        price: 199.99,
        category: 'Electronics',
        stock: 8,
        image: 'https://picsum.photos/300/300?random=2'
      },
      {
        name: 'Laptop Backpack Pro',
        description: 'Durable laptop backpack with USB charging port and water-resistant material',
        price: 49.99,
        category: 'Accessories',
        stock: 20,
        image: 'https://picsum.photos/300/300?random=3'
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 elegant ceramic coffee mugs with modern design',
        price: 24.99,
        category: 'Home',
        stock: 50,
        image: 'https://picsum.photos/300/300?random=4'
      },
      {
        name: 'Fitness Tracker Band',
        description: 'Advanced fitness tracker with heart rate monitor and sleep tracking',
        price: 79.99,
        category: 'Electronics',
        stock: 12,
        image: 'https://picsum.photos/300/300?random=5'
      },
      {
        name: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with multiple brightness levels and USB port',
        price: 29.99,
        category: 'Home',
        stock: 25,
        image: 'https://picsum.photos/300/300?random=6'
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and long battery life',
        price: 19.99,
        category: 'Electronics',
        stock: 30,
        image: 'https://picsum.photos/300/300?random=7'
      },
      {
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat with carrying strap and alignment markers',
        price: 34.99,
        category: 'Sports',
        stock: 18,
        image: 'https://picsum.photos/300/300?random=8'
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Sample products created');

    console.log('🎉 Database seeded successfully!');
    console.log('👤 Admin: admin@shopease.com / admin123');
    console.log('👤 User: user@shopease.com / user123');

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();