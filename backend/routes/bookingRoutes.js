import express from 'express';
import { createBooking, getUserBookings, getDriverBookings, getBookingById, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, driver } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/driver', protect, driver, getDriverBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id/status', protect, updateBookingStatus);

export default router;