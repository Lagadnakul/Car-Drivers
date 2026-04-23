# 🆘 TROUBLESHOOTING GUIDE

**Project:** Car Driver MERN Stack  
**Purpose:** Quickly fix common issues  
**Last Updated:** Current Session

---

## 📋 ISSUE INDEX

1. [Server Won't Start](#server-wont-start)
2. [Port Already in Use](#port-already-in-use)
3. [CORS Errors](#cors-errors)
4. [400 Bad Request on Booking](#400-bad-request-on-booking)
5. [MongoDB Connection Issues](#mongodb-connection-issues)
6. [Authentication Not Working](#authentication-not-working)
7. [Page Not Loading](#page-not-loading)
8. [Animations Not Showing](#animations-not-showing)
9. [Console Errors](#console-errors)
10. [Database Not Persisting](#database-not-persisting)

---

## 🔧 SERVER WON'T START

### Symptom
Backend or frontend server won't start. Error appears in terminal.

### Diagnosis
```bash
# Check what error is shown
# Look for:
# - "Cannot find module"
# - "EADDRINUSE"
# - "MongoDB connection failed"
# - "PORT already in use"
```

### Solutions

#### Solution 1: Install Missing Dependencies
```bash
# Navigate to folder
cd "d:\VS CODE\Car Driver\backend"  # or frontend

# Clean install
rm -r node_modules package-lock.json
npm install

# Start again
npm run dev
```

#### Solution 2: Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Then reinstall
npm install

# Start
npm run dev
```

#### Solution 3: Use Different Node Version
```bash
# Check Node version
node --version

# Should be v14+ (preferably v16+)
# If issue persists, try:
npm install -g n  # Node version manager
n lts             # Install LTS version
```

---

## 🔗 PORT ALREADY IN USE

### Symptom
Error: `EADDRINUSE: address already in use :::5000` or `:::5175`

### Quick Fix (Windows)
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Output will show: TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    <PID>

# Kill the process
taskkill /PID <PID> /F

# Restart
npm run dev
```

### Quick Fix (Mac/Linux)
```bash
# Find process
lsof -i :5000

# Kill process
kill -9 <PID>

# Restart
npm run dev
```

### Alternative: Use Different Port
```bash
# Backend - change PORT in .env
# OLD: PORT=5000
# NEW: PORT=5001

# Frontend - will auto-try different ports
npm run dev  # Will try 5173, 5174, 5175, 5176...
```

---

## 📡 CORS ERRORS

### Symptom
Console Error: `Access to XMLHttpRequest has been blocked by CORS policy`

### Root Cause
Frontend's Axios client isn't sending credentials with requests.

### Quick Fix
**File:** `frontend/src/services/api.js`

```javascript
// Check if this line exists (should be line 13):
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,  // ← THIS LINE MUST EXIST
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});
```

### If Line Missing
1. Open `frontend/src/services/api.js`
2. Add `withCredentials: true,` after `baseURL: BASE_URL,`
3. Save file
4. Restart frontend server (`npm run dev`)

### Verify Fix
```javascript
// Browser DevTools → Network tab
// Check any request → Headers
// Look for: "Cookie" or "Authorization"
// If present → CORS working ✅
```

---

## 📤 400 BAD REQUEST ON BOOKING

### Symptom
When submitting booking, get error:
- Status: 400
- Message: "Invalid driver ID format"

### Root Cause
Backend not recognizing mock driver IDs (like 'mock-1')

### Quick Fix
**File:** `backend/controllers/bookingController.js`

Check lines 26-32 have this validation:
```javascript
// Only validate ObjectId format if it doesn't start with 'mock-'
if (!driverId.startsWith('mock-') && !mongoose.Types.ObjectId.isValid(driverId)) {
  return res.status(400).json({
    success: false,
    message: 'Invalid driver ID format'
  });
}
```

### If Check Missing
1. Open `backend/controllers/bookingController.js`
2. Find the validation section (around line 26)
3. Update to allow mock driver IDs
4. Restart backend (`npm run dev`)

### Verify Fix
1. Try booking again with mock driver
2. Check backend console for logs
3. Should see: "📥 Booking request:" with details
4. Response should be 201, not 400

---

## 🗄️ MONGODB CONNECTION ISSUES

### Symptom
Backend shows: `⚠️ Database connection failed, continuing without DB...`

### Root Cause Options
1. Internet not connected
2. MongoDB Atlas credentials wrong
3. IP address not whitelisted
4. Database service down

### Quick Fix 1: Check Credentials
**File:** `backend/.env`

```properties
# Verify this line
MONGO_URI=mongodb+srv://nakullagad084_db_user:NakulLagad12345@cardriver.muquejb.mongodb.net/carDriver-1?retryWrites=true&w=majority

# Should have:
# - Correct username
# - Correct password
# - Correct cluster
# - Database name: carDriver-1
```

### Quick Fix 2: Check IP Whitelist
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login to account
3. Go to "Network Access"
4. Check if your IP is whitelisted
5. If not, click "Add Current IP" or allow "0.0.0.0/0" (for development)

### Quick Fix 3: Check Internet
```bash
# Test connection
ping google.com

# Should get responses
# If no responses → internet down → fix network
```

### Important: Server Works Without DB ✅
- Backend continues running with mock data
- Bookings will process
- Once DB is online, they'll sync
- No restart needed

---

## 🔐 AUTHENTICATION NOT WORKING

### Symptom
- Can't register user
- Can't login
- Keep getting redirected to login
- Session doesn't persist

### Quick Fix 1: Check Token Storage
```javascript
// Open Browser DevTools → Console
// Run this command:
localStorage.getItem('token')

// Should return a JWT token like:
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// If returns null → token not being saved
```

### Quick Fix 2: Check AuthContext
**File:** `frontend/src/context/AuthContext.jsx`

Verify it has:
```javascript
// On mount, check localStorage
useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (token && user) {
    setUser(JSON.parse(user));
    setIsAuthenticated(true);
  }
}, []);
```

### Quick Fix 3: Check Backend Token Generation
**File:** `backend/controllers/authController.js`

Login should return token:
```javascript
// Response should include:
{
  success: true,
  token: "JWT_TOKEN_HERE",
  user: { name, email, id }
}
```

### Test Authentication
```bash
# 1. Register
- Go to /register
- Fill form and submit
- Should see "Registration successful"

# 2. Check localStorage
- Open DevTools (F12)
- Go to Application → Local Storage
- Should see 'token' and 'user' keys

# 3. Try navigating
- Go to /drivers
- Should load drivers list (not redirect to login)
```

---

## 📄 PAGE NOT LOADING

### Symptom
- Blank white page
- Page stuck on loading
- 404 errors
- Cannot access routes

### Quick Fix 1: Check Console Errors
```javascript
// Open Browser DevTools (F12)
// Go to Console tab
// Look for red errors
// Copy error message and search docs
```

### Quick Fix 2: Check if Frontend Running
```bash
# Terminal should show:
# ➜ Local:   http://localhost:5175/
# ➜ Network: Available on network

# If not showing:
cd frontend
npm run dev
```

### Quick Fix 3: Verify Route Exists
**File:** `frontend/src/App.jsx`

Check for routes like:
```javascript
<Route path="/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
<Route path="/booking/success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
```

### Quick Fix 4: Clear Cache
```bash
# Clear browser cache
Ctrl + Shift + Delete

# Select:
# - Cookies and other site data
# - Cached images and files
# - Time range: All time

# Then refresh page: F5
```

---

## 🎨 ANIMATIONS NOT SHOWING

### Symptom
- Success page appears but no checkmark animation
- No confetti
- Text not fading in
- Page feels static

### Quick Fix 1: Check Framer Motion Installed
```bash
cd frontend
npm list framer-motion

# Should show: framer-motion@12.7.2 or similar
# If missing:
npm install framer-motion
npm run dev
```

### Quick Fix 2: Verify Success Page Loaded
```javascript
// Browser DevTools → Network tab
// Check if /booking/success loaded
// Response should be HTML with animation code
```

### Quick Fix 3: Check Browser Performance
```javascript
// Some browsers/machines may disable animations
// Try:
// 1. Close other tabs
// 2. Disable browser extensions
// 3. Try different browser
// 4. Check GPU acceleration enabled
```

### Quick Fix 4: Force Animation Refresh
```bash
# Hard refresh page
Ctrl + Shift + R  # Windows/Linux
Cmd + Shift + R   # Mac

# This forces clear cache and reload
```

---

## 🔴 CONSOLE ERRORS

### Common Errors & Fixes

#### Error: "Cannot read property 'bookingId' of undefined"
**Problem:** Booking state not set
**Solution:**
1. Check booking submission completed (network tab)
2. Verify booking data passed to success page
3. Check booking has ID in response

#### Error: "Failed to fetch from API"
**Problem:** Backend not running or wrong URL
**Solution:**
```bash
# Check backend running:
curl http://localhost:5000/api/health

# Should return JSON with success: true
# If fails, start backend: npm run dev
```

#### Error: "JWT malformed"
**Problem:** Invalid token in localStorage
**Solution:**
```javascript
// Clear localStorage
localStorage.clear()

// Logout and login again
// Token will be regenerated
```

#### Error: "Cannot find module"
**Problem:** Package not installed
**Solution:**
```bash
npm install
npm run dev
```

#### Error: "Unexpected token < in JSON"
**Problem:** Getting HTML instead of JSON (usually 404 or 500 error)
**Solution:**
1. Check network tab for actual error
2. Check API endpoint is correct
3. Check backend is running
4. Restart backend server

---

## 💾 DATABASE NOT PERSISTING

### Symptom
- Bookings disappear after refresh
- User data lost
- Database seems empty
- "Using Mock Data" message

### Diagnosis
```bash
# Check MongoDB connection
# Backend should show one of:
# ✅ "📍 Database: carDriver-1" → Connected
# ⚠️ "Using Mock Data" → Not connected

# Check .env file
cat backend/.env | grep MONGO_URI
```

### Quick Fix 1: Verify MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Login with account
3. Check cluster "carDriver"
4. Check database "carDriver-1"
5. Collections should exist: users, drivers, bookings

### Quick Fix 2: Whitelist IP Address
1. MongoDB Atlas → Network Access
2. Add IP address or "0.0.0.0/0" (for development)
3. Wait 5-10 minutes for changes to propagate
4. Restart backend

### Quick Fix 3: Check Connection String
```bash
# Verify .env has correct:
# Format: mongodb+srv://username:password@cluster/database

# Test connection locally:
mongo "mongodb+srv://nakullagad084_db_user:NakulLagad12345@cardriver.muquejb.mongodb.net/carDriver-1"

# Should connect successfully
```

### Temporary Solution: Export Data
```bash
# Before troubleshooting MongoDB:
# Export current mock data
# Save locally
# Then fix database connection
# Import data back
```

---

## 🔄 HOW TO RESTART EVERYTHING

### Full System Restart (When All Else Fails)

```bash
# 1. Stop both servers
# - Go to each terminal tab running npm
# - Press Ctrl + C

# 2. Kill processes on ports
netstat -ano | findstr :5000
netstat -ano | findstr :5175
# Kill each with: taskkill /PID <PID> /F

# 3. Clear npm cache
npm cache clean --force

# 4. Terminal 1: Start Backend
cd "d:\VS CODE\Car Driver\backend"
npm install
npm run dev

# 5. Terminal 2: Start Frontend
cd "d:\VS CODE\Car Driver\frontend"
npm install
npm run dev

# 6. Browser: Go to http://localhost:5175
# 7. Open DevTools: F12
# 8. Check Console for errors

# If still issues, check .env files are correct
```

---

## 📊 DIAGNOSTIC COMMANDS

### Check Backend Health
```bash
# 1. Is port 5000 listening?
netstat -ano | findstr :5000

# 2. Is backend running?
curl http://localhost:5000/api/health

# 3. Check logs in terminal
# Look for errors or warnings
```

### Check Frontend Health
```bash
# 1. Is port 5175 running?
netstat -ano | findstr :5175

# 2. Open in browser
# http://localhost:5175

# 3. Check DevTools (F12)
# Console tab for errors
# Network tab for failed requests
```

### Check MongoDB Connection
```bash
# 1. Check environment variable
cat backend/.env | grep MONGO_URI

# 2. Test connection (if mongosh installed)
mongosh "MONGO_URI_HERE"

# 3. Check backend logs
# Should show database connection message
```

---

## 🚨 GETTING MORE HELP

### Before Asking for Help, Check:
- [ ] Both servers are running (`npm run dev` output visible)
- [ ] Browser can access frontend (`http://localhost:5175` loads)
- [ ] Backend is responding (`curl http://localhost:5000/api/health` works)
- [ ] Console has no red errors (F12 → Console tab)
- [ ] Network tab shows requests completing (F12 → Network tab)
- [ ] `.env` files have correct URLs and credentials

### Where to Find Answers
1. **Documentation:** Check files starting with 🎯, ✅, or 🚀
2. **Code Comments:** Check source files for inline documentation
3. **Error Messages:** Search error message in docs
4. **Backend Logs:** Check terminal where `npm run dev` is running
5. **Browser Console:** F12 → Console tab shows most issues

### Information to Provide When Stuck
- Complete error message
- Screenshot of error
- Steps to reproduce
- What you tried to fix it
- Which file/component affected
- Console/network tab screenshots

---

## ✅ VERIFICATION CHECKLIST

Once you fix an issue, verify with this checklist:

### Backend
- [ ] `npm run dev` starts without errors
- [ ] Shows "Server running on http://localhost:5000"
- [ ] No red warnings in output
- [ ] `curl http://localhost:5000/api/health` returns JSON

### Frontend
- [ ] `npm run dev` starts without errors
- [ ] Shows port (5173, 5174, 5175, or 5176)
- [ ] Browser loads `http://localhost:5175` without 404
- [ ] No red errors in console (F12)

### API Communication
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can view driver list
- [ ] Can submit booking without 400 error
- [ ] Success page appears with animations

### Database
- [ ] Backend shows "Database: carDriver-1" or "Using Mock Data"
- [ ] Bookings save to database (persist after refresh)
- [ ] User data accessible
- [ ] No connection errors in logs

---

**If issues persist, restart from this checklist and work through systematically.** ✅
