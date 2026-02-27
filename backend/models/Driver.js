import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required']
  },
  vehicleTypes: [{
    type: String,
    required: [true, 'Vehicle type is required']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  totalTrips: {
    type: Number,
    default: 0
  },
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: 0
  },
  languages: [{
    type: String
  }],
  certifications: [{
    type: String
  }],
  documents: {
    profilePhoto: {
      type: String,
      default: 'default-profile.jpg'
    },
    vehiclePhoto: {
      type: String,
      default: 'default-vehicle.jpg'
    },
    license: {
      type: String,
      required: [true, 'License document is required']
    },
    insurance: {
      type: String
    }
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  },
  preferredLocations: [{
    type: String
  }],
  workingHours: {
    start: {
      type: String,
      default: '09:00'
    },
    end: {
      type: String,
      default: '18:00'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'inactive'],
    default: 'pending'
  },
  earnings: {
    total: {
      type: Number,
      default: 0
    },
    withdrawn: {
      type: Number,
      default: 0
    },
    pending: {
      type: Number,
      default: 0
    }
  },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
driverSchema.index({ currentLocation: '2dsphere' });
driverSchema.index({ 'user': 1 });
driverSchema.index({ 'licenseNumber': 1 });
driverSchema.index({ 'isAvailable': 1 });
driverSchema.index({ 'status': 1 });

// Virtual for reviews
driverSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'driver'
});

// Virtual for bookings
driverSchema.virtual('bookings', {
  ref: 'Booking',
  localField: '_id',
  foreignField: 'driver'
});

// Method to calculate average rating
driverSchema.methods.calculateAverageRating = function() {
  if (this.totalRatings === 0) return 0;
  return this.rating / this.totalRatings;
};

// Update rating method
driverSchema.methods.updateRating = async function(newRating) {
  this.rating = (this.rating * this.totalRatings + newRating) / (this.totalRatings + 1);
  this.totalRatings += 1;
  await this.save();
};

// Pre-save middleware to handle data validation
driverSchema.pre('save', async function(next) {
  // Ensure hourly rate is positive
  if (this.hourlyRate < 0) {
    throw new Error('Hourly rate cannot be negative');
  }

  // Ensure coordinates are valid
  if (this.currentLocation.coordinates.length !== 2) {
    throw new Error('Invalid coordinates');
  }

  next();
});

const Driver = mongoose.model('Driver', driverSchema);
export default Driver;