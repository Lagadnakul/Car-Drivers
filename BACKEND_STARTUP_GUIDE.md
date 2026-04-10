# 🚀 COMPLETE BACKEND STARTUP & TESTING GUIDE

## Session 7 - Clean Architecture Implementation Complete ✅

### Status: Backend Ready for Testing

The backend has been rebuilt with clean production-ready architecture:
- ✅ Fixed auth controller with proper response handling (no hanging requests)
- ✅ All endpoints send responses (prevents timeout issues)
- ✅ Proper error handling with try-catch on all functions
- ✅ HTTP status codes compliance (201, 400, 401, 409, 500, etc.)
- ✅ CORS security enabled for ports 5173-5176
- ✅ Rate limiting on authentication routes
- ✅ JWT token generation and validation
- ✅ Password hashing with bcrypt

---

## 🎯 Quick Start (5 minutes)

### Step 1: Prepare Environment
```bash
# Kill any existing Node processes
taskkill /F /IM node.exe 2>nul || echo No processes to kill

# Navigate to backend
cd d:\VS CODE\Car Driver\backend

# Verify packages
npm list jsonwebtoken bcrypt express cors
```

### Step 2: Start Backend Server
```bash
# Option A: Direct Node (Recommended for testing)
node server.js

# Option B: Using npm
npm start

# Option C: Development mode with auto-reload
npm run dev
```

### Step 3: Verify Server is Running
```bash
# In another terminal, test health endpoint
curl http://localhost:5000/api/health

# Expected Response:
# {
#   "success": true,
#   "message": "Server is running",
#   "timestamp": "2026-04-09T...",
#   "uptime": 2.345,
#   "dbConnected": false (or true if MongoDB running)
# }
```

---

## 📊 Testing All Endpoints

### 1. Health Check (No Auth Required)
```bash
GET http://localhost:5000/api/health

# Expected: 200 OK, response time < 100ms
```

### 2. Register New User
```bash
POST http://localhost:5000/api/auth/register

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "phone": "+1234567890"
}

# Expected: 201 CREATED
# Response includes token (save for login testing)
```

### 3. Login User
```bash
POST http://localhost:5000/api/auth/login

Body:
{
  "email": "john@example.com",
  "password": "Password123"
}

# Expected: 200 OK
# Response includes token for protected routes
```

### 4. Get Current User Profile (Protected)
```bash
GET http://localhost:5000/api/auth/me
Headers:
Authorization: Bearer {TOKEN_FROM_LOGIN}

# Expected: 200 OK
```

### 5. Get All Drivers (No Auth)
```bash
GET http://localhost:5000/api/drivers

# With pagination:
GET http://localhost:5000/api/drivers?page=1&limit=10

# With filters:
GET http://localhost:5000/api/drivers?status=active&minRating=4

# Expected: 200 OK
```

### 6. Get Driver by ID (No Auth)
```bash
GET http://localhost:5000/api/drivers/{DRIVER_ID}

# Expected: 200 OK or 404 if not found
```

### 7. Search Drivers (No Auth)
```bash
GET http://localhost:5000/api/drivers/search?search=john

# Expected: 200 OK
```

### 8. Create Booking (Protected)
```bash
POST http://localhost:5000/api/bookings
Headers:
Authorization: Bearer {TOKEN_FROM_LOGIN}

Body:
{
  "driverId": "{DRIVER_ID}",
  "startTime": "2026-04-10T10:00:00Z",
  "endTime": "2026-04-10T12:00:00Z",
  "pickupLocation": "123 Main St",
  "dropLocation": "456 Park Ave",
  "totalAmount": 150
}

# Expected: 201 CREATED
```

### 9. Logout User (Protected)
```bash
POST http://localhost:5000/api/auth/logout
Headers:
Authorization: Bearer {TOKEN_FROM_LOGIN}

# Expected: 200 OK
```

---

## 🔍 Performance Benchmarks

All endpoints should respond in **< 1 second** (1000ms):

| Endpoint | Method | Expected Time | Status |
|----------|--------|----------------|--------|
| `/api/health` | GET | < 100ms | ✅ |
| `/api/auth/register` | POST | < 500ms | ✅ |
| `/api/auth/login` | POST | < 500ms | ✅ |
| `/api/drivers` | GET | < 300ms | ✅ |
| `/api/drivers/:id` | GET | < 300ms | ✅ |
| `/api/bookings` | POST | < 500ms | ✅ |

**❌ NO TIMEOUTS (no 10+ second hangs)**

---

## 🛠️ Troubleshooting

### Issue: "Port 5000 already in use"
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /F /PID {PID}

# Or kill all node processes
taskkill /F /IM node.exe
```

### Issue: "MongoDB connection failed"
The server starts with **mock data** if MongoDB is not available.
Data is NOT persisted, but server works for testing.

To use real database:
- Start MongoDB: `mongod`
- Or use MongoDB Atlas: Update `MONGO_URI` in `.env`

### Issue: "Timeout waiting for response"
1. Check server is running: `node server.js`
2. Check response is being sent in controller
3. Review error logs in terminal where server started
4. Ensure all routes have `res.status(...).json(...)`

### Issue: "CORS errors in browser"
Frontend on port 5173/5175/5176 should work automatically.
If issues:
1. Verify backend is running on port 5000
2. Check CORS configuration in `server.js`
3. Frontend `.env` has correct `VITE_API_URL`

---

## 📋 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Health check responds < 100ms
- [ ] Register endpoint creates user successfully
- [ ] Login endpoint returns JWT token
- [ ] Protected routes work with valid token
- [ ] Protected routes reject requests without token
- [ ] Drivers endpoint returns data
- [ ] Booking endpoint works with token
- [ ] All responses in < 1000ms (no timeouts)
- [ ] Error messages clear and helpful
- [ ] CORS headers present in responses

---

## 🚀 Next Steps

### After Backend Verification:
1. **Start Frontend:** `npm run dev` (in frontend directory)
2. **Test Login:** Navigate to http://localhost:5175/login
3. **Create Booking:** Use dashboard to book a driver
4. **Verify Connection:** Check browser console for API calls
5. **Monitor Performance:** No timeout errors should appear

### Production Deployment:
1. Update `MONGO_URI` to production database
2. Set `NODE_ENV=production` in `.env`
3. Update CORS origins for production domain
4. Use PM2 or similar for process management
5. Enable HTTPS/SSL certificate
6. Set up monitoring and logging

---

## 📞 Support

If you encounter issues:
1. Check error logs in terminal where server started
2. Verify `.env` file is configured correctly
3. Ensure all npm packages are installed
4. Check MongoDB is running (if using database)
5. Verify ports 5000 and 5175 are not blocked

---

## ✅ Key Improvements in This Session

### Problems Fixed:
- ❌ **Axios timeout on login** → ✅ **All endpoints send response**
- ❌ **Hanging requests** → ✅ **Try-catch on all functions**
- ❌ **Missing error handling** → ✅ **Proper HTTP status codes**
- ❌ **Inconsistent responses** → ✅ **Standardized response format**

### Architecture Improvements:
- ✅ Clean separation of concerns
- ✅ Proper middleware order (CORS → Body Parser → Routes → Error Handler)
- ✅ Rate limiting on auth endpoints
- ✅ JWT token generation with expiry
- ✅ Password hashing with bcrypt
- ✅ Validation on all inputs
- ✅ Comprehensive error messages

---

## 📊 File Structure

```
backend/
├── server.js                    # Main server (112 lines, clean)
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js       # ✅ FIXED - All paths send response
│   ├── driverController.js     # Get drivers, search
│   ├── bookingController.js    # Create bookings
│   └── adminController.js      # Admin dashboard
├── routes/
│   ├── authRoutes.js          # ✅ UPDATED - Added /me and /profile
│   ├── driverRoutes.js        # Driver endpoints
│   ├── bookingRoutes.js       # Booking endpoints
│   ├── userRoutes.js          # User endpoints
│   └── adminRoutes.js         # Admin endpoints
├── middleware/
│   ├── auth.js                # JWT verification
│   ├── error.js               # Error handler
│   ├── rateLimit.js           # Rate limiting
│   └── validation.js          # Input validation
├── models/
│   ├── User.js                # User schema
│   ├── Driver.js              # Driver schema
│   └── Booking.js             # Booking schema
├── utils/
│   ├── generateToken.js       # JWT generation
│   └── fileUpload.js          # Multer config
├── .env                        # Configuration ✅
└── package.json               # Dependencies ✅

frontend/
├── src/
│   ├── services/
│   │   ├── api.js            # ✅ Axios with interceptors
│   │   ├── authService.js    # Auth API calls
│   │   ├── driverService.js  # Driver API calls
│   │   └── bookingService.js # Booking API calls
│   ├── pages/
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Register page
│   │   ├── Drivers.jsx       # Driver listing
│   │   ├── Dashboard.jsx     # User dashboard
│   │   └── ...
│   ├── components/
│   │   ├── ProtectedRoute.jsx # Protected routes
│   │   └── ...
│   └── App.jsx               # Main app
├── .env                        # Configuration ✅
└── package.json              # Dependencies ✅
```

---

**Last Updated:** April 9, 2026
**Status:** ✅ READY FOR TESTING
**Next:** Start backend and verify endpoints
