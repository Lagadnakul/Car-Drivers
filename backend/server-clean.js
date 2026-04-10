/**
 * ============================================
 * FIND MY DRIVER - BACKEND SERVER
 * Production-Ready MERN Application
 * ============================================
 * 
 * Features:
 * - User Authentication (JWT + bcrypt)
 * - Driver Management
 * - Booking System
 * - Admin Dashboard
 * - Error Handling & Validation
 * - CORS Security
 * - Rate Limiting
 */

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Load environment variables
dotenv.config();

// ✅ Import database connection
import { connectDB } from './config/db.js';

// ✅ Import routes
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import userRoutes from './routes/userRoutes.js';

// ✅ Import middleware
import errorHandler from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimit.js';

// ✅ Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// INITIALIZE EXPRESS APP
// ============================================
const app = express();

// ============================================
// CONNECT TO DATABASE
// ============================================
let dbConnected = false;
connectDB()
  .then(() => {
    dbConnected = true;
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((error) => {
    console.error('⚠️ MongoDB Connection Failed:', error.message);
    console.log('⚠️ Running in Mock Mode - No Database Persistence');
    dbConnected = false;
  });

// ============================================
// MIDDLEWARE - CORS (MUST BE FIRST)
// ============================================
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:3000',
    'http://localhost:4000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ============================================
// MIDDLEWARE - BODY PARSERS
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// ============================================
// MIDDLEWARE - RATE LIMITING (AUTH ONLY)
// ============================================
app.use('/api/auth/', apiLimiter);

// ============================================
// ROUTES - HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      dbConnected: dbConnected,
      port: PORT,
    });
  } catch (error) {
    console.error('❌ Health check error:', error);
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
    });
  }
});

// ============================================
// ROUTES - API ENDPOINTS
// ============================================
console.log('🔗 Registering routes...');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

console.log('✅ All routes registered successfully');

// ============================================
// MIDDLEWARE - 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    availableRoutes: [
      'POST /api/auth/register',
      'POST /api/auth/login',
      'POST /api/auth/logout',
      'GET /api/drivers',
      'GET /api/drivers/:id',
      'GET /api/users/profile',
      'GET /api/bookings',
      'POST /api/bookings',
    ],
  });
});

// ============================================
// MIDDLEWARE - ERROR HANDLER (MUST BE LAST)
// ============================================
app.use(errorHandler);

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   🚀 FIND MY DRIVER - BACKEND 🚀      ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║ ✅ Server running on port: ${PORT}`);
  console.log(`║ 📝 Environment: ${NODE_ENV}`);
  console.log(`║ 🗄️  Database: ${dbConnected ? 'Connected ✅' : 'Mock Mode ⚠️'}`);
  console.log('║                                        ║');
  console.log('║ 🔗 API: http://localhost:5000/api     ║');
  console.log('║ 💚 Health: http://localhost:5000/api/health ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================
process.on('SIGTERM', () => {
  console.log('📋 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

export default app;
