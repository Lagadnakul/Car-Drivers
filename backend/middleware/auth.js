import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Protect routes - Authentication middleware
export const protect = async (req, res, next) => {
    let token;

    try {
        // Check for token in headers
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Check for token in cookies
        else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized, no token' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Add user to request object
        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }
        res.status(401).json({
            success: false,
            message: 'Not authorized, authentication failed'
        });
    }
};

// Admin role middleware
export const admin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as admin'
            });
        }

        next();
    } catch (error) {
        console.error('Admin authorization error:', error);
        res.status(500).json({
            success: false,
            message: 'Admin authorization failed'
        });
    }
};

// Driver role middleware
export const driver = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        if (req.user.role !== 'driver') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as driver'
            });
        }

        next();
    } catch (error) {
        console.error('Driver authorization error:', error);
        res.status(500).json({
            success: false,
            message: 'Driver authorization failed'
        });
    }
};

// Combined role middleware - allows multiple roles
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.user.role} is not authorized to access this route`
            });
        }

        next();
    };
};