import express from 'express';
import {
    deleteUser,
    getAllUsers,
    getProfile,
    getUser,
    getUserBookings,
    getUserStats,
    searchUsers,
    updatePassword,
    updateProfile,
    updateProfilePhoto,
    updateUser
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import upload from '../utils/fileUpload.js';

const router = express.Router();

// Public routes
router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.get('/:id', getUser);

// Protected routes - profile management
router.get('/profile/me', protect, getProfile);
router.put('/profile/me', protect, updateProfile);

// Protected routes - user management
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);
router.put('/:id/password', protect, updatePassword);
router.put('/:id/photo', protect, upload.single('profilePhoto'), updateProfilePhoto);

// Protected routes - user data
router.get('/:id/bookings', protect, getUserBookings);
router.get('/:id/stats', protect, getUserStats);

export default router;