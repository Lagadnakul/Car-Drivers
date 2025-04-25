import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  profilePhoto: {
    type: String,
    default: '/assets/images/drivers/default.jpg'
  },
  rating: {
    type: Number,
    default: 4.5
  },
  vehicleTypes: [String],
  languages: [String],
  certifications: [String],
  hourlyRate: Number,
  isAvailable: {
    type: Boolean,
    default: true
  },
  experience: Number,
  vehicle: {
    type: String,
    make: String,
    model: String,
    year: Number,
    photo: {
      type: String,
      default: '/assets/images/vehicles/sedan.jpg'
    }
  }
});

export default mongoose.model('Driver', driverSchema);