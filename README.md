# 🎨 Painting Store - Full Stack E-commerce Application

A modern, full-stack painting store application built with React and Node.js. This application provides a complete e-commerce solution for buying and selling paintings online, featuring user authentication, shopping cart functionality, order management, and a comprehensive admin panel.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Usage](#usage)
- [Contributing](#contributing)

## ✨ Features

### 🛒 Customer Features
- **User Authentication**: Secure registration and login system with JWT
- **Browse Paintings**: View all available paintings with search and filtering
- **Painting Details**: Detailed view of individual paintings with artist information
- **Shopping Cart**: Add/remove items, adjust quantities
- **Secure Checkout**: Complete order placement with shipping details
- **Order Tracking**: View order history and current status
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 👨‍💼 Admin Features
- **Admin Dashboard**: Comprehensive overview of store statistics
- **User Management**: View and manage all registered users
- **Painting Management**: Full CRUD operations for paintings
- **Image Upload**: Upload and manage painting images
- **Order Management**: View and update order statuses
- **Inventory Control**: Manage painting stock and availability

### 🔧 Technical Features
- **Role-based Access Control**: Different permissions for customers and admins
- **File Upload System**: Multer-based image upload with storage
- **Real-time Notifications**: Toast notifications for user feedback
- **Modern UI/UX**: Material-UI components with Tailwind CSS styling
- **RESTful API**: Well-structured API endpoints
- **Database Relationships**: Proper data modeling with MongoDB

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - Middleware for file uploads
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Nodemon** - Auto-restart development server
- **Vite Dev Server** - Fast refresh and hot reload

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- **MongoDB** (v4.4 or higher)
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd painting-store
```

### 2. Install Backend Dependencies
```bash
cd paintings-store-backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../painting-store-frontend
npm install
```

## ⚙️ Environment Configuration

### Backend Configuration
Create a `.env` file in the `paintings-store-backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/paintings_store
JWT_SECRET=myUltraSecureJWTSecretKey!@#2025
ADMIN_CODE=SuperSecretAdminCode123!
```

### Frontend Configuration
Create a `.env` file in the `painting-store-frontend` directory:

```env
VITE_API_BASE=http://localhost:5000
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd paintings-store-backend
   npm run dev
   ```
   The backend server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd painting-store-frontend
   npm run dev
   ```
   The frontend application will be available at `http://localhost:5173`

### Production Mode

1. **Build and Start Backend**
   ```bash
   cd paintings-store-backend
   npm run build
   npm start
   ```

2. **Build and Preview Frontend**
   ```bash
   cd painting-store-frontend
   npm run build
   npm run preview
   ```

## 📁 Project Structure

```
painting-store/
├── painting-store-frontend/        # React frontend application
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PaintingCard.jsx
│   │   │   └── CreatePainting.jsx
│   │   ├── contexts/               # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useDebounce.js
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── ...
│   │   ├── services/               # API service functions
│   │   │   └── api.js
│   │   ├── utils/                  # Utility functions
│   │   │   └── PrivateRoute.jsx
│   │   ├── assets/                 # Images and assets
│   │   ├── App.jsx                 # Main App component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── index.html                  # HTML template
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── .env                       # Frontend environment variables
│
└── paintings-store-backend/        # Node.js backend application
    ├── config/                     # Database configuration
    │   └── db.js
    ├── controllers/                # Route controllers
    │   ├── authController.js
    │   ├── paintingController.js
    │   ├── orderController.js
    │   └── userController.js
    ├── middleware/                 # Custom middleware
    │   └── auth.js
    ├── models/                     # Database models
    │   ├── Painting.js
    │   ├── User.js
    │   └── Order.js
    ├── routes/                    # API routes
    │   ├── auth.js
    │   ├── paintings.js
    │   ├── orders.js
    │   ├── adminRoutes.js
    │   └── upload.js
    ├── uploads/                    # Uploaded images
    ├── utils/                      # Utility functions
    │   ├── seeder.js              # Database seeder
    │   └── data/                  # Seed data
    ├── server.js                   # Main server file
    ├── package.json               # Backend dependencies
    └── .env                       # Backend environment variables
```

## 🔌 API Overview

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Painting Endpoints
- `GET /api/paintings` - Get all paintings
- `GET /api/paintings/:id` - Get painting by ID
- `POST /api/paintings` - Create new painting (Admin only)
- `PUT /api/paintings/:id` - Update painting (Admin only)
- `DELETE /api/paintings/:id` - Delete painting (Admin only)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status (Admin only)

### Admin Endpoints
- `GET /api/admin/users` - Get all users (Admin only)
- `GET /api/admin/orders` - Get all orders (Admin only)
- `GET /api/admin/dashboard` - Get dashboard statistics (Admin only)

### File Upload
- `POST /api/upload` - Upload painting images

## 📖 Usage

### For Customers

1. **Registration**: Create an account or login with existing credentials
2. **Browse**: Explore available paintings on the home page
3. **Add to Cart**: Click "Add to Cart" on any painting
4. **Checkout**: Review cart items and complete purchase
5. **Track Orders**: View order history and current status

### For Administrators

1. **Admin Registration**: Register with admin code during signup
2. **Access Admin Panel**: Navigate to `/admin` after login
3. **Manage Paintings**: Add, edit, or remove paintings from inventory
4. **Manage Users**: View and manage user accounts
5. **Process Orders**: Update order statuses and track deliveries

### Database Seeding

To populate the database with sample data:

```bash
cd paintings-store-backend
npm run seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for similar problems
2. Create a new issue with detailed information about your problem
3. Include error messages, steps to reproduce, and your environment details

## 🔄 Updates

This application uses modern web technologies and follows best practices for:

- **Security**: Password hashing, JWT authentication, input validation
- **Performance**: Optimized queries, efficient state management
- **Accessibility**: Semantic HTML, keyboard navigation support
- **SEO**: Proper meta tags and structured data

---

**Happy Painting! 🎨**
