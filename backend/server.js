import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import imageKitRoutes from './routes/imagekit.js';
import { html } from "./config/backendcheck.js";

// Load env vars
dotenv.config({path:'./.env.local'});

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Get directory name (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',                
  'http://localhost:4000',
  'http://localhost:5174',                
  'http://localhost:5173',                                
  process.env.FRONTEND_URL,              
  process.env.ADMIN_URL                   
].filter(Boolean); 

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors(corsOptions));

// Request logger with enhanced details for development environment
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log when request finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logString = `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`;
    
    // Color based on status code
    if (res.statusCode >= 500) {
      console.error('\x1b[31m%s\x1b[0m', logString); // Red for server errors
    } else if (res.statusCode >= 400) {
      console.warn('\x1b[33m%s\x1b[0m', logString);  // Yellow for client errors
    } else {
      console.log('\x1b[32m%s\x1b[0m', logString);   // Green for successful responses
    }
  });
  
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/imagekit', imageKitRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// DB connection
connectDB();

// Root route - displays API landing page
app.get("/", (req, res) => {
  // Replace {PORT} with the actual port number
  const formattedHtml = html.replace("{PORT}", PORT);
  res.send(formattedHtml);
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Server error' 
      : err.message || 'Something went wrong',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Run express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // For production, consider graceful shutdown:
  // server.close(() => process.exit(1));
});