// d:/VS CODE/Car Driver/backend/controllers/bookingController.js
import mongoose from 'mongoose';
import Driver from '../models/Driver.js';
import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const { driverId, startTime, endTime, pickupLocation, dropLocation, totalAmount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({ success: false, message: 'Invalid driver ID format' });
    }
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    if (!driver.isAvailable) {
      return res.status(400).json({ success: false, message: 'Driver is not available' });
    }
    const conflictingBooking = await Booking.findOne({
      driver: driverId,
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { startTime: { $lte: new Date(startTime) }, endTime: { $gte: new Date(startTime) } },
        { startTime: { $lte: new Date(endTime) }, endTime: { $gte: new Date(endTime) } }
      ]
    });
    if (conflictingBooking) {
      return res.status(400).json({ success: false, message: 'Driver is not available for this time slot' });
    }
    const booking = await Booking.create({
      user: req.user._id,
      driver: driverId,
      startTime,
      endTime,
      pickupLocation,
      dropLocation,
      totalAmount,
      status: 'pending'
    });
    driver.isAvailable = false;
    await driver.save();
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email phone')
      .populate('driver', 'user hourlyRate vehicleTypes');
    res.status(201).json({ success: true, data: populatedBooking });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('driver')
      .sort('-createdAt');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('driver', 'user hourlyRate vehicleTypes rating');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (booking.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Only pending bookings can be updated' });
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('driver', 'user hourlyRate vehicleTypes');
    res.status(200).json({ success: true, data: updatedBooking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ success: false, message: 'Only pending or confirmed bookings can be cancelled' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ success: true, data: booking, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};