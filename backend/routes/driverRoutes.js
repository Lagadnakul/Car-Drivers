import express from 'express';
import { registerDriver, getAllDrivers, getDriverById, updateDriverProfile, toggleAvailability } from '../controllers/driverController.js';
import { protect, driver } from '../middleware/auth.js';
import upload from '../utils/FileUpload.js';

const router = express.Router();

const driverUpload = upload.fields([
    { name: 'licenseImage', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'additionalDocs', maxCount: 5 }
]);

router.post('/register', protect, driverUpload, registerDriver);
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);
router.put('/profile', protect, driver, driverUpload, updateDriverProfile);
router.put('/toggle-availability', protect, driver, toggleAvailability);

export default router;