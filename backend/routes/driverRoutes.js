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
  deleteDriver
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

// Public routes - accessible without authentication
router.get('/search', searchDrivers);
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);

// Protected driver routes - requires authentication and driver role
router.post('/register', protect, driverUpload, registerDriver);
router.put('/profile', protect, driver, driverUpload, updateDriverProfile);
router.put('/toggle-availability', protect, driver, toggleAvailability);
router.get('/my/bookings', protect, driver, getDriverBookings);
router.put('/:id/availability', protect, driver, updateDriverAvailability);

// Admin routes - requires authentication and admin role
router.get('/admin/all', protect, admin, getAllDrivers);
router.delete('/:id', protect, admin, deleteDriver);
router.put('/admin/:id', protect, admin, driverUpload, updateDriverProfile);

// Filter and sort routes
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
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     tags: [Drivers]
 *     parameters:
 *       - in: query
 *         name: vehicleType
 *         schema:
 *           type: string
 *         description: Filter by vehicle type
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter by availability
 *     responses:
 *       200:
 *         description: List of drivers
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/drivers/{id}:
 *   get:
 *     summary: Get driver by ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver details
 *       404:
 *         description: Driver not found
 */

/**
 * @swagger
 * /api/drivers/register:
 *   post:
 *     summary: Register as a driver
 *     tags: [Drivers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               licenseImage:
 *                 type: string
 *                 format: binary
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Driver registered successfully
 *       400:
 *         description: Invalid input
 */

export default router;