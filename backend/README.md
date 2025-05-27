# 🔧 Car Drivers Backend API

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248?logo=mongodb)

The backend API for the Car Drivers platform, powering both the frontend client and admin dashboard.

## 🚀 Features

- **RESTful API**: Clean, consistent API design
- **Authentication**: JWT-based user authentication system
- **Role-Based Access**: Different permissions for users and admins
- **Data Management**: CRUD operations for drivers, users, and bookings
- **File Uploads**: Image upload for driver profiles and licenses
- **ImageKit Integration**: Cloud-based image storage and delivery
- **Input Validation**: Request validation and sanitization

## 🛠️ Installation

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 📁 Project Structure

```
backend/
├── config/             # Configuration files
│   ├── db.js           # Database connection
│   └── imagekit.js     # ImageKit integration
├── controllers/        # Route controllers
│   ├── bookingController.js
│   ├── driverController.js
│   └── userController.js
├── middleware/         # Express middleware
│   └── auth.js         # Authentication middleware
├── models/             # MongoDB models
│   ├── Booking.js
│   ├── Driver.js
│   └── User.js
├── routes/             # API routes
│   ├── bookingRoutes.js
│   ├── driverRoutes.js
│   ├── imagekit.js
│   └── userRoutes.js
├── uploads/            # File upload directory
├── utils/              # Utility functions
│   └── fileUpload.js   # File upload utilities
├── package.json        # Project dependencies
└── server.js           # Main entry point
```

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get driver by ID
- `POST /api/drivers` - Create a new driver
- `PUT /api/drivers/:id` - Update a driver
- `DELETE /api/drivers/:id` - Delete a driver

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Delete a booking

### ImageKit
- `GET /api/imagekit/auth` - Get authentication parameters for ImageKit

## 🔒 Security

- JWT Authentication
- Password hashing
- Request validation
- Protected routes
- CORS protection

## 📚 Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm run seed`: Seed database with initial data (if implemented)

## 📋 Dependencies

- Express
- Mongoose
- JsonWebToken
- Bcrypt
- Multer
- ImageKit
- Other utilities (see package.json for full list)
