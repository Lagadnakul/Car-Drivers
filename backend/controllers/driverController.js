import Driver from '../models/Driver.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

export const searchDrivers = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, date, time, vehicleType } = req.query;
    
    let query = { isAvailable: true };
    
    if (vehicleType) {
      query.vehicleTypes = vehicleType;
    }

    if (date && time) {
      const searchDateTime = new Date(`${date}T${time}`);
      query.availabilitySchedule = {
        $not: {
          $elemMatch: {
            startTime: { $lte: searchDateTime },
            endTime: { $gte: searchDateTime }
          }
        }
      };
    }

    const drivers = await Driver.find(query)
      .populate('user', 'name email phone')
      .select('-__v -password');
    
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

export const getDriverBookings = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver profile not found'
      });
    }

    const bookings = await Booking.find({ driver: driver._id })
      .populate('user', 'name email phone')
      .sort('-createdAt');

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get driver bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

export const registerDriver = async (req, res) => {
  try {
    const {
      experience,
      licenseNumber,
      licenseExpiry,
      vehicleTypes,
      hourlyRate,
      availability,
      vehicle
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
      isAvailable: true,
      rating: 0,
      ratings: [],
      completedTrips: 0,
      documents: {
        licenseImage: req.files?.licenseImage?.[0]?.path || '',
        profilePhoto: req.files?.profilePhoto?.[0]?.path || '',
        additionalDocs: req.files?.additionalDocs?.map(file => file.path) || []
      },
      vehicle,
      availability
    });

    await User.findByIdAndUpdate(req.user._id, { role: 'driver' });

    res.status(201).json({
      success: true,
      message: 'Driver registered successfully',
      driver
    });
  } catch (error) {
    console.error('Driver registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering driver',
      error: error.message
    });
  }
};

export const getAllDrivers = async (req, res) => {
  try {
    const { vehicleType, available, minRating, maxPrice, sort = '-rating' } = req.query;
    
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
      .select('-__v')
      .sort(sort);
    
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

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('ratings.user', 'name')
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

export const updateDriverProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    if (req.files) {
      updates.documents = {
        ...(req.files.licenseImage && { licenseImage: req.files.licenseImage[0].path }),
        ...(req.files.profilePhoto && { profilePhoto: req.files.profilePhoto[0].path }),
        ...(req.files.additionalDocs && { additionalDocs: req.files.additionalDocs.map(file => file.path) })
      };
    }

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.json({
      success: true,
      message: 'Driver profile updated successfully',
      driver
    });
  } catch (error) {
    console.error('Update driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating driver profile',
      error: error.message
    });
  }
};

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
      message: `Availability ${driver.isAvailable ? 'enabled' : 'disabled'} successfully`,
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

export const updateDriverAvailability = async (req, res) => {
  try {
    const { isAvailable } = req.body;
    const driverId = req.params.id;

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    driver.isAvailable = isAvailable;
    await driver.save();

    res.json({
      success: true,
      message: `Availability ${isAvailable ? 'enabled' : 'disabled'} successfully`,
      isAvailable: driver.isAvailable
    });
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating availability',
      error: error.message
    });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    await driver.remove();
    await User.findByIdAndUpdate(driver.user, { role: 'user' });

    res.json({
      success: true,
      message: 'Driver deleted successfully'
    });
  } catch (error) {
    console.error('Delete driver error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting driver',
      error: error.message
    });
  }
};

export const getRatings = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('ratings.user', 'name')
      .select('ratings');

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.json({
      success: true,
      ratings: driver.ratings
    });
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching ratings',
      error: error.message
    });
  }
};

export const addRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const driverId = req.params.id;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    const newRating = {
      user: userId,
      rating,
      comment,
      date: new Date()
    };

    driver.ratings.push(newRating);

    // Update average rating
    const totalRatings = driver.ratings.length;
    const ratingSum = driver.ratings.reduce((sum, r) => sum + r.rating, 0);
    driver.rating = (ratingSum / totalRatings).toFixed(1);

    await driver.save();

    res.status(201).json({
      success: true,
      message: 'Rating added successfully',
      rating: newRating,
      newAverageRating: driver.rating
    });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding rating',
      error: error.message
    });
  }
};