// backend/routes/driverRoutes.js
import express from 'express';
import { registerDriver, getAllDrivers, getDriverById, updateDriverProfile, toggleAvailability } from '../controllers/driverController.js';
import { protect, driver, admin } from '../middleware/auth.js';
import upload from '../utils/fileUpload.js';

const router = express.Router();

// Configure multer upload
const driverUpload = upload.fields([
    { name: 'licenseImage', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'additionalDocs', maxCount: 5 }
]);

// IMPORTANT: Place specific routes before parameterized routes
// Protected routes
router.post('/register', protect, driverUpload, registerDriver);
router.put('/profile', protect, driver, driverUpload, updateDriverProfile);
router.put('/toggle-availability', protect, driver, toggleAvailability);
router.get('/admin/all', protect, admin, getAllDrivers);
router.get('/', getAllDrivers);

// Place parameter routes LAST
router.get('/:id', getDriverById);
export default router;