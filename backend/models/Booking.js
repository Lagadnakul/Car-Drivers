import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    startTime: {
        type: Date,
        required: [true, 'Please enter start time']
    },
    endTime: {
        type: Date,
        required: [true, 'Please enter end time']
    },
    pickupLocation: {
        type: String,
        required: [true, 'Please enter pickup location']
    },
    dropLocation: {
        type: String
    },
    vehicleDetails: {
        type: {
            type: String,
            required: [true, 'Please enter vehicle type']
        },
        model: {
            type: String,
            required: [true, 'Please enter vehicle model']
        },
        make: {
            type: String,
            required: [true, 'Please enter vehicle make']
        },
        year: Number,
        licensePlate: {
            type: String,
            required: [true, 'Please enter license plate']
        }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Booking', bookingSchema);