// backend/server.js
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import imageKitRoutes from './routes/imagekit.js';
import fs from 'fs';

// Load env vars
dotenv.config();

// Set default NODE_ENV if not set
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// App config
const app = express();
const PORT = process.env.PORT || 4000;
const MODE = process.env.NODE_ENV;

// Get directory name (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',    // React frontend
    'http://localhost:3001',    // Additional frontend port
    'http://localhost:5173',    // Vite frontend
    'http://localhost:5174'     // Admin frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Debug middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    if (req.method === 'POST') {
      console.log('Body:', req.body);
      console.log('Files:', req.files);
      console.log('Headers:', req.headers);
    }
    next();
  });
}

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
}

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: 'success',
    message: "Car Driver API is Working",
    timestamp: new Date().toISOString()
  });
});

// API routes with versioning
const API_VERSION = '/api';
app.use(`${API_VERSION}/users`, userRoutes);
app.use(`${API_VERSION}/drivers`, driverRoutes);
app.use(`${API_VERSION}/bookings`, bookingRoutes);
app.use(`${API_VERSION}/imagekit`, imageKitRoutes);

// Route logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle specific errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? {
      stack: err.stack,
      ...err
    } : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Process handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // In production, you might want to gracefully shutdown
  // process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // In production, you might want to gracefully shutdown
  // process.exit(1);
});

// Connect to database
connectDB().then(() => {
  // Start server only after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running in ${MODE} mode`);
    console.log(`Server URL: http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

export default app;