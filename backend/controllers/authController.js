/**
 * ============================================
 * AUTH CONTROLLER
 * User Authentication (Register, Login, Logout)
 * ============================================
 * 
 * CRITICAL: Every function MUST send response (no hanging requests)
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Generate JWT Token
 */
const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate token');
  }
};

/**
 * REGISTER - Create new user account
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // ✅ Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email, password, and phone' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    // ✅ Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword, 
      phone: phone.trim(),
      role: role || 'user'
    });

    const token = generateToken(user._id);
    
    return res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      token, 
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Registration failed' 
    });
  }
};

/**
 * LOGIN - Authenticate user and return token
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // ✅ Find user and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // ✅ Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // ✅ Generate token
    const token = generateToken(user._id);

    // ✅ Remove password from response
    user.password = undefined;

    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      token, 
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Login failed' 
    });
  }
};

/**
 * LOGOUT - Clear user session
 * POST /api/auth/logout
 */
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ 
      success: true, 
      message: 'Logout successful' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Logout failed' 
    });
  }
};

/**
 * GET CURRENT USER - Get authenticated user profile
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching user profile' 
    });
  }
};

/**
 * UPDATE PROFILE - Update user information
 * PUT /api/auth/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const updates = {};

    if (name) {
      updates.name = name.trim();
    }
    if (phone) {
      updates.phone = phone.trim();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating profile' 
    });
  }
};