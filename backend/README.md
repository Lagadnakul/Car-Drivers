# Car Driver Backend API

A comprehensive Node.js backend API for a car driver booking application with admin dashboard functionality.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (User, Driver, Admin)
- Secure password hashing with bcrypt
- Rate limiting for authentication endpoints

### 👥 User Management
- User registration and login
- Profile management with photo upload
- Booking history and statistics
- Password updates and validation

### 🚗 Driver Management
- Driver registration with vehicle details
- Document upload and verification
- Location tracking and updates
- Earnings and performance analytics
- Availability management

### 📅 Booking System
- Complete CRUD operations for bookings
- Real-time status updates
- Geospatial queries for nearby drivers
- Booking conflicts prevention
- Fare calculation

### 🛠 Admin Panel
- Comprehensive dashboard analytics
- User and driver management
- Bulk operations
- System settings management
- Report generation
- Data export functionality

## Tech Stack

- **Runtime:** Node.js with ES6 modules
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer
- **Security:** bcrypt, CORS, rate limiting
- **Validation:** Custom middleware with comprehensive checks

## Project Structure

```
backend/
├── controllers/          # Route handlers
│   ├── adminController.js
│   ├── authController.js
│   ├── bookingController.js
│   ├── driverController.js
│   └── userController.js
├── middleware/           # Custom middleware
│   ├── auth.js          # Authentication & authorization
│   ├── error.js         # Global error handling
│   ├── rateLimit.js     # Rate limiting
│   └── validation.js    # Input validation
├── models/              # Database models
│   ├── Booking.js
│   ├── Driver.js
│   └── User.js
├── routes/              # Route definitions
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── driverRoutes.js
│   └── userRoutes.js
├── utils/               # Utility functions
│   ├── fileUpload.js    # File upload configuration
│   └── helpers.js       # Helper functions
├── config/              # Configuration
│   └── db.js           # Database connection
├── assets/              # Static files
│   └── uploads/        # Uploaded files
├── .env.example        # Environment variables template
├── package.json
└── server.js           # Application entry point
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/car-driver-app
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   JWT_EXPIRE=7d
   PORT=4000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login

### User Routes (`/api/users`)
- `GET /` - Get all users (with pagination)
- `GET /search` - Search users
- `GET /profile/me` - Get current user profile
- `PUT /profile/me` - Update current user profile
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user (Admin only)
- `PUT /:id/password` - Update user password
- `PUT /:id/photo` - Update profile photo
- `GET /:id/bookings` - Get user bookings
- `GET /:id/stats` - Get user statistics

### Driver Routes (`/api/drivers`)
- `GET /` - Get all drivers
- `GET /search` - Search drivers with filters
- `GET /nearby` - Get nearby drivers
- `POST /register` - Driver registration
- `GET /:id` - Get driver by ID
- `PUT /:id` - Update driver
- `DELETE /:id` - Delete driver
- `PATCH /:id/location` - Update driver location
- `PATCH /:id/status` - Update driver status
- `PATCH /:id/availability` - Toggle driver availability
- `GET /:id/bookings` - Get driver bookings
- `GET /:id/earnings` - Get driver earnings
- `GET /:id/ratings` - Get driver ratings
- `GET /:id/stats` - Get driver statistics
- `POST /:id/documents` - Upload driver documents
- `PATCH /:id/documents/verify` - Verify driver documents

### Booking Routes (`/api/bookings`)
- `GET /` - Get all bookings
- `POST /` - Create new booking
- `GET /:id` - Get booking by ID
- `PUT /:id` - Update booking
- `DELETE /:id` - Cancel booking
- `PATCH /:id/status` - Update booking status
- `GET /:id/tracking` - Get booking tracking info

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Get dashboard statistics
- `GET /analytics` - Get detailed analytics
- `POST /reports` - Generate reports
- `GET /system-info` - Get system information
- `PUT /system-settings` - Update system settings
- `POST /users/bulk-update` - Bulk update users
- `POST /drivers/bulk-update` - Bulk update drivers
- `GET /users/:id/stats` - Get user statistics
- `GET /drivers/:id/stats` - Get driver statistics
- `POST /notifications/bulk` - Send bulk notifications
- `POST /export` - Export data

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: ['user', 'driver', 'admin'],
  profilePhoto: String,
  isActive: Boolean,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Driver Model
```javascript
{
  user: ObjectId (ref: User),
  licenseNumber: String,
  vehicleDetails: {
    make: String,
    model: String,
    year: Number,
    plateNumber: String,
    color: String,
    type: String
  },
  documents: {
    license: String,
    insurance: String,
    registration: String
  },
  location: {
    type: Point,
    coordinates: [Number] // [longitude, latitude]
  },
  isAvailable: Boolean,
  isVerified: Boolean,
  rating: Number,
  totalRides: Number,
  totalEarnings: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  user: ObjectId (ref: User),
  driver: ObjectId (ref: Driver),
  pickupLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  dropoffLocation: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  scheduledDateTime: Date,
  status: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
  serviceType: ['standard', 'premium', 'luxury', 'shared'],
  fare: Number,
  estimatedDuration: Number,
  actualDuration: Number,
  rating: Number,
  feedback: String,
  paymentStatus: String,
  paymentMethod: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Password Security**: Bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Configurable request limits
- **Input Validation**: Comprehensive validation middleware
- **CORS Protection**: Cross-origin request security
- **Error Handling**: Secure error responses without sensitive data

## Middleware

### Authentication (`auth.js`)
- `protect`: Verify JWT token and authenticate user
- `authorize`: Role-based authorization

### Validation (`validation.js`)
- `validateUserRegistration`: User registration validation
- `validateDriverRegistration`: Driver registration validation
- `validateBookingCreation`: Booking creation validation
- `validateLocationUpdate`: GPS coordinates validation
- `validatePasswordUpdate`: Password change validation

### Error Handling (`error.js`)
- Global error handler for consistent error responses
- MongoDB error handling (CastError, ValidationError, etc.)

## Utilities

### Helpers (`helpers.js`)
- Response formatting utilities
- Pagination helpers
- Search query builders
- Distance calculations (Haversine formula)
- Validation functions
- Data sanitization

### File Upload (`fileUpload.js`)
- Multer configuration for image uploads
- File type validation
- Size limits and storage configuration

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### Environment Variables
See `.env.example` for all required environment variables.

## Testing

The API can be tested using tools like:
- Postman
- Insomnia
- curl commands
- Frontend integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
