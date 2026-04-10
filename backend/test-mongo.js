import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGO_URI ? 'Set' : 'Not set');

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://nakullagad084_db_user:Nakul12345@cardriver.muquejb.mongodb.net/cardriver', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully!');
    console.log('Connection status:', mongoose.connection.readyState);
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testConnection();
