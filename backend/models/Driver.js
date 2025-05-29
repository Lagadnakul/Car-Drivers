import mongoose from 'mongoose';

// Rating schema for driver reviews
const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  date: {
    type: Date,
    default: Date.now
  }
});

// Main driver schema
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
    default: 4.5,
    min: 0,
    max: 5
  },
  ratings: [ratingSchema],
  vehicleTypes: [String],
  languages: [String],
  certifications: [String],
  hourlyRate: {
    type: Number,
    required: [true, 'Hourly rate is required'],
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required'],
    min: 0
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  licenseExpiry: {
    type: Date,
    required: [true, 'License expiry date is required']
  },
  documents: {
    licenseImage: String,
    profilePhoto: String,
    additionalDocs: [String]
  },
  vehicle: {
    type: {
      type: String,
      required: [true, 'Vehicle type is required']
    },
    make: {
      type: String,
      required: [true, 'Vehicle make is required']
    },
    model: {
      type: String,
      required: [true, 'Vehicle model is required']
    },
    year: {
      type: Number,
      required: [true, 'Vehicle year is required']
    },
    licensePlate: {
      type: String,
      required: [true, 'License plate is required'],
      unique: true
    },
    photo: {
      type: String,
      default: '/assets/images/vehicles/sedan.jpg'
    }
  },
  completedTrips: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  availabilitySchedule: [{
    startTime: Date,
    endTime: Date
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
driverSchema.index({ location: '2dsphere' });
driverSchema.index({ vehicleTypes: 1 });
driverSchema.index({ isAvailable: 1 });
driverSchema.index({ rating: -1 });

// Virtual for driver's full name
driverSchema.virtual('fullName').get(function() {
  return this.name || (this.user && this.user.name) || 'Unknown Driver';
});

// Calculate average rating before saving
driverSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const totalRatings = this.ratings.reduce((sum, r) => sum + r.rating, 0);
    this.rating = (totalRatings / this.ratings.length).toFixed(1);
  }
  next();
});

// Method to check if driver is available at specific time
driverSchema.methods.isAvailableAt = function(datetime) {
  if (!this.isAvailable) return false;
  
  if (!this.availabilitySchedule || this.availabilitySchedule.length === 0) {
    return true;
  }

  return !this.availabilitySchedule.some(schedule => 
    datetime >= schedule.startTime && datetime <= schedule.endTime
  );
};

// Method to update driver's earnings
driverSchema.methods.updateEarnings = function(amount) {
  this.totalEarnings += amount;
  this.completedTrips += 1;
  return this.save();
};

export default mongoose.model('Driver', driverSchema);