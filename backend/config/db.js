import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
   try{ 
    // Fixed connection string format - added // after mongodb+srv:
    await mongoose.connect('mongodb+srv://nakullagad:12345@cluster0.huky7da.mongodb.net/car_driver');
    console.log("MongoDB connected");
   } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
   }
};