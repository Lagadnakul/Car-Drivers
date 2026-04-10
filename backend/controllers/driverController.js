// filepath: d:\VS CODE\Car Driver\backend\controllers\driverController.js (updated - key functions)
import Driver from '../models/Driver.js';
import User from '../models/User.js';

// ✅ GET ALL DRIVERS
export const getAllDrivers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      isAvailable,
      vehicleType,
      minRating,
      search
    } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (vehicleType) filter.vehicleTypes = { $in: [vehicleType] };
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    // Search by name
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');

      const userIds = users.map(user => user._id);
      filter.user = { $in: userIds };
    }

    const skip = (page - 1) * limit;
    const drivers = await Driver.find(filter)
      .populate('user', 'name email phone')
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-createdAt');

    const total = await Driver.countDocuments(filter);

    res.status(200).json({
      success: true,
      drivers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get drivers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get drivers'
    });
  }
};

// ✅ GET SINGLE DRIVER
export const getDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id)
      .populate('user', 'name email phone profilePhoto')
      .populate({
        path: 'ratings.user',
        select: 'name'
      });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    res.status(200).json({
      success: true,
      driver
    });
  } catch (error) {
    console.error('Get driver error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get driver'
    });
  }
};

// ✅ SEARCH DRIVERS
export const searchDrivers = async (req, res) => {
  try {
    const { q, vehicleType, minRating } = req.query;

    const filter = {};

    if (q) {
      const users = await User.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
        ]
      }).select('_id');

      filter.user = { $in: users.map(u => u._id) };
    }

    if (vehicleType) filter.vehicleTypes = { $in: [vehicleType] };
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };

    const drivers = await Driver.find(filter)
      .populate('user', 'name email phone')
      .limit(20)
      .sort('-rating');

    res.status(200).json({
      success: true,
      drivers
    });
  } catch (error) {
    console.error('Search drivers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search drivers'
    });
  }
};

// ✅ GET AVAILABLE DRIVERS
export const getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ isAvailable: true })
      .populate('user', 'name email phone')
      .sort('-rating');

    res.status(200).json({
      success: true,
      drivers
    });
  } catch (error) {
    console.error('Get available drivers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get available drivers'
    });
  }
};

// ✅ GET NEARBY DRIVERS
export const getNearbyDrivers = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const drivers = await Driver.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseFloat(maxDistance)
        }
      }
    })
      .populate('user', 'name email phone')
      .limit(10)
      .sort('-rating');

    res.status(200).json({
      success: true,
      drivers
    });
  } catch (error) {
    console.error('Get nearby drivers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get nearby drivers'
    });
  }
};

// Placeholder functions for other endpoints
export const registerDriver = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const updateDriver = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const deleteDriver = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const updateDriverLocation = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const updateDriverStatus = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const toggleDriverAvailability = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const updateDriverVehicle = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const getDriverBookings = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const getDriverEarnings = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const getDriverRatings = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const getDriverStats = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const uploadDriverDocuments = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};

export const verifyDriverDocuments = async (req, res) => {
  res.status(501).json({ success: false, message: 'Not implemented' });
};