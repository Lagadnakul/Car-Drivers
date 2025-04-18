# Go Pilot API - Backend

This repository contains the backend API for the Go Pilot application, a professional driver booking platform that connects users with verified drivers.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT
- **Driver Management**: Driver profiles, verification, and availability management
- **Booking System**: Book drivers with location, date and time selection
- **File Upload**: Support for profile photos, license images, and additional documents
- **ImageKit Integration**: Cloud storage for images
- **RESTful API**: Well-structured API endpoints

## 📋 Prerequisites

- Node.js (v16.x or higher)
- MongoDB (v5.x or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Car-Drivers/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create .env.local file in the root directory with the following variables:
   ```
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/go-pilot-db
   JWT_SECRET=your_jwt_secret_key
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## 🗄️ Project Structure

```
backend/
├── config/             # Configuration files
│   ├── backendcheck.js # HTML template for the API landing page
│   ├── db.js           # MongoDB connection configuration
│   └── imagekit.js     # ImageKit configuration
├── controllers/        # Request handlers
│   ├── bookingController.js  # Booking related operations
│   ├── driverController.js   # Driver profile operations
│   └── userController.js     # User authentication & profile
├── middleware/
│   └── auth.js         # JWT authentication middleware
├── models/             # MongoDB schemas
│   ├── Booking.js      # Booking model
│   ├── Driver.js       # Driver model
│   └── User.js         # User model
├── routes/             # API routes
│   ├── bookingRoutes.js
│   ├── driverRoutes.js
│   ├── imagekit.js
│   └── userRoutes.js
├── uploads/            # Local storage for uploaded files
├── utils/
│   └── fileUpload.js   # File upload configuration
├── .gitignore          # Git ignore file
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Docker container configuration
├── package.json        # Project dependencies
├── render.yaml         # Render.com deployment configuration
├── server.js           # Entry point
└── vercel.json         # Vercel deployment configuration
```

## 📡 API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login (returns JWT)
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Drivers
- `POST /api/drivers/register` - Register as a driver (protected)
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get a specific driver
- `PUT /api/drivers/profile` - Update driver profile (protected)
- `PUT /api/drivers/toggle-availability` - Toggle driver availability (protected)

### Bookings
- `POST /api/bookings` - Create a new booking (protected)
- `GET /api/bookings` - Get all bookings for user/driver (protected)
- `GET /api/bookings/:id` - Get a specific booking (protected)
- `PUT /api/bookings/:id` - Update booking status (protected)

### ImageKit
- `GET /api/imagekit/auth` - Get ImageKit authentication parameters
- `POST /api/imagekit/upload` - Upload a file to ImageKit
- `DELETE /api/imagekit/:fileId` - Delete a file from ImageKit

## 📁 File Upload

The API supports file uploads using Multer and ImageKit:

- Profile photos (JPEG, PNG, WebP)
- License images (JPEG, PNG, PDF)
- Additional documents (PDF, DOC, DOCX)

Files are uploaded directly to ImageKit cloud storage for better scalability and performance.

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 4000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT token generation |
| IMAGEKIT_PUBLIC_KEY | ImageKit public key |
| IMAGEKIT_PRIVATE_KEY | ImageKit private key |
| IMAGEKIT_URL_ENDPOINT | ImageKit URL endpoint |
| FRONTEND_URL | URL of the frontend application |
| NODE_ENV | Environment (development/production) |

## 🔒 Authentication

The API uses JWT (JSON Web Token) for authentication. Protected endpoints require an `Authorization` header with a format of `Bearer <token>`.

## 🚢 Deployment Options

### Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. Stop containers:
   ```bash
   docker-compose down
   ```

### Render.com Deployment

1. Push your code to a GitHub repository
2. Connect your repository to Render.com
3. Render will use the `render.yaml` configuration file to set up the services
4. Set up the environment variables in the Render dashboard

### Vercel Deployment

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. For production deployment:
   ```bash
   vercel --prod
   ```

Note: For Vercel deployment, you'll need to use a MongoDB Atlas instance since Vercel doesn't support persistent storage.

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

- Nakul Lagad - Lead Developer