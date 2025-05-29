import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import imageKitRoutes from './routes/imagekit.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import fs from 'fs';

// Load env vars
dotenv.config();

// App initialization
const app = express();
const PORT = process.env.PORT || 4000;
const MODE = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',    // React frontend
    'http://localhost:5173',    // Vite frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Documentation with Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec));

// Static files configuration
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
}

// Development logging middleware
if (MODE === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    if (['POST', 'PUT'].includes(req.method)) {
      console.log('Body:', JSON.stringify(req.body, null, 2));
      console.log('Files:', req.files);
    }
    next();
  });
}

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: 'success',
    message: "Car Driver API is Working",
    timestamp: new Date().toISOString(),
    environment: MODE
  });
});

// API Routes with versioning
const API_VERSION = '/api';
app.use(`${API_VERSION}/users`, userRoutes);
app.use(`${API_VERSION}/drivers`, driverRoutes);
app.use(`${API_VERSION}/bookings`, bookingRoutes);
app.use(`${API_VERSION}/imagekit`, imageKitRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const errorHandlers = {
    'CastError': () => res.status(400).json({
      success: false,
      message: 'Invalid ID format',
    }),
    'ValidationError': () => res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    }),
    'JsonWebTokenError': () => res.status(401).json({
      success: false,
      message: 'Invalid token'
    }),
    'TokenExpiredError': () => res.status(401).json({
      success: false,
      message: 'Token expired'
    }),
    'MongoError': () => res.status(400).json({
      success: false,
      message: err.code === 11000 ? 'Duplicate field value entered' : 'Database Error'
    })
  };

  // Handle specific errors or return default error response
  const handler = errorHandlers[err.name];
  if (handler) return handler();

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: MODE === 'development' ? { stack: err.stack, ...err } : undefined
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Process Error Handlers
const handleFatalError = (err, type) => {
  console.error(`${type}:`, err);
  if (MODE === 'production') {
    // Log to external service in production
    process.exit(1);
  }
};

// Handle uncaught errors
process.on('unhandledRejection', (err) => handleFatalError(err, 'Unhandled Promise Rejection'));
process.on('uncaughtException', (err) => handleFatalError(err, 'Uncaught Exception'));

// Server Startup
const startServer = async () => {
  try {
    await connectDB(); // This is the only place we connect to MongoDB
    app.listen(PORT, () => {
      console.log(`✨ Server is running in ${MODE} mode on port ${PORT}`);
      console.log(`📡 Server URL: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server startup failed:', err);
    process.exit(1);
  }
};

startServer();

export default app;