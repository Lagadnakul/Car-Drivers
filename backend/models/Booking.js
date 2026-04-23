// d:/VS CODE/Car Driver/backend/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', sparse: true },
  mockDriverId: { type: String, sparse: true }, // For mock driver bookings
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['COD', 'Card', 'Wallet'], default: 'COD' },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'refunded'], default: 'pending' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;