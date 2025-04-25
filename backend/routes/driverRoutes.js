import express from 'express';
import { 
  registerDriver, 
  getAllDrivers, 
  getDriverById, 
  updateDriverProfile, 
  toggleAvailability,
  searchDrivers
} from '../controllers/driverController.js';
import { protect, driver, admin } from '../middleware/auth.js';
import upload from '../utils/fileUpload.js';

const router = express.Router();

// Configure multer upload
const driverUpload = upload.fields([
  { name: 'licenseImage', maxCount: 1 },
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'additionalDocs', maxCount: 5 }
]);

// Public routes
router.get('/search', searchDrivers);
router.get('/', getAllDrivers);
router.get('/:id', getDriverById);

// Protected driver routes
router.post('/register', protect, driverUpload, registerDriver);
router.put('/profile', protect, driver, driverUpload, updateDriverProfile);
router.put('/toggle-availability', protect, driver, toggleAvailability);

// Admin routes
router.get('/admin/all', protect, admin, getAllDrivers);

export default router;