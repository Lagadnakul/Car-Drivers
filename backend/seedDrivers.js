// d:/VS CODE/Car Driver/backend/seedDrivers.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Driver from './models/Driver.js';
import User from './models/User.js';
dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Driver.deleteMany();
  await User.deleteMany({ email: /seeddriver/ });
  const users = await User.insertMany([
    { name: 'Seed Driver 1', email: 'seeddriver1@example.com', password: 'Password123', phone: '1111111111' },
    { name: 'Seed Driver 2', email: 'seeddriver2@example.com', password: 'Password123', phone: '2222222222' },
    { name: 'Seed Driver 3', email: 'seeddriver3@example.com', password: 'Password123', phone: '3333333333' },
    { name: 'Seed Driver 4', email: 'seeddriver4@example.com', password: 'Password123', phone: '4444444444' },
    { name: 'Seed Driver 5', email: 'seeddriver5@example.com', password: 'Password123', phone: '5555555555' },
    { name: 'Seed Driver 6', email: 'seeddriver6@example.com', password: 'Password123', phone: '6666666666' },
  ]);
  const drivers = users.map((user, i) => ({
    user: user._id,
    licenseNumber: `LIC${i+1}000`,
    experience: 2 + i,
    vehicleTypes: ['Sedan', 'SUV', 'Luxury'][i%3],
    isAvailable: true,
    rating: 4.5 + (i%2)*0.3,
    totalRatings: 10 + i,
    totalTrips: 20 + i*2,
    hourlyRate: 30 + i*5,
    languages: ['English'],
    certifications: ['Defensive Driving'],
    documents: { profilePhoto: 'default-profile.jpg', vehiclePhoto: 'default-vehicle.jpg', license: 'LICDOC' },
    currentLocation: { type: 'Point', coordinates: [77.1 + i*0.01, 28.6 + i*0.01] },
    status: 'active',
    earnings: { total: 1000 + i*100, withdrawn: 500, pending: 100 },
    bankDetails: { accountHolder: user.name, accountNumber: `ACC${i+1}000`, bankName: 'Seed Bank', ifscCode: 'IFSC0001' }
  }));
  await Driver.insertMany(drivers);
  console.log('Seeded 6 drivers');
  process.exit();
};
seed();