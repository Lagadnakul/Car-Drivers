import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    experience: {
        type: Number,
        required: [true, 'Please enter years of experience']
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please enter license number'],
        unique: true
    },
    licenseExpiry: {
        type: Date,
        required: [true, 'Please enter license expiry date']
    },
    vehicleTypes: [{
        type: String,
        enum: ['sedan', 'suv', 'luxury', 'truck', 'van']
    }],
    hourlyRate: {
        type: Number,
        required: [true, 'Please enter your hourly rate']
    },
    rating: {
        type: Number,
        default: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    documents: {
        licenseImage: String,
        profilePhoto: String,
        additionalDocs: [String]
    }
});

export default mongoose.model('Driver', driverSchema);