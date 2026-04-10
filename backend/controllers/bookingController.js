// filepath: d:\VS CODE\Car Driver\backend\controllers\bookingController.js
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Driver from '../models/Driver.js';

// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { driverId, startTime, endTime, pickupLocation, dropLocation, totalAmount } = req.body;
    const userId = req.user._id;

    // Validation
    if (!driverId || !startTime || !endTime || !pickupLocation) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: driverId, startTime, endTime, pickupLocation'
      });
    }

    // Validate driver ID format
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid driver ID format'
      });
    }

    // Check if driver exists
    const driver = await Driver.findById(driverId).populate('user', 'name email');
    if (!driver) {
      return res.status(404).json({
        success: false,
        message: 'Driver not found'
      });
    }

    // Check if driver is available
    if (!driver.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Driver is not available'
      });
    }

    // Check for conflicting bookings
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const conflictingBooking = await Booking.findOne({
      driver: driverId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startTime: { $lte: endDate }, endTime: { $gte: startDate } }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Driver is not available for this time slot'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      driver: driverId,
      startTime: startDate,
      endTime: endDate,
      pickupLocation,
      dropLocation: dropLocation || pickupLocation,
      totalAmount: parseFloat(totalAmount) || 0,
      status: 'confirmed', // ✅ Auto-confirm for COD
      paymentMethod: 'COD',
      paymentStatus: 'pending'
    });

    // Update driver availability
    driver.isAvailable = false;
    driver.totalTrips = (driver.totalTrips || 0) + 1;
    await driver.save();

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('driver', 'user hourlyRate vehicleTypes rating');

    console.log('✅ Booking created:', booking._id);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create booking'
    });
  }
};

// ✅ GET ALL BOOKINGS (User's bookings)
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('user', 'name email phone')
      .populate('driver', 'user hourlyRate vehicleTypes rating')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get bookings'
    });
  }
};

// ✅ GET SINGLE BOOKING
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('driver', 'user hourlyRate vehicleTypes rating');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get booking'
    });
  }
};

// ✅ UPDATE BOOKING
export const updateBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Only allow updates if pending
    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending bookings can be updated'
      });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('driver', 'user hourlyRate vehicleTypes');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update booking'
    });
  }
};

// ✅ CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    // Only allow cancellation if pending or confirmed
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: 'Only pending or confirmed bookings can be cancelled'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Update driver availability
    const driver = await Driver.findById(booking.driver);
    if (driver) {
      driver.isAvailable = true;
      await driver.save();
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to cancel booking'
    });
  }
};

// ✅ DELETE BOOKING (Admin only)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check authorization
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete booking'
    });
  }
};