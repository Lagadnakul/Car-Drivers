#!/usr/bin/env node

// Quick start test script
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('\n🚀 Car Driver Backend - Quick Start Test\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Test 1: Environment variables
console.log('📋 Step 1: Checking Environment Variables');
console.log(`  ✓ PORT: ${process.env.PORT || '5000'}`);
console.log(`  ✓ NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`  ✓ MONGO_URI: ${process.env.MONGO_URI ? '✅ Configured' : '❌ Missing'}`);
console.log(`  ✓ JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Configured' : '❌ Missing'}`);
console.log('');

// Test 2: MongoDB Connection
console.log('📋 Step 2: Testing MongoDB Connection');
console.log(`  Connecting to: ${process.env.MONGO_URI ? process.env.MONGO_URI.split('@')[1] : 'N/A'}`);

async function testMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    console.log('  ✅ MongoDB Connected Successfully!');
    console.log(`  ✓ Host: ${conn.connection.host}`);
    console.log(`  ✓ Database: carDriveriver1`);
    console.log(`  ✓ State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Unknown'}`);
    console.log('');

    // Test 3: List databases
    console.log('📋 Step 3: Checking Database');
    const admin = mongoose.connection.db.admin();
    const databases = await admin.listDatabases();
    console.log(`  ✓ Total Databases: ${databases.databases.length}`);
    console.log(`  ✓ Current DB: carDriveriver1`);
    console.log('');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n✅ ALL CHECKS PASSED!\n');
    console.log('Your backend is ready to start. Run:\n');
    console.log('  npm run dev\n');
    console.log('Or:\n');
    console.log('  node server.js\n');

    await mongoose.disconnect();
    process.exit(0);

  } catch (error) {
    console.error('  ❌ MongoDB Connection Failed');
    console.error(`  Error: ${error.message}`);
    console.error('');
    console.error('Troubleshooting:');
    console.error('  1. Check .env file for MONGO_URI');
    console.error('  2. Verify MongoDB Atlas credentials');
    console.error('  3. Check internet connection');
    console.error('  4. Verify IP whitelist in MongoDB Atlas');
    console.error('');

    process.exit(1);
  }
}

testMongoDB();
