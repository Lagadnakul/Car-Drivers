import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

// Apply stricter rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 auth attempts per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again after 15 minutes'
    }
});

// Public routes
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

export default router;
