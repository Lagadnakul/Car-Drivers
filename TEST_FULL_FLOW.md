# 🧪 COMPREHENSIVE TESTING GUIDE - Car Driver MERN Stack

## 📋 SETUP CHECKLIST

### Prerequisites
- [ ] MongoDB running (local or Atlas)
- [ ] Node.js installed (v14+)
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)

### Environment Files
- [ ] `backend/.env` configured with PORT=5000 and MONGO_URI
- [ ] `frontend/.env` configured with VITE_API_URL=http://localhost:5000/api

---

## 🚀 STARTUP INSTRUCTIONS

### Terminal 1: Start Backend Server
```bash
cd backend
npm start
# Expected output:
# ✅ MongoDB Connected Successfully (or warning with mock data)
# Registering routes...
# ✅ All routes registered
# 🚀 Server Running on PORT 5000
```

### Terminal 2: Start Frontend Server
```bash
cd frontend
npm run dev
# Expected output:
# VITE v6.x.x  ready in xxx ms
# ➜  Local:   http://localhost:5175/
```

---

## ✅ TEST 1: HEALTH CHECK (Backend Running)

### Using cURL
```bash
curl http://localhost:5000/api/health
```

### Expected Response
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 12.345,
  "dbConnected": true
}
```

---

## ✅ TEST 2: USER REGISTRATION

### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Expected Response (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### What to Check
- ✅ Response status is 201
- ✅ `success` is true
- ✅ User object returned with _id
- ✅ `token` is generated (JWT format)

---

## ✅ TEST 3: USER LOGIN

### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### What to Check
- ✅ Response status is 200
- ✅ `success` is true
- ✅ Same user data returned
- ✅ `token` is generated

---

## ✅ TEST 4: GET ALL DRIVERS (No Auth Required)

### Using cURL
```bash
curl http://localhost:5000/api/drivers
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Drivers fetched successfully",
  "count": 5,
  "drivers": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": {
        "_id": "507f1f77bcf86cd799439001",
        "name": "Driver One",
        "phone": "+1234567890"
      },
      "licenseNumber": "DL123456",
      "experience": 5,
      "vehicleTypes": ["Car", "Van"],
      "isAvailable": true,
      "rating": 4.5,
      "hourlyRate": 50,
      "languages": ["English", "Spanish"]
    }
    // ... more drivers
  ]
}
```

### What to Check
- ✅ Response status is 200
- ✅ `success` is true
- ✅ `drivers` array contains driver objects
- ✅ Each driver has user, license, experience, isAvailable, hourlyRate

---

## ✅ TEST 5: GET DRIVER BY ID (No Auth Required)

### Using cURL
```bash
# Replace 507f1f77bcf86cd799439012 with actual driver ID from Test 4
curl http://localhost:5000/api/drivers/507f1f77bcf86cd799439012
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Driver details fetched",
  "driver": {
    "_id": "507f1f77bcf86cd799439012",
    "user": {
      "_id": "507f1f77bcf86cd799439001",
      "name": "Driver One",
      "email": "driver1@example.com",
      "phone": "+1234567890"
    },
    "licenseNumber": "DL123456",
    "experience": 5,
    "vehicleTypes": ["Car", "Van"],
    "isAvailable": true,
    "rating": 4.5,
    "hourlyRate": 50,
    "languages": ["English", "Spanish"],
    "certifications": ["SafetyFirst"],
    "documents": ["DL", "Insurance"]
  }
}
```

### What to Check
- ✅ Response status is 200
- ✅ `success` is true
- ✅ Single driver object returned
- ✅ All driver details populated

---

## ✅ TEST 6: CREATE BOOKING (Auth Required)

### Using cURL with Token (from Test 3)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN_FROM_TEST_3>" \
  -d '{
    "driverId": "507f1f77bcf86cd799439012",
    "pickupLocation": "123 Main St, City",
    "dropLocation": "456 Oak Ave, City",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T12:00:00Z",
    "totalAmount": 100
  }'
```

### Expected Response (201)
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "_id": "507f1f77bcf86cd799439020",
    "user": "507f1f77bcf86cd799439011",
    "driver": "507f1f77bcf86cd799439012",
    "pickupLocation": "123 Main St, City",
    "dropLocation": "456 Oak Ave, City",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T12:00:00Z",
    "status": "confirmed",
    "paymentStatus": "pending",
    "paymentMethod": "COD",
    "totalAmount": 100,
    "createdAt": "2024-01-14T15:30:00Z"
  }
}
```

### What to Check
- ✅ Response status is 201
- ✅ `success` is true
- ✅ Booking has status: "confirmed"
- ✅ Booking has paymentMethod: "COD"
- ✅ Booking has totalAmount
- ✅ User is associated with booking

---

## ✅ TEST 7: GET USER'S BOOKINGS (Auth Required)

### Using cURL with Token
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <TOKEN_FROM_TEST_3>"
```

### Expected Response (200)
```json
{
  "success": true,
  "message": "Bookings fetched successfully",
  "count": 1,
  "bookings": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "user": "507f1f77bcf86cd799439011",
      "driver": {
        "_id": "507f1f77bcf86cd799439012",
        "user": {
          "name": "Driver One"
        }
      },
      "pickupLocation": "123 Main St, City",
      "dropLocation": "456 Oak Ave, City",
      "startTime": "2024-01-15T10:00:00Z",
      "endTime": "2024-01-15T12:00:00Z",
      "status": "confirmed",
      "paymentStatus": "pending",
      "totalAmount": 100
    }
  ]
}
```

### What to Check
- ✅ Response status is 200
- ✅ Booking from Test 6 is in the list
- ✅ Driver details are populated
- ✅ User can only see their own bookings

---

## ✅ TEST 8: FRONTEND - REGISTER PAGE

### Steps
1. Open browser: http://localhost:5175
2. Click "Register" or navigate to `/register`
3. Fill in form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Phone: "+1234567890"
4. Click "Register"

### Expected Results
- ✅ Form validates all required fields
- ✅ No CORS errors in console
- ✅ Success toast notification appears
- ✅ Token stored in localStorage
- ✅ Redirected to /login or /dashboard

### Browser DevTools Check
```javascript
// In Console, verify token stored:
localStorage.getItem('token')
// Should output: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ✅ TEST 9: FRONTEND - LOGIN PAGE

### Steps
1. Navigate to `/login`
2. Fill in form:
   - Email: "john@example.com"
   - Password: "password123"
3. Click "Login"

### Expected Results
- ✅ No CORS errors
- ✅ Success toast notification
- ✅ Token stored in localStorage
- ✅ Redirected to /dashboard or /drivers
- ✅ User info available in app state

---

## ✅ TEST 10: FRONTEND - DRIVERS LIST PAGE

### Steps
1. Navigate to `/drivers`
2. Wait for drivers to load

### Expected Results
- ✅ Drivers list displays 3+ drivers
- ✅ Each driver card shows: name, rating, hourly rate, vehicle types
- ✅ No API errors in console
- ✅ "View Details" button clickable

---

## ✅ TEST 11: FRONTEND - DRIVER DETAILS PAGE

### Steps
1. From drivers list, click "View Details" on any driver
2. Verify page loads (URL should be `/drivers/:id`)
3. Verify driver information displays

### Expected Results
- ✅ Page loads without console errors
- ✅ Driver details display: name, rating, experience, hourly rate
- ✅ Booking form visible with fields:
  - Pickup Location
  - Drop Location
  - Start Date/Time
  - End Date/Time
- ✅ "Book Now" button present

---

## ✅ TEST 12: FRONTEND - CREATE BOOKING

### Prerequisites
- ✅ User must be logged in (TEST 9 completed)
- ✅ On driver details page (TEST 11 completed)

### Steps
1. Fill booking form:
   - Pickup: "123 Main St"
   - Drop: "456 Oak Ave"
   - Start: "Tomorrow 10:00 AM"
   - End: "Tomorrow 12:00 PM"
2. Click "Book Now"

### Expected Results
- ✅ Form validates all fields are filled
- ✅ No CORS errors in console
- ✅ Loading state shows while submitting
- ✅ Success toast notification appears
- ✅ Redirected to `/booking-success` page
- ✅ Booking success page shows:
  - ✅ Checkmark icon
  - ✅ "Booking Successful!" message
  - ✅ "View Booking Details" button

---

## ✅ TEST 13: FRONTEND - DASHBOARD/BOOKINGS

### Steps
1. Click "View Booking Details" button from booking success page
2. Or navigate to `/dashboard`

### Expected Results
- ✅ Page loads user's bookings
- ✅ Booking from TEST 12 appears in list
- ✅ Booking shows:
  - Driver name
  - Pickup/Drop locations
  - Date/Time
  - Status: "confirmed"
  - Total amount

---

## 🔧 TROUBLESHOOTING

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Check MongoDB connection
node backend/test-mongo.js

# Check environment variables
cat backend/.env
```

### Frontend Won't Start
```bash
# Clear Vite cache
rm -rf frontend/.vite

# Check port 5175 is available
lsof -i :5175  # macOS/Linux
netstat -ano | findstr :5175  # Windows
```

### CORS Errors
```javascript
// In browser console, check error details
// Should show allowed origin in Access-Control-Allow-Origin header
```

### Auth Not Working
```javascript
// Check token in localStorage
localStorage.getItem('token')

// Check Authorization header sent
// Open DevTools → Network → register/login request
// Should see: Authorization: Bearer <token>
```

### Database Not Connected
- Using mock data fallback ✅
- All endpoints work without database
- To use real database:
  1. Start MongoDB: `mongod`
  2. Check MONGO_URI in .env
  3. Restart backend server

---

## 📊 SUCCESS CHECKLIST

Complete all tests in order:

- [ ] Test 1: Health Check ✅
- [ ] Test 2: Registration ✅
- [ ] Test 3: Login ✅
- [ ] Test 4: Get Drivers ✅
- [ ] Test 5: Get Driver by ID ✅
- [ ] Test 6: Create Booking ✅
- [ ] Test 7: Get Bookings ✅
- [ ] Test 8: Frontend Register ✅
- [ ] Test 9: Frontend Login ✅
- [ ] Test 10: Frontend Drivers List ✅
- [ ] Test 11: Frontend Driver Details ✅
- [ ] Test 12: Frontend Create Booking ✅
- [ ] Test 13: Frontend Dashboard ✅

**All tests passing = ✅ PROJECT COMPLETE AND WORKING**

---

## 🎯 NEXT STEPS

After all tests pass:

1. **Deploy Backend** to Heroku, Railway, or Render
2. **Deploy Frontend** to Vercel, Netlify, or GitHub Pages
3. **Connect to Production Database** (MongoDB Atlas)
4. **Update environment variables** for production
5. **Run final E2E tests** on deployed app

See `VERCEL_DEPLOYMENT_GUIDE.md` for detailed deployment instructions.

---

**Generated**: 2024  
**Status**: Ready for comprehensive testing
