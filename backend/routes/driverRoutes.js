// backend/routes/driverRoutes.js
import express from 'express';
import { 
  registerDriver, 
  getAllDrivers, 
  getDriverById, 
  updateDriverProfile, 
  toggleAvailability,
  searchDrivers,
  getDriverBookings,
  updateDriverAvailability,
  deleteDriver,
  getRatings,
  addRating
} from '../controllers/driverController.js';
import { protect, driver, admin } from '../middleware/auth.js';
import upload from '../utils/fileUpload.js';

const router = express.Router();

// Configure multer upload for driver documents
const driverUpload = upload.fields([
  { name: 'licenseImage', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'additionalDocs', maxCount: 5 }
]);

// Public routes
router.get('/', getAllDrivers);
router.get('/search', searchDrivers);
router.get('/:id', getDriverById);
router.get('/:id/ratings', getRatings);

// Protected user routes - requires authentication
router.post('/:id/ratings', protect, addRating);

// Protected driver routes - requires authentication and driver role
router.post('/register', protect, driverUpload, registerDriver);
router.put('/profile', protect, driver, driverUpload, updateDriverProfile);
router.put('/toggle-availability', protect, driver, toggleAvailability);
router.get('/my/bookings', protect, driver, getDriverBookings);
router.put('/:id/availability', protect, driver, updateDriverAvailability);

// Admin routes - requires authentication and admin role
router.get('/admin/drivers', protect, admin, getAllDrivers);
router.delete('/:id', protect, admin, deleteDriver);
router.put('/admin/:id', protect, admin, driverUpload, updateDriverProfile);

// Additional filtering/sorting routes
router.get('/filter/available', getAllDrivers);
router.get('/sort/rating', getAllDrivers);
router.get('/sort/experience', getAllDrivers);

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *           description: Reference to User model
 *         rating:
 *           type: number
 *         vehicleTypes:
 *           type: array
 *           items:
 *             type: string
 *         hourlyRate:
 *           type: number
 *         isAvailable:
 *           type: boolean
 */

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     parameters:
 *       - name: vehicleType
 *         in: query
 *         schema:
 *           type: string
 *       - name: available
 *         in: query
 *         schema:
 *           type: boolean
 *       - name: minRating
 *         in: query
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         schema:
 *           type: number
 */

/**
 * @swagger
 * /api/drivers/{id}/ratings:
 *   post:
 *     summary: Add rating for a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 */

export default router;