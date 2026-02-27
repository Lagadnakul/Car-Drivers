import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Driver from '../models/Driver.js';
import User from '../models/User.js';

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Public
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
    
    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (vehicleType) filter.vehicleTypes = { $in: [vehicleType] };
    if (minRating) filter.rating = { $gte: parseFloat(minRating) };
    
    let query = Driver.find(filter).populate('user', 'name email phone');
    
    // Add search functionality
    if (search) {
      const users = await User.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      
      const userIds = users.map(user => user._id);
      filter.user = { $in: userIds };
      query = Driver.find(filter).populate('user', 'name email phone');
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    const drivers = await query.skip(skip).limit(parseInt(limit)).sort('-createdAt');
    
    const total = await Driver.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: drivers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single driver
// @route   GET /api/drivers/:id
// @access  Public
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
      data: driver
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Register new driver
// @route   POST /api/drivers/register
// @access  Private
export const registerDriver = async (req, res) => {
  try {
    const {
      licenseNumber,
      vehicleInfo,
      bankDetails,
      emergencyContact,
      vehicleTypes
    } = req.body;

    // Check if driver already exists for this user
    const existingDriver = await Driver.findOne({ user: req.user.id });
    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: 'Driver profile already exists for this user'
      });
    }

    // Create driver profile
    const driver = await Driver.create({
      user: req.user.id,
      licenseNumber,
      vehicleInfo,
      bankDetails,
      emergencyContact,
      vehicleTypes: vehicleTypes || ['car'],
      status: 'pending',
      isAvailable: false,
      isVerified: false,
      location: {
        type: 'Point',
        coordinates: [0, 0]
      },
      profilePhoto: req.files?.profilePhoto?.[0]?.path,
      vehiclePhoto: req.files?.vehiclePhoto?.[0]?.path
    });

    const populatedDriver = await Driver.findById(driver._id)
      .populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      data: populatedDriver,
      message: 'Driver registration submitted for review'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update driver
// @route   PUT /api/drivers/:id
// @access  Private
export const updateDriver = async (req, res) => {
  try {
    const updates = req.body;
    
    // Remove sensitive fields that shouldn't be updated directly
    delete updates.status;
    delete updates.isVerified;
    delete updates.rating;
    delete updates.totalRides;
    delete updates.totalEarnings;

    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this driver profile'
      });
    }

    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      data: updatedDriver,
      message: 'Driver updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete driver
// @route   DELETE /api/drivers/:id
// @access  Private
export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this driver profile'
      });
    }

    // Check for active bookings
    const activeBookings = await Booking.countDocuments({
      driver: req.params.id,
      status: { $in: ['pending', 'accepted', 'in_progress'] }
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete driver with active bookings'
      });
    }

    await Driver.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Driver deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get nearby drivers
// @route   GET /api/drivers/nearby
// @access  Public
export const getNearbyDrivers = async (req, res) => {
  try {
    const { lat, lng, radius = 10, vehicleType } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const filter = {
      isAvailable: true,
      status: 'active',
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      }
    };

    if (vehicleType) {
      filter.vehicleTypes = { $in: [vehicleType] };
    }

    const drivers = await Driver.find(filter)
      .populate('user', 'name phone')
      .limit(20)
      .select('user vehicleInfo location rating totalRides vehicleTypes profilePhoto');

    res.status(200).json({
      success: true,
      data: drivers,
      count: drivers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update driver location
// @route   PATCH /api/drivers/:id/location
// @access  Private
export const updateDriverLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile
    if (driver.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this driver location'
      });
    }

    driver.location = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    driver.lastLocationUpdate = new Date();

    await driver.save();

    res.status(200).json({
      success: true,
      data: driver,
      message: 'Location updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update driver status
// @route   PATCH /api/drivers/:id/status
// @access  Private (Admin only)
export const updateDriverStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'active', 'suspended', 'rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    driver.status = status;
    driver.isVerified = status === 'active';

    if (status === 'suspended' || status === 'rejected') {
      driver.isAvailable = false;
    }

    await driver.save();

    const populatedDriver = await Driver.findById(driver._id)
      .populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      data: populatedDriver,
      message: `Driver status updated to ${status}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Toggle driver availability
// @route   PATCH /api/drivers/:id/availability
// @access  Private
export const toggleDriverAvailability = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile
    if (driver.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this driver availability'
      });
    }

    // Check if driver is verified and active
    if (driver.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Driver must be active to change availability'
      });
    }

    driver.isAvailable = !driver.isAvailable;
    await driver.save();

    res.status(200).json({
      success: true,
      data: driver,
      message: `Driver is now ${driver.isAvailable ? 'available' : 'unavailable'}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get driver bookings
// @route   GET /api/drivers/:id/bookings
// @access  Private
export const getDriverBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these bookings'
      });
    }

    const filter = { driver: req.params.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const bookings = await Booking.find(filter)
      .populate('user', 'name phone')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get driver earnings
// @route   GET /api/drivers/:id/earnings
// @access  Private
export const getDriverEarnings = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these earnings'
      });
    }

    // Calculate date range based on period
    const now = new Date();
    let startDate;

    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const earnings = await Booking.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(req.params.id),
          status: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: '$fare' },
          totalTrips: { $sum: 1 },
          avgFare: { $avg: '$fare' }
        }
      }
    ]);

    const result = earnings[0] || {
      totalEarnings: 0,
      totalTrips: 0,
      avgFare: 0
    };

    // Get daily breakdown for the period
    const dailyEarnings = await Booking.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(req.params.id),
          status: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$createdAt' },
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          earnings: { $sum: '$fare' },
          trips: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        period,
        summary: result,
        dailyBreakdown: dailyEarnings,
        driverTotalEarnings: driver.totalEarnings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get driver ratings
// @route   GET /api/drivers/:id/ratings
// @access  Private
export const getDriverRatings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these ratings'
      });
    }

    const skip = (page - 1) * limit;
    
    // Get detailed ratings from bookings
    const ratings = await Booking.find({
      driver: req.params.id,
      'rating.rating': { $exists: true }
    })
    .populate('user', 'name')
    .select('rating createdAt')
    .sort('-createdAt')
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Booking.countDocuments({
      driver: req.params.id,
      'rating.rating': { $exists: true }
    });

    // Calculate rating distribution
    const ratingDistribution = await Booking.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(req.params.id),
          'rating.rating': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$rating.rating',
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        ratings: ratings.map(booking => ({
          rating: booking.rating.rating,
          comment: booking.rating.comment,
          user: booking.user,
          date: booking.createdAt
        })),
        distribution: ratingDistribution,
        averageRating: driver.rating,
        totalRatings: total,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get driver statistics
// @route   GET /api/drivers/:id/stats
// @access  Private
export const getDriverStats = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile or is admin
    if (driver.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these statistics'
      });
    }

    const stats = await Booking.aggregate([
      {
        $match: { driver: new mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalFare: { $sum: '$fare' }
        }
      }
    ]);

    // Monthly performance
    const monthlyStats = await Booking.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(req.params.id),
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          trips: { $sum: 1 },
          earnings: { $sum: '$fare' },
          avgRating: { $avg: '$rating.rating' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Peak hours analysis
    const peakHours = await Booking.aggregate([
      {
        $match: {
          driver: new mongoose.Types.ObjectId(req.params.id),
          status: 'completed'
        }
      },
      {
        $group: {
          _id: { $hour: '$createdAt' },
          trips: { $sum: 1 },
          earnings: { $sum: '$fare' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalRides: driver.totalRides,
          totalEarnings: driver.totalEarnings,
          averageRating: driver.rating,
          status: driver.status,
          isAvailable: driver.isAvailable
        },
        statusBreakdown: stats,
        monthlyPerformance: monthlyStats,
        peakHours,
        joinDate: driver.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Search drivers
// @route   GET /api/drivers/search
// @access  Public
export const searchDrivers = async (req, res) => {
  try {
    const {
      query,
      vehicleType,
      minRating,
      maxDistance,
      lat,
      lng,
      page = 1,
      limit = 10
    } = req.query;

    let filter = {
      isAvailable: true,
      status: 'active'
    };

    if (vehicleType) {
      filter.vehicleTypes = { $in: [vehicleType] };
    }

    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // Location-based search
    if (lat && lng && maxDistance) {
      filter.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseFloat(maxDistance) * 1000
        }
      };
    }

    let drivers;

    if (query) {
      // Text search in user details
      const users = await User.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ]
      }).select('_id');

      const userIds = users.map(user => user._id);
      filter.user = { $in: userIds };
    }

    const skip = (page - 1) * limit;
    drivers = await Driver.find(filter)
      .populate('user', 'name email phone')
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-rating');

    const total = await Driver.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: drivers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update driver vehicle
// @route   PUT /api/drivers/:id/vehicle
// @access  Private
export const updateDriverVehicle = async (req, res) => {
  try {
    const { vehicleInfo, vehicleTypes } = req.body;

    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile
    if (driver.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this vehicle information'
      });
    }

    if (vehicleInfo) {
      driver.vehicleInfo = { ...driver.vehicleInfo, ...vehicleInfo };
    }

    if (vehicleTypes) {
      driver.vehicleTypes = vehicleTypes;
    }

    await driver.save();

    const populatedDriver = await Driver.findById(driver._id)
      .populate('user', 'name email phone');

    res.status(200).json({
      success: true,
      data: populatedDriver,
      message: 'Vehicle information updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Upload driver documents
// @route   POST /api/drivers/:id/documents
// @access  Private
export const uploadDriverDocuments = async (req, res) => {
  try {
    const { documentType } = req.body;
    
    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if user owns this driver profile
    if (driver.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to upload documents for this driver'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No document file uploaded'
      });
    }

    // Update document information
    if (!driver.documents) {
      driver.documents = {};
    }

    driver.documents[documentType] = {
      url: req.file.path,
      uploadedAt: new Date(),
      verified: false
    };

    await driver.save();

    res.status(200).json({
      success: true,
      data: driver,
      message: `${documentType} document uploaded successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Verify driver documents
// @route   POST /api/drivers/:id/verify
// @access  Private (Admin only)
export const verifyDriverDocuments = async (req, res) => {
  try {
    const { documentType, verified, rejectionReason } = req.body;

    const driver = await Driver.findById(req.params.id);
    
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    if (!driver.documents || !driver.documents[documentType]) {
      return res.status(400).json({
        success: false,
        message: `${documentType} document not found`
      });
    }

    // Update document verification status
    driver.documents[documentType].verified = verified;
    driver.documents[documentType].verifiedAt = verified ? new Date() : null;
    driver.documents[documentType].verifiedBy = verified ? req.user.id : null;
    driver.documents[documentType].rejectionReason = !verified ? rejectionReason : null;

    // Check if all required documents are verified
    const requiredDocs = ['license', 'insurance', 'registration'];
    const allVerified = requiredDocs.every(doc => 
      driver.documents[doc]?.verified === true
    );

    if (allVerified && driver.status === 'pending') {
      driver.status = 'active';
      driver.isVerified = true;
    } else if (!verified && driver.status === 'active') {
      driver.status = 'pending';
      driver.isVerified = false;
    }

    await driver.save();

    res.status(200).json({
      success: true,
      data: driver,
      message: `Document ${documentType} ${verified ? 'verified' : 'rejected'} successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all available drivers
// @route   GET /api/drivers/available
// @access  Public
export const getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ isAvailable: true, status: 'active' })
      .populate('user', 'name email phone');
    res.status(200).json({
      success: true,
      data: drivers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
