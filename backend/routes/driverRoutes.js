// d:/VS CODE/Car Driver/backend/routes/driverRoutes.js
import express from 'express';
import {
    deleteDriver,
    getAllDrivers,
    getAvailableDrivers,
    getDriver,
    getDriverBookings,
    getDriverEarnings,
    getDriverRatings,
    getDriverStats,
    getNearbyDrivers,
    registerDriver,
    searchDrivers,
    toggleDriverAvailability,
    updateDriver,
    updateDriverLocation,
    updateDriverStatus,
    updateDriverVehicle,
    uploadDriverDocuments,
    verifyDriverDocuments
} from '../controllers/driverController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/fileUpload.js';

const router = express.Router();

// Public routes
router.get('/', getAllDrivers);
router.get('/search', searchDrivers);
router.get('/nearby', getNearbyDrivers);
router.get('/available', getAvailableDrivers);
router.get('/:id', getDriver);

// Protected routes - driver registration
router.post('/register', protect, upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'vehiclePhoto', maxCount: 1 }
]), registerDriver);

// Protected routes - driver management
router.put('/:id', protect, updateDriver);
router.delete('/:id', protect, deleteDriver);
router.patch('/:id/location', protect, updateDriverLocation);
router.patch('/:id/status', protect, updateDriverStatus);
router.patch('/:id/availability', protect, toggleDriverAvailability);
router.put('/:id/vehicle', protect, updateDriverVehicle);

// Protected routes - driver data
router.get('/:id/bookings', protect, getDriverBookings);
router.get('/:id/earnings', protect, getDriverEarnings);
router.get('/:id/ratings', protect, getDriverRatings);
router.get('/:id/stats', protect, getDriverStats);

// Protected routes - document management
router.post('/:id/documents', protect, upload.fields([
  { name: 'license', maxCount: 1 },
  { name: 'insurance', maxCount: 1 },
  { name: 'registration', maxCount: 1 }
]), uploadDriverDocuments);
router.patch('/:id/documents/verify', protect, verifyDriverDocuments);

export default router;