import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:'./.env.local'});

export const connectDB = async () => {
  try { 
    const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nakullagad:12345@cluster0.huky7da.mongodb.net/car_driver';
    
    // Connect with proper options for latest mongoose version
    await mongoose.connect(MONGO_URI, {
      // These options help ensure stable connection
      // Note: useNewUrlParser and useUnifiedTopology are now default in newer versions
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};