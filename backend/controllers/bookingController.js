import Booking from '../models/Booking.js';
import Driver from '../models/Driver.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { driverId, startTime, endTime, pickupLocation, dropLocation, vehicleDetails, totalAmount } = req.body;
    
    // Get the user ID from the authenticated user
    const userId = req.user._id;
    
    // Find the driver to verify it exists
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    // Create the booking
    const booking = await Booking.create({
      user: userId,
      driver: driverId, // This is correct - assigns to the driver field in schema
      startTime,
      endTime,
      pickupLocation,
      dropLocation,
      vehicleDetails,
      totalAmount: totalAmount || driver.hourlyRate * 4, // Calculate if not provided
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('driver')
            .sort({ createdAt: -1 });
        
        res.json({ success: true, count: bookings.length, bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get all bookings for a driver
export const getDriverBookings = async (req, res) => {
    try {
        // Find the driver profile of the logged-in user
        const driverProfile = await Driver.findOne({ user: req.user._id });
        
        if (!driverProfile) {
            return res.status(404).json({ success: false, message: 'Driver profile not found' });
        }
        
        const bookings = await Booking.find({ driver: driverProfile._id })
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });
        
        res.json({ success: true, count: bookings.length, bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('user', 'name email phone')
            .populate({
                path: 'driver',
                populate: {
                    path: 'user',
                    select: 'name email phone'
                }
            });
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        // Check if user is authorized to view this booking
        if (booking.user._id.toString() !== req.user._id.toString() && 
            booking.driver.user._id.toString() !== req.user._id.toString() && 
            req.user.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not authorized to access this booking' });
        }
        
        res.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        // Only the driver or admin can update booking status
        const driverProfile = await Driver.findOne({ user: req.user._id });
        if (req.user.role !== 'admin' && 
            (!driverProfile || driverProfile._id.toString() !== booking.driver.toString())) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this booking' });
        }
        
        booking.status = status;
        
        // If booking is completed, update payment status
        if (status === 'completed') {
            booking.paymentStatus = 'completed';
        }
        
        await booking.save();
        
        res.json({ success: true, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};