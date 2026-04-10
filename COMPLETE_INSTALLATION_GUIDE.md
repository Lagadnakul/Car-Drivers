# 🚀 Complete Installation & Startup Guide - Car Driver MERN Stack

**Last Updated:** April 6, 2026  
**Status:** ✅ READY FOR DEPLOYMENT  
**Tested On:** Windows 10/11 with Node.js v22.12.0

---

## 📋 TABLE OF CONTENTS

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Startup Instructions](#startup-instructions)
5. [Testing Guide](#testing-guide)
6. [Troubleshooting](#troubleshooting)
7. [API Endpoints](#api-endpoints)

---

## ✅ Prerequisites

Before starting, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (local or Atlas) - [Optional if using mock data]
- **Postman** (for API testing) - [Download](https://postman.com)
- **Git** (for version control)

### Check Versions:
```bash
node --version
npm --version
```

Expected output:
```
v22.12.0
9.6.x (or higher)
```

---

## 📦 Backend Setup

### Step 1: Navigate to Backend Folder
```bash
cd "d:\VS CODE\Car Driver\backend"
```

### Step 2: Install Dependencies
```bash
npm install
```

**Expected Output:**
```
added 498 packages in 45s
```

### Step 3: Verify .env File
Check `backend/.env` exists with:
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/cardriver
JWT_SECRET=wdcefbrgnthmyjukilop
JWT_EXPIRE=30d
NODE_ENV=development
```

### Step 4: (Optional) Setup MongoDB
If you have MongoDB installed locally:
```bash
mongod
```

If not, the app will use mock data automatically.

### Step 5: Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
> backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.0.1
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
⚠️ MongoDB connection error: connect ECONNREFUSED ::1:27017
✅ Starting server with mock data...
🚀 Server Running on PORT 5000
🌐 CORS enabled for frontend ports
📊 Health check: http://localhost:5000/api/health
```

**Keep this terminal open!** The backend must stay running.

---

## 🎨 Frontend Setup

### Step 1: Open NEW Terminal Window
```bash
cd "d:\VS CODE\Car Driver\frontend"
```

### Step 2: Install Dependencies
```bash
npm install
```

**Expected Output:**
```
added 150+ packages in 30s
```

### Step 3: Verify .env File
Check `frontend/.env` exists with:
```properties
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_PORT=5175
```

### Step 4: Start Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
> frontend@1.0.0 dev
> vite

VITE v6.3.5 ready in 234 ms

➜  Local:   http://localhost:5175/
➜  press h to show help
```

**Access the app:** Open browser to `http://localhost:5175`

---

## 🔄 Full Startup Instructions

### Quick Start (All-in-One)

#### Windows Batch Script:
```bash
cd "d:\VS CODE\Car Driver"
START_ALL_SERVERS.bat
```

#### Manual Startup (Two Terminal Windows):

**Terminal 1 - Backend:**
```bash
cd "d:\VS CODE\Car Driver\backend"
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "d:\VS CODE\Car Driver\frontend"
npm run dev
```

### Expected Timeline:
- Backend startup: 5-10 seconds
- Frontend startup: 10-15 seconds
- Total time to full app: ~30 seconds

### Access Points:
- **Frontend UI:** http://localhost:5175
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🧪 Testing Guide

### 1. Health Check Test

**Via Terminal:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-06T10:30:45.123Z",
  "uptime": 15.342,
  "dbConnected": false
}
```

**Via Browser:**
- Open: http://localhost:5000/api/health
- Should display JSON response

---

### 2. Frontend Load Test

**In Browser:**
1. Open: http://localhost:5175
2. You should see:
   - Navigation header with logo
   - "Welcome to Car Driver" section
   - "Book Your Ride" CTA button
   - Services section
   - About section
   - Contact section

**Check Console (F12):**
- No red errors
- Should see API calls in Network tab

---

### 3. Authentication Test

#### Test 3.1: Register New User
1. Click "Register" in navbar
2. Fill in:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: Password123!
3. Click "Sign Up"
4. Expected: Redirected to Login page

#### Test 3.2: Login
1. Go to Login page
2. Enter:
   - Email: john@example.com
   - Password: Password123!
3. Click "Login"
4. Expected: Redirected to Dashboard

#### Test 3.3: Logout
1. In Dashboard, click "Logout"
2. Expected: Redirected to Home page, login disabled

---

### 4. Driver Browsing Test

#### Test 4.1: View All Drivers
1. Click "Drivers" or "Pilots" in navbar
2. Should see list of drivers with:
   - Photo
   - Name
   - Rating
   - Price per mile
   - View Details button

#### Test 4.2: Search Drivers
1. Go to Drivers page
2. Use search filters:
   - Location
   - Rating
   - Availability
3. Click "Search"
4. Should see filtered results

#### Test 4.3: View Driver Details
1. Click "View Details" on any driver
2. Should see:
   - Driver photo & info
   - Reviews
   - Booking form

---

### 5. Booking Test

#### Test 5.1: Create Booking (Not Logged In)
1. Click "View Details" on a driver
2. Fill booking form:
   - Pickup Location: 123 Main St
   - Dropoff Location: 456 Park Ave
   - Pickup Time: Tomorrow 10:00 AM
   - Passengers: 1
3. Click "Request Ride"
4. Expected: Redirected to Login

#### Test 5.2: Create Booking (Logged In)
1. Login first (Test 3.2)
2. Go to driver details
3. Fill booking form
4. Click "Request Ride"
5. Expected: Success message + redirect to /booking/success

#### Test 5.3: View Bookings
1. In Dashboard, view "My Bookings"
2. Should show:
   - Booking ID
   - Driver name
   - Status (Confirmed)
   - Pickup location
   - Dropoff location

---

### 6. API Endpoint Tests (Postman)

#### Setup Postman:
1. Download [Postman](https://postman.com)
2. Import `POSTMAN_COLLECTION.json` (if exists)
3. Or manually create tests below

#### Test 6.1: Health Check
```
GET http://localhost:5000/api/health
```
Expected: 200 OK with JSON response

#### Test 6.2: Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "password": "Password123!"
}
```
Expected: 201 Created, returns user with token

#### Test 6.3: Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "Password123!"
}
```
Expected: 200 OK, returns token + user

#### Test 6.4: Get All Drivers
```
GET http://localhost:5000/api/drivers
```
Expected: 200 OK, returns array of drivers

#### Test 6.5: Get Driver by ID
```
GET http://localhost:5000/api/drivers/1
```
Expected: 200 OK, returns single driver

#### Test 6.6: Search Drivers
```
GET http://localhost:5000/api/drivers/search?location=New+York&minRating=4
```
Expected: 200 OK, returns filtered drivers

#### Test 6.7: Create Booking (Protected)
```
POST http://localhost:5000/api/bookings
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "driverId": "1",
  "pickupLocation": "123 Main St",
  "dropoffLocation": "456 Park Ave",
  "pickupTime": "2026-04-07T10:00:00Z",
  "passengers": 1,
  "paymentMethod": "cod"
}
```
Expected: 201 Created, returns booking with status "confirmed"

#### Test 6.8: Get User Bookings (Protected)
```
GET http://localhost:5000/api/bookings
Authorization: Bearer YOUR_TOKEN_HERE
```
Expected: 200 OK, returns array of user bookings

---

## 🔧 Troubleshooting

### Issue 1: Port 5000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Find process using port 5000
netstat -ano | find "5000"

# Kill process (replace PID)
taskkill /PID 12345 /F

# Or use different port
PORT=5001 npm run dev
```

### Issue 2: MongoDB Connection Error

**Error:**
```
⚠️ MongoDB connection error: connect ECONNREFUSED
```

**Solution:**
- This is OK! The app uses mock data automatically
- To use real MongoDB:
  1. Install MongoDB locally or use Atlas
  2. Update `MONGO_URI` in `.env`
  3. Restart server

### Issue 3: CORS Error in Browser

**Error:**
```
Access to XMLHttpRequest at 'http://localhost:5000' blocked by CORS
```

**Solution:**
1. Ensure backend is running on port 5000
2. Check CORS configuration in `backend/server.js`
3. Verify frontend `.env` has correct `VITE_API_URL`

### Issue 4: Frontend Can't Connect to Backend

**Error:**
```
Failed to fetch / Network error
```

**Solution:**
1. Check backend is running: `curl http://localhost:5000/api/health`
2. Verify `VITE_API_URL` in `frontend/.env`
3. Check browser Network tab (F12)
4. Restart both servers

### Issue 5: npm install Fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution:**
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue 6: Package Version Not Found

**Error:**
```
npm ERR! 404 Not Found - GET https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken@9.1.2.tgz
```

**Solution:**
- Already fixed in `backend/package.json`
- Version downgraded to 9.0.2 (stable)
- Run: `npm install` again

---

## 📡 API Endpoints Reference

### Base URL: `http://localhost:5000/api`

### Authentication Endpoints
```
POST   /auth/register       - Register new user
POST   /auth/login          - Login user
POST   /auth/logout         - Logout user (protected)
```

### Driver Endpoints
```
GET    /drivers             - Get all drivers
GET    /drivers/:id         - Get driver by ID
GET    /drivers/search      - Search drivers
GET    /drivers/available   - Get available drivers
```

### Booking Endpoints
```
POST   /bookings            - Create booking (protected)
GET    /bookings            - Get user bookings (protected)
GET    /bookings/:id        - Get booking by ID (protected)
PUT    /bookings/:id        - Update booking (protected)
PATCH  /bookings/:id/cancel - Cancel booking (protected)
DELETE /bookings/:id        - Delete booking (protected)
```

### Health Check
```
GET    /health              - Server health status
```

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 📝 Environment Variables

### Backend (.env)
```properties
PORT=5000                                          # Server port
MONGO_URI=mongodb://localhost:27017/cardriver     # MongoDB connection
JWT_SECRET=wdcefbrgnthmyjukilop                   # JWT signing key
JWT_EXPIRE=30d                                     # Token expiration
NODE_ENV=development                               # Environment
```

### Frontend (.env)
```properties
VITE_API_URL=http://localhost:5000/api            # Backend API URL
VITE_BACKEND_URL=http://localhost:5000            # Backend base URL
VITE_FRONTEND_PORT=5175                           # Frontend port
```

---

## 🎯 Full User Flow Test

### Complete Journey:
1. ✅ Open http://localhost:5175
2. ✅ Register new account
3. ✅ Login with credentials
4. ✅ View dashboard
5. ✅ Browse drivers list
6. ✅ Search drivers by location/rating
7. ✅ View driver details
8. ✅ Create booking
9. ✅ View booking success page
10. ✅ Check bookings in dashboard
11. ✅ Logout

**Expected Duration:** 5-10 minutes for complete flow

---

## 📊 Performance Metrics

### Expected Load Times:
- Home page: < 500ms
- Drivers list: < 1s
- Driver details: < 500ms
- Booking creation: < 800ms
- Dashboard: < 1s

### Expected Memory Usage:
- Backend: ~50-80 MB
- Frontend: ~100-150 MB
- Total: ~200-250 MB

### Network Requests:
- Home page: ~20-30 requests
- Dashboard: ~5-10 requests
- Booking: ~2-3 requests

---

## ✨ Features Checklist

- ✅ User Registration & Authentication
- ✅ JWT Token Management
- ✅ Driver Browsing & Search
- ✅ Driver Details Page
- ✅ Booking System (COD)
- ✅ Dashboard with Bookings
- ✅ Protected Routes
- ✅ Error Handling
- ✅ Loading States
- ✅ Responsive Design
- ✅ Rate Limiting
- ✅ Mock Data Fallback
- ✅ CORS Configuration
- ✅ Auto-reload (nodemon)

---

## 📞 Support & Next Steps

### If You Encounter Issues:
1. Check the **Troubleshooting** section
2. Verify ports are open (5000, 5175)
3. Check browser console (F12)
4. Check terminal output for errors
5. Review this guide thoroughly

### For Production Deployment:
1. Replace mock data with real MongoDB
2. Update JWT_SECRET to strong value
3. Set NODE_ENV=production
4. Use environment-specific URLs
5. Enable SSL/HTTPS
6. Setup rate limiting properly
7. Configure firewall rules

### Next Development Steps:
1. Implement payment integration
2. Add user profile management
3. Implement driver rating system
4. Add push notifications
5. Setup email verification
6. Implement password reset
7. Add admin dashboard
8. Setup automated testing

---

**Last Updated:** April 6, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Testing & Deployment
