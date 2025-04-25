import Driver from '../models/Driver.js';
import User from '../models/User.js';

// Search drivers
export const searchDrivers = async (req, res) => {
  try {
    const { pickupLocation, date, time, vehicleType, minRating, maxPrice } = req.query;
    
    let query = { isAvailable: true };
    
    if (vehicleType) {
      query.vehicleTypes = vehicleType;
    }
    
    if (maxPrice) {
      query.hourlyRate = { $lte: parseFloat(maxPrice) };
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }
    
    const drivers = await Driver.find(query)
      .populate('user', 'name email phone')
      .select('-__v');
    
    res.json({
      success: true,
      count: drivers.length,
      drivers
    });
  } catch (error) {
    console.error('Search drivers error:', error);
    res.status(500).json({
      success: false, 
      message: 'Error searching drivers',
      error: error.message
    });
  }
};

// Register as a driver
export const registerDriver = async (req, res) => {
  try {
    const {
      experience,
      licenseNumber,
      licenseExpiry,
      vehicleTypes,
      hourlyRate
    } = req.body;

    const existingDriver = await Driver.findOne({ user: req.user._id });
    if (existingDriver) {
      return res.status(400).json({ 
        success: false, 
        message: 'Driver profile already exists' 
      });
    }

    const driver = await Driver.create({
      user: req.user._id,
      experience,
      licenseNumber,
      licenseExpiry,
      vehicleTypes: Array.isArray(vehicleTypes) ? vehicleTypes : [vehicleTypes],
      hourlyRate,
      documents: {
        licenseImage: req.files?.licenseImage ? req.files.licenseImage[0].path : '',
        profilePhoto: req.files?.profilePhoto ? req.files.profilePhoto[0].path : '',
        additionalDocs: req.files?.additionalDocs ? req.files.additionalDocs.map(file => file.path) : []
      }
    });

    await User.findByIdAndUpdate(req.user._id, { role: 'driver' });

    res.status(201).json({ success: true, driver });
  } catch (error) {
    console.error('Driver registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering driver',
      error: error.message
    });
  }
};

// Get all drivers
export const getAllDrivers = async (req, res) => {
  try {
    const { vehicleType, available, minRating, maxPrice } = req.query;
    
    let query = {};
    
    if (vehicleType) {
      query.vehicleTypes = vehicleType;
    }
    
    if (available === 'true') {
      query.isAvailable = true;
    }
    
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }
    
    if (maxPrice) {
      query.hourlyRate = { $lte: parseFloat(maxPrice) };
    }
    
    const drivers = await Driver.find(query)
      .populate('user', 'name email phone')
      .select('-__v');
    
    res.json({
      success: true,
      count: drivers.length,
      drivers
    });
  } catch (error) {
    console.error('Get all drivers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching drivers',
      error: error.message
    });
  }
};

// Get driver by ID
export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('user', 'name email phone')
      .select('-__v');
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }
    
    res.json({ success: true, driver });
  } catch (error) {
    console.error('Get driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching driver',
      error: error.message
    });
  }
};

// Update driver profile
export const updateDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver profile not found'
      });
    }
    
    const {
      experience,
      licenseNumber,
      licenseExpiry,
      vehicleTypes,
      hourlyRate,
      isAvailable
    } = req.body;
    
    Object.assign(driver, {
      experience: experience || driver.experience,
      licenseNumber: licenseNumber || driver.licenseNumber,
      licenseExpiry: licenseExpiry || driver.licenseExpiry,
      vehicleTypes: vehicleTypes || driver.vehicleTypes,
      hourlyRate: hourlyRate || driver.hourlyRate,
      isAvailable: isAvailable !== undefined ? isAvailable : driver.isAvailable
    });
    
    if (req.files) {
      if (req.files.licenseImage) {
        driver.documents.licenseImage = req.files.licenseImage[0].path;
      }
      if (req.files.profilePhoto) {
        driver.documents.profilePhoto = req.files.profilePhoto[0].path;
      }
      if (req.files.additionalDocs) {
        driver.documents.additionalDocs = req.files.additionalDocs.map(file => file.path);
      }
    }
    
    const updatedDriver = await driver.save();
    
    res.json({ success: true, driver: updatedDriver });
  } catch (error) {
    console.error('Update driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating driver',
      error: error.message
    });
  }
};

// Toggle driver availability
export const toggleAvailability = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver profile not found'
      });
    }
    
    driver.isAvailable = !driver.isAvailable;
    await driver.save();
    
    res.json({
      success: true,
      message: `Driver is now ${driver.isAvailable ? 'available' : 'unavailable'}`,
      isAvailable: driver.isAvailable
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling availability',
      error: error.message
    });
  }
};

export default {
  searchDrivers,
  registerDriver,
  getAllDrivers,
  getDriverById,
  updateDriverProfile,
  toggleAvailability
};