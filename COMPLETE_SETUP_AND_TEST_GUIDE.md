# 🚀 Complete MERN Stack Setup & Testing Guide

## Project Overview
- **Frontend**: React + Vite on port 5175/5176
- **Backend**: Node.js + Express on port 5000
- **Database**: MongoDB on localhost:27017
- **State**: CORS Fixed ✅ | Auth Routes Ready ✅ | Models Configured ✅

---

## ⚙️ SETUP PHASE

### Step 1: MongoDB Setup
MongoDB is required for full functionality. Choose one option:

**Option A: Local MongoDB (Recommended for Development)**
```bash
# Windows - Download from https://www.mongodb.com/try/download/community
# Or use chocolatey
choco install mongodb-community

# Verify MongoDB is running
mongosh
# Should connect without errors

# Verify car-driver database
use cardriver
db.version()
```

**Option B: Mock Mode (No Database Needed)**
- Server gracefully falls back to mock data if MongoDB is unavailable
- Good for quick testing without database setup
- Limited functionality (no persistence)

### Step 2: Backend Setup
```bash
cd "d:\VS CODE\Car Driver\backend"

# Install dependencies (already done, but can reinstall if needed)
npm install

# Verify .env file exists with correct values
cat .env
# Should show:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/cardriver
# JWT_SECRET=wdcefbrgnthmyjukilop
# JWT_EXPIRE=30d
# NODE_ENV=development
```

### Step 3: Frontend Setup
```bash
cd "d:\VS CODE\Car Driver\frontend"

# Install dependencies
npm install

# Verify .env file
cat .env
# Should show:
# VITE_API_URL=http://localhost:5000/api
# VITE_BACKEND_URL=http://localhost:5000
```

---

## 🧪 TESTING PHASE

### Phase 1: Health Check

**Test Backend Health Endpoint**
```bash
curl http://localhost:5000/api/health
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-04-06T13:31:24.354Z",
  "uptime": 0.123
}
```

### Phase 2: CORS Verification

**Test CORS Headers from Frontend Origin**
```bash
curl -H "Origin: http://localhost:5176" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5000/api/health \
     -v
```

**Expected Headers in Response**:
```
Access-Control-Allow-Origin: http://localhost:5176
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

### Phase 3: Authentication Flow Testing

#### Test 3.1: User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "TestPass123",
    "phone": "9876543210"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

#### Test 3.2: User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "TestPass123"
  }'
```

**Expected Response**: Same as registration (with token and user data)

#### Test 3.3: Verify Token in Request
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected Response**:
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "role": "user"
  }
}
```

### Phase 4: Driver Endpoints Testing

#### Test 4.1: Get All Drivers (Public)
```bash
curl http://localhost:5000/api/drivers
```

**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "user": {...},
      "licenseNumber": "ABC123",
      "experience": 5,
      "vehicleTypes": ["Sedan"],
      "hourlyRate": 100,
      "isAvailable": true,
      "rating": 4.5
    }
  ],
  "total": 10,
  "pages": 1
}
```

#### Test 4.2: Get Single Driver
```bash
curl http://localhost:5000/api/drivers/{driverId}
```

### Phase 5: Booking Flow Testing

#### Test 5.1: Create Booking (Protected Route)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "driverId": "507f1f77bcf86cd799439012",
    "startTime": "2026-04-07T10:00:00Z",
    "endTime": "2026-04-07T12:00:00Z",
    "pickupLocation": "123 Main St",
    "dropLocation": "456 Oak Ave",
    "totalAmount": 200
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "user": {...},
    "driver": {...},
    "startTime": "2026-04-07T10:00:00Z",
    "endTime": "2026-04-07T12:00:00Z",
    "pickupLocation": "123 Main St",
    "dropLocation": "456 Oak Ave",
    "totalAmount": 200,
    "status": "pending",
    "paymentStatus": "pending"
  }
}
```

#### Test 5.2: Get All Bookings (Protected Route)
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### Test 5.3: Cancel Booking
```bash
curl -X PATCH http://localhost:5000/api/bookings/{bookingId}/cancel \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🖥️ FRONTEND TESTING

### Step 1: Start Frontend Server
```bash
cd "d:\VS CODE\Car Driver\frontend"
npm run dev
# Server starts on http://localhost:5176 (or 5175)
```

### Step 2: Test Registration Flow
1. Navigate to `http://localhost:5176/register`
2. Fill in form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: TestPass123
   - Confirm Password: TestPass123
3. Submit form
4. **Expected**: Success toast notification, redirect to login page

### Step 3: Test Login Flow
1. Navigate to `http://localhost:5176/login`
2. Fill in form:
   - Email: john@example.com
   - Password: TestPass123
3. Submit form
4. **Expected**: Success toast notification, redirect to home page, token stored in localStorage

### Step 4: Verify Token Storage
Open browser DevTools (F12) → Console:
```javascript
// Should return the JWT token
localStorage.getItem('token')

// Should return user object
JSON.parse(localStorage.getItem('user'))
```

### Step 5: Test Driver View Page
1. Click "Drivers" or navigate to `/drivers`
2. **Expected**: List of drivers displays (from API or mock data)
3. Click on a driver card
4. **Expected**: Driver details page loads with booking form

### Step 6: Test Booking Flow
1. On driver details page, fill booking form:
   - Pickup Location: 123 Main St
   - Drop Location: 456 Oak Ave
   - Start Date/Time: (future date)
   - End Date/Time: (later time)
2. Click "Book Now"
3. **Expected**: Success message, redirect to booking confirmation page

### Step 7: Test User Dashboard
1. Navigate to `/dashboard`
2. **Expected**: Display user's bookings and profile info

### Step 8: Test Logout
1. Click logout button
2. **Expected**: Redirect to login, token removed from localStorage

---

## 🔍 TROUBLESHOOTING

### Issue: CORS Error in Browser Console
**Error**: `Access to XMLHttpRequest at 'http://localhost:5000/api/...' from origin 'http://localhost:5176' has been blocked by CORS policy`

**Solution**:
1. Verify backend server is running: `curl http://localhost:5000/api/health`
2. Check CORS configuration in `backend/server.js` (lines 49-61)
3. Ensure origin is in the allowed list: `http://localhost:5176`
4. Restart backend server after any changes
5. Clear browser cache: Ctrl+Shift+Delete

### Issue: Network Error / Cannot Reach Backend
**Error**: `Error: Network Error` or `Error: timeout`

**Solutions**:
```bash
# Test backend connectivity
curl http://localhost:5000/api/health

# Check if backend is running
netstat -ano | findstr :5000

# Verify .env file
cat backend/.env

# Check firewall (Windows)
netsh advfirewall firewall add rule name="Node.js 5000" dir=in action=allow protocol=tcp localport=5000
```

### Issue: MongoDB Connection Error
**Error**: `⚠️ MongoDB connection failed: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
1. **Start MongoDB**:
   ```bash
   # Windows Service (if installed)
   net start MongoDB
   
   # Or manually
   mongod
   ```

2. **Verify MongoDB Connection**:
   ```bash
   mongosh
   use cardriver
   db.version()
   ```

3. **Check if already running**:
   ```bash
   netstat -ano | findstr :27017
   ```

### Issue: Authentication Fails
**Error**: `401 Unauthorized` or `Not authorized to access this route`

**Solutions**:
1. Verify token is in Authorization header: `Bearer TOKEN_HERE`
2. Check token validity: tokens expire after 30 days
3. Verify JWT_SECRET in backend .env matches
4. Clear localStorage and re-login:
   ```javascript
   localStorage.clear()
   ```

### Issue: Port Already in Use
**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different port
PORT=5001 npm start
```

---

## 📊 API Endpoint Summary

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | No | Server health check |
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login user |
| POST | `/api/auth/logout` | No | Logout user |
| GET | `/api/drivers` | No | Get all drivers |
| GET | `/api/drivers/:id` | No | Get single driver |
| GET | `/api/bookings` | Yes | Get user's bookings |
| POST | `/api/bookings` | Yes | Create booking |
| GET | `/api/bookings/:id` | Yes | Get booking details |
| PUT | `/api/bookings/:id` | Yes | Update booking |
| PATCH | `/api/bookings/:id/cancel` | Yes | Cancel booking |
| DELETE | `/api/bookings/:id` | Yes | Delete booking |
| GET | `/api/users/profile` | Yes | Get user profile |
| PUT | `/api/users/profile` | Yes | Update user profile |

---

## ✅ Quick Start Commands

**Terminal 1 - Start Backend**:
```bash
cd "d:\VS CODE\Car Driver\backend"
npm start
```

**Terminal 2 - Start Frontend**:
```bash
cd "d:\VS CODE\Car Driver\frontend"
npm run dev
```

**Terminal 3 - Start MongoDB** (if needed):
```bash
mongod
```

---

## 🎯 Verification Checklist

- [ ] MongoDB running (or app starts without it)
- [ ] Backend starts on port 5000
- [ ] Frontend starts on port 5175/5176
- [ ] Health check endpoint returns 200
- [ ] CORS headers present in OPTIONS request
- [ ] Registration works and returns token
- [ ] Login works with registered credentials
- [ ] Token stored in localStorage after login
- [ ] Protected routes require valid token
- [ ] Logout clears token from localStorage
- [ ] Drivers list displays
- [ ] Booking creation works
- [ ] No CORS errors in browser console
- [ ] No "Network Error" messages

---

## 📝 Notes

- All timestamps use ISO 8601 format (UTC)
- Tokens expire after 30 days
- Rate limiting: 5 auth attempts per 15 minutes per IP
- Booking validation checks driver availability
- Status enum: 'pending', 'confirmed', 'completed', 'cancelled'
- Payment enum: 'pending', 'completed', 'refunded'

---

**Status**: ✅ Ready for Testing  
**Last Updated**: April 6, 2026  
**Tested On**: Windows 10/11
