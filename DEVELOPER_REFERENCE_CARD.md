# 📚 DEVELOPER REFERENCE CARD - Car Driver MERN Stack

## 🚀 START SERVERS

### All-in-One (Windows)
```bash
START_ALL_SERVERS.bat
```

### All-in-One (Mac/Linux)
```bash
./start-all.sh
```

### Backend Only
```bash
cd backend && npm start
# Or with auto-reload:
cd backend && npm run dev
```

### Frontend Only
```bash
cd frontend && npm run dev
```

---

## 🧪 TEST ENDPOINTS

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
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

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Drivers
```bash
curl http://localhost:5000/api/drivers
```

### Get Driver by ID
```bash
curl http://localhost:5000/api/drivers/{DRIVER_ID}
```

### Create Booking (Requires Auth Token)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -d '{
    "driverId": "{DRIVER_ID}",
    "startTime": "2024-01-15T10:00:00Z",
    "endTime": "2024-01-15T12:00:00Z",
    "pickupLocation": "123 Main St",
    "dropLocation": "456 Oak Ave",
    "totalAmount": 100
  }'
```

### Get User Bookings (Requires Auth Token)
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

## 🔍 BROWSER DEVELOPER TOOLS

### Check Token Storage
```javascript
// In browser console (F12):
localStorage.getItem('token')      // JWT token
localStorage.getItem('user')       // User object
```

### Clear All Storage
```javascript
localStorage.clear()
sessionStorage.clear()
```

### View API Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Make any API call
4. Click the request to see headers and response

### View Console Logs
1. Open DevTools (F12)
2. Go to Console tab
3. Look for messages prefixed with:
   - 🔗 API logs
   - ✅ Success messages
   - ❌ Error messages
   - 📥 Request logs

---

## 🛠️ CONFIGURATION

### Backend Environment
**File:** `backend/.env`
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/cardriver
JWT_SECRET=wdcefbrgnthmyjukilop
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend Environment
**File:** `frontend/.env`
```properties
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_PORT=5175
```

### Change Frontend Port
If port 5175 is in use, change in `frontend/vite.config.js`:
```javascript
export default {
  server: {
    port: 5176  // Change to any available port
  }
}
```

---

## 📁 PROJECT STRUCTURE

```
backend/
├── server.js                  # Main server file
├── .env                       # Environment variables
├── package.json               # Dependencies
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Auth logic
│   ├── driverController.js    # Driver logic
│   └── bookingController.js   # Booking logic
├── models/
│   ├── User.js                # User schema
│   ├── Driver.js              # Driver schema
│   └── Booking.js             # Booking schema
├── routes/
│   ├── authRoutes.js
│   ├── driverRoutes.js
│   └── bookingRoutes.js
├── middleware/
│   ├── auth.js                # Token verification
│   └── error.js               # Error handling
└── utils/
    └── generateToken.js       # JWT generation

frontend/
├── src/
│   ├── App.jsx                # Main app with routes
│   ├── main.jsx               # Entry point
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Drivers.jsx (Pilots)
│   │   ├── DriverDetails.jsx
│   │   ├── Dashboard.jsx
│   │   └── BookingSuccess.jsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── EnhancedNavbar.jsx
│   │   └── auth/
│   │       └── ProtectedRoute.jsx
│   ├── services/
│   │   ├── api.js             # Axios config
│   │   └── driverService.js   # API calls
│   ├── context/
│   │   └── AuthContext.jsx    # Auth state
│   ├── hooks/
│   │   └── useAuth.js         # Auth hook
│   └── assets/
│       ├── images/
│       └── styles/
├── .env                       # Environment variables
├── vite.config.js
└── package.json
```

---

## 🔐 IMPORTANT CONSTANTS

### JWT Configuration
- Token expiry: 30 days
- Secret key: (set in .env)
- Header format: `Bearer {token}`

### API Base URL
- Backend: `http://localhost:5000`
- API: `http://localhost:5000/api`
- Frontend: `http://localhost:5175`

### CORS Allowed Ports
- 5173, 5174, 5175, 5176 (Vite default ports)
- 3000, 4000 (Common development ports)

### HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

---

## 🐛 COMMON ISSUES & FIXES

| Issue | Fix |
|-------|-----|
| CORS error | Ensure backend running on 5000 |
| Port 5000 in use | Kill process or change PORT in .env |
| Port 5175 in use | Change port in vite.config.js |
| Cannot find token | Check localStorage (console) |
| Booking fails | Verify logged in + form filled |
| API returns 401 | Token expired, login again |
| API returns 404 | Check endpoint URL and method |
| MongoDB not found | Using mock data is OK |

---

## 📋 ROUTES REFERENCE

### Public Routes (No Auth)
```
/                    Home page
/register            Registration page
/login               Login page
/pilots              Drivers list
/pilot/:id           Driver details
/about               About page
/contact             Contact page
/services            Services page
```

### Protected Routes (Auth Required)
```
/booking/success     Booking success page
/dashboard           User bookings
```

### API Routes (All endpoints)
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/drivers
GET    /api/drivers/:id
GET    /api/drivers/search
GET    /api/drivers/available
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PUT    /api/bookings/:id
DELETE /api/bookings/:id
```

---

## 💡 USEFUL COMMANDS

### Install Dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### Update Dependencies
```bash
npm update
```

### Check Node Version
```bash
node --version  # Should be v14+
npm --version
```

### View Server Logs
```bash
# Check backend console for errors
# Check frontend console (F12) for errors
```

### Database Commands
```bash
# Start MongoDB locally
mongod

# Check MongoDB version
mongo --version

# Connect to MongoDB
mongo  # Opens mongo shell
```

### File Search (Command Line)
```bash
# Find all .js files
find . -name "*.js"

# Find specific file
find . -name "authController.js"

# Windows
dir /s authController.js
```

---

## 🔗 KEY IMPORTS TO KNOW

### Frontend Imports
```javascript
import { useAuth } from '../hooks/useAuth'           // Get auth context
import { useNavigate } from 'react-router-dom'      // Navigate programmatically
import { toast } from 'react-toastify'              // Show notifications
import driverService from '../services/driverService' // Call APIs
import api from '../services/api'                    // Direct axios calls
```

### Backend Imports
```javascript
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'
```

---

## 🧪 QUICK TEST FLOW

### 1. Start Servers
```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

### 2. Register
```javascript
// Browser console
localStorage.getItem('token')  // Should be empty before register
```

### 3. Register via UI
```
http://localhost:5175/register
→ Fill form → Submit
→ Check localStorage
```

### 4. Login via UI
```
http://localhost:5175/login
→ Fill form → Submit
→ Check token stored
```

### 5. Test API
```bash
curl http://localhost:5000/api/drivers
```

### 6. Create Booking
```
http://localhost:5175/pilots
→ Click driver → View details
→ Fill booking → Submit
→ See success page
```

---

## ✅ SUCCESS INDICATORS

### Backend
```
✅ MongoDB Connected Successfully
✅ All routes registered
🚀 Server Running on PORT 5000
```

### Frontend
```
➜  Local: http://localhost:5175/
VITE v6.x.x ready in XXX ms
```

### API
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Browser
- No blank screen
- Navigation bar visible
- No console errors
- Can click buttons

---

## 📞 QUICK LINKS

- **Docs:** See QUICK_START.md, TEST_FULL_FLOW.md
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:5175
- **Health Check:** http://localhost:5000/api/health
- **MongoDB:** localhost:27017

---

**Version:** 1.0.0  
**Last Updated:** April 6, 2026  
**Status:** ✅ Complete
