import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 attempts per windowMs
  message: 'Too many authentication attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

// ✅ PUBLIC ROUTES
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

// ✅ PROTECTED ROUTES
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);

export default router;