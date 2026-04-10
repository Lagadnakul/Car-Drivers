/**
 * MongoDB Connection Configuration
 * Handles connection with proper error handling
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/findmydriver';
    
    console.log('🔗 Connecting to MongoDB...');
    console.log(`📍 URI: ${MONGO_URI}`);

    const connection = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connection successful');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Don't exit process - allow server to run with mock data
    console.warn('⚠️ Continuing without database - using mock data');
    
    return null;
  }
};

// ============================================
// DISCONNECT DATABASE
// ============================================
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error.message);
  }
};
