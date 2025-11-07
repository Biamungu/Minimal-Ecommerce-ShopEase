ShopEase - Modern E-Commerce Platform

https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, and admin dashboard.

🚀 Features

🛍️ Customer Features

    Product Catalog - Browse products with search and category filters

    User Authentication - Secure login/register with JWT

    Shopping Cart - Add/remove items with persistent storage

    Responsive Design - Mobile-first responsive UI

    Product Reviews - User ratings and reviews system

    Wishlist - Save favorite products for later

⚙️ Admin Features

    Dashboard - Overview of sales, products, and users

    Product Management - Add, edit, delete products

    Order Management - Process and track customer orders

    User Management - View and manage user accounts

    Inventory Management - Stock level monitoring

🛠️ Tech Stack

Frontend

    React - UI framework

    React Router - Client-side routing

    Axios - HTTP client

    CSS3 - Styling with modern features

    Context API - State management

Backend

    Node.js - Runtime environment

    Express.js - Web framework

    MongoDB - Database

    Mongoose - ODM for MongoDB

    JWT - Authentication

    bcrypt - Password hashing

    CORS - Cross-origin resource sharing

📦 Installation

Prerequisites

    Node.js (v14 or higher)

    MongoDB (local or Atlas)

    npm or yarn

1. Clone the Repository

git clone https://github.com/yourusername/shopease.git
cd shopease

2. Backend Setup

cd backend
npm install

Create a .env file in the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start the backend server:

npm start

3. Frontend Setup

cd frontend
npm install

Start the frontend development server:

npm run dev

🗂️ Project Structure


shopease/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── styles/
│   └── public/
└── README.md


🎯 API Endpoints

Authentication

    POST /api/auth/register - User registration

    POST /api/auth/login - User login

    POST /api/auth/reset-admin-password - Reset admin password

Products

    GET /api/products - Get all products (with pagination)

    GET /api/products/:id - Get single product

    GET /api/products/categories - Get all categories

    POST /api/products - Create product (Admin only)

    PUT /api/products/:id - Update product (Admin only)

    DELETE /api/products/:id - Delete product (Admin only)

Admin

    GET /api/admin/dashboard - Get dashboard statistics

    GET /api/admin/products - Get all products for admin

    POST /api/admin/products - Create product

    PUT /api/admin/products/:id - Update product

    DELETE /api/admin/products/:id - Delete product

    GET /api/admin/users - Get all users

👥 Demo Accounts

Admin Account

    Email: admin@shopease.com

    Password: admin123

    Access: Full admin privileges

User Account

    Email: user@shopease.com

    Password: user123

    Access: Standard user features

🚀 Deployment

Backend Deployment (Heroku/Railway)

    Set environment variables in your hosting platform

    Deploy from the backend directory

    Ensure CORS is configured for your frontend domain

Frontend Deployment (Vercel/Netlify)

    Build the project: npm run build

    Deploy the build folder

    Set API base URL in environment variables

Environment Variables

Backend (.env):

PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shopease
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production

Frontend (.env):

VITE_API_BASE_URL=https://your-backend-url.herokuapp.com/api


🧪 Testing

Run the test suite:

# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test

🔧 Development
Adding New Features

    Create feature branch: git checkout -b feature/name

    Implement changes

    Write tests if applicable

    Submit pull request

Code Style

    Use ESLint and Prettier for consistent formatting

    Follow React best practices

    Write meaningful commit messages

🤝 Contributing

We welcome contributions! Please see our Contributing Guide for details.

    Fork the project

    Create your feature branch (git checkout -b feature/AmazingFeature)

    Commit your changes (git commit -m 'Add some AmazingFeature')

    Push to the branch (git push origin feature/AmazingFeature)

    Open a Pull Request

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support

If you encounter any issues:

    Check the Troubleshooting Guide

    Search existing GitHub Issues

    Create a new issue with detailed information

📞 Contact

    Project Maintainer: Your Name

    Email: your.email@example.com

    GitHub: @yourusername

🙏 Acknowledgments

    Unsplash for product images

    React community for excellent documentation

    MongoDB Atlas for database hosting

    Vercel/Netlify for frontend hosting

⭐ Star this repo if you found it helpful!