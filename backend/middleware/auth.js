import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized, no token' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Not authorized as an admin' });
    }
};

export const driver = (req, res, next) => {
    if (req.user && req.user.role === 'driver') {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Not authorized as a driver' });
    }
};