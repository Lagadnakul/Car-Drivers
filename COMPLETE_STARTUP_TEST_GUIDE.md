# 🎯 COMPLETE STARTUP & TESTING GUIDE - Car Driver MERN Stack

**Date:** April 6, 2026  
**Status:** ✅ Ready to Run

---

## 🚀 STEP 1: FIX BACKEND & INSTALL DEPENDENCIES

### Option A: One-Click Installation (Easiest)
```
Double-click: d:\VS CODE\Car Driver\backend\INSTALL_AND_RUN.bat
```

**Wait 3-5 minutes** for installation to complete.

Expected final output:
```
Registering routes...
✅ All routes registered
🚀 Server Running on PORT 5000
```

---

### Option B: Manual Installation (Using CMD)

Open **Command Prompt as Administrator** and run:

```cmd
cd /d "d:\VS CODE\Car Driver\backend"
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

## 🌐 STEP 2: START FRONTEND SERVER

Open **New Command Prompt** and run:

```cmd
cd /d "d:\VS CODE\Car Driver\frontend"
npm install
npm run dev
```

**Expected Output:**
```
VITE v6.x.x ready in xxx ms
➜  Local:   http://localhost:5175/
```

---

## 🧪 STEP 3: TEST SERVERS ARE RUNNING

### Test Backend Health

Open **New Command Prompt** and run:

```cmd
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "uptime": 12.345,
  "dbConnected": false
}
```

✅ If you see this, **BACKEND IS WORKING**

---

## 🌟 STEP 4: OPEN FRONTEND IN BROWSER

Open your browser and go to:

```
http://localhost:5175
```

You should see the **Car Driver** home page with:
- Navigation bar
- Hero section
- Pilot/Driver sections
- Services

---

## 📝 STEP 5: COMPLETE USER FLOW TEST

### 5.1 Register a New User

1. Click **"Register"** in navigation
2. Fill form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Phone: `1234567890`
3. Click **"Register"**
4. Expected: Success message, redirect to login

---

### 5.2 Login

1. You should be on Login page
2. Enter:
   - Email: `john@example.com`
   - Password: `password123`
3. Click **"Login"**
4. Expected: Redirect to home, token stored

✅ **Verify token stored:**
- Open Browser Console (F12)
- Go to **Application** tab
- Click **LocalStorage**
- Look for `token` key
- Should see a JWT token (long string)

---

### 5.3 Browse Drivers/Pilots

1. Click **"Pilots"** in navigation
2. Wait for drivers to load
3. Expected: See 5+ driver cards with:
   - Driver name
   - Rating (stars/number)
   - Hourly rate
   - Vehicle types
   - **"View Details"** button

---

### 5.4 View Driver Details

1. Click **"View Details"** on any driver card
2. Expected: See full driver profile with:
   - Name, rating, experience
   - Hourly rate
   - Vehicle types
   - Languages, certifications
   - **"Book Now"** button

---

### 5.5 Create Booking

1. On driver details page, click **"Book Now"**
2. Fill booking form:
   - Pickup Location: `123 Main St, City`
   - Drop Location: `456 Oak Ave, City`
   - Select Date: Any future date
   - Select Time: Any time
   - Duration: `2` hours
3. Review calculated amount (hourly rate × 2)
4. Click **"Confirm Booking"**
5. Expected: 
   - Success message
   - Redirect to **"Booking Success"** page
   - See checkmark and success message

---

### 5.6 View Dashboard

1. From success page, click **"View Booking Details"**
   OR
2. Go directly to: `http://localhost:5175/dashboard`
3. Expected: See your booking with:
   - Driver name
   - Pickup/Drop locations
   - Date and time
   - Status: `confirmed`
   - Total amount

---

## 🧾 POSTMAN API TESTING

### Import Postman Collection

Create requests to test all endpoints:

#### **1. Health Check** (No Auth Needed)
```
Method: GET
URL: http://localhost:5000/api/health
```

---

#### **2. Register User** (No Auth Needed)
```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: Content-Type: application/json
Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password456",
  "phone": "9876543210"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

#### **3. Login User** (No Auth Needed)
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body:
{
  "email": "jane@example.com",
  "password": "password456"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

⚠️ **Save the token value** for authenticated requests below

---

#### **4. Get All Drivers** (No Auth Needed)
```
Method: GET
URL: http://localhost:5000/api/drivers
```

**Expected Response (200):**
```json
{
  "success": true,
  "drivers": [
    {
      "_id": "...",
      "name": "Pilot Name",
      "rating": 4.8,
      "hourlyRate": 45,
      "isAvailable": true,
      "user": { ... }
    }
  ]
}
```

---

#### **5. Get Single Driver** (No Auth Needed)
```
Method: GET
URL: http://localhost:5000/api/drivers/DRIVER_ID_HERE
```

Replace `DRIVER_ID_HERE` with actual driver ID from previous request

**Expected Response (200):**
```json
{
  "success": true,
  "driver": { ... }
}
```

---

#### **6. Create Booking** (Auth Required)
```
Method: POST
URL: http://localhost:5000/api/bookings
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer YOUR_TOKEN_HERE
Body:
{
  "driverId": "DRIVER_ID_HERE",
  "startTime": "2025-04-10T10:00:00Z",
  "endTime": "2025-04-10T12:00:00Z",
  "pickupLocation": "123 Main St",
  "dropLocation": "456 Park Ave",
  "totalAmount": 90,
  "paymentMethod": "COD"
}
```

Replace:
- `YOUR_TOKEN_HERE` with token from login response
- `DRIVER_ID_HERE` with actual driver ID

**Expected Response (201):**
```json
{
  "success": true,
  "booking": {
    "_id": "...",
    "status": "confirmed",
    "paymentMethod": "COD",
    "totalAmount": 90
  }
}
```

---

#### **7. Get User Bookings** (Auth Required)
```
Method: GET
URL: http://localhost:5000/api/bookings
Headers:
  - Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (200):**
```json
{
  "success": true,
  "bookings": [ ... ]
}
```

---

## ✅ TESTING CHECKLIST

Mark these off as you complete:

### Setup
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5175`
- [ ] Health check returns success
- [ ] Home page loads in browser

### Authentication
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token appears in localStorage
- [ ] Can see protected pages after login

### Driver Features
- [ ] Drivers list page loads
- [ ] Can view driver details
- [ ] Driver info displays correctly
- [ ] Search/filter works (if implemented)

### Booking Features
- [ ] Can click "Book Now"
- [ ] Booking form appears
- [ ] Can fill booking form
- [ ] Can submit booking
- [ ] Booking success page shows
- [ ] Booking appears in dashboard
- [ ] Status shows "confirmed"

### Postman Testing
- [ ] GET /health returns 200
- [ ] POST /auth/register returns 201
- [ ] POST /auth/login returns 200 + token
- [ ] GET /drivers returns 200
- [ ] GET /drivers/:id returns 200
- [ ] POST /bookings returns 201 (with token)
- [ ] GET /bookings returns 200 (with token)

### Error Handling
- [ ] Login with wrong password shows error
- [ ] Register with existing email shows error
- [ ] Accessing protected page without login redirects
- [ ] Invalid token shows 401 error

---

## 🔥 COMMON ISSUES & FIXES

### Issue: "Cannot connect to backend" or CORS error

**Solution:**
1. Make sure backend is running: `npm run dev` in backend folder
2. Check backend console shows: `🚀 Server Running on PORT 5000`
3. Test health check: `curl http://localhost:5000/api/health`

---

### Issue: "Port 5000 already in use"

**Solution (in CMD as Admin):**
```cmd
taskkill /F /IM node.exe
```

Then restart backend:
```cmd
npm run dev
```

---

### Issue: "Port 5175 already in use"

**Solution (in CMD as Admin):**
```cmd
taskkill /F /IM node.exe
```

Or change port in `frontend/vite.config.js`:
```javascript
server: {
  port: 5176
}
```

---

### Issue: "npm install still fails"

**Solution:**
```cmd
npm install --legacy-peer-deps
```

Or:
```cmd
npm install --force
```

---

### Issue: "Blank page or 404 errors"

**Solution:**
1. Hard refresh browser: `Ctrl+Shift+Delete`
2. Clear browser cache
3. Restart frontend: Stop and `npm run dev` again

---

## 📊 COMPLETE FLOW SUMMARY

```
1. Start Backend         → npm run dev (backend folder)
                         → http://localhost:5000
                         → Shows: 🚀 Server Running on PORT 5000

2. Start Frontend        → npm run dev (frontend folder)
                         → http://localhost:5175
                         → Shows: ➜ Local: http://localhost:5175/

3. Test Health Check     → curl http://localhost:5000/api/health
                         → Returns: {"success": true}

4. Register User         → Browser: http://localhost:5175/register
                         → Fill form & submit

5. Login User            → Browser: http://localhost:5175/login
                         → Enter credentials & submit
                         → Token stored in localStorage

6. Browse Drivers        → Browser: http://localhost:5175/pilots
                         → See list of drivers

7. View Driver Details   → Click "View Details" on any driver
                         → See full profile & booking form

8. Create Booking        → Click "Book Now"
                         → Fill booking form
                         → See success page

9. View Dashboard        → Click "View Booking Details"
                         → See booking with status: "confirmed"

10. Test in Postman      → All 7 endpoint tests from above section
```

---

## 🎓 KEY URLS TO REMEMBER

| Feature | URL |
|---------|-----|
| Frontend Home | http://localhost:5175 |
| Frontend Register | http://localhost:5175/register |
| Frontend Login | http://localhost:5175/login |
| Frontend Pilots List | http://localhost:5175/pilots |
| Frontend Dashboard | http://localhost:5175/dashboard |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

---

## 📱 FRONTEND ROUTES

```
/                    Home page
/register            Register new user
/login               Login existing user
/pilots              Browse all drivers
/pilot/:id           Driver details (replace :id with actual ID)
/search-pilots       Search results
/dashboard           User's bookings (protected)
/booking/success     Booking success page (protected)
/about               About page
/contact             Contact page
/services            Services page
```

---

## 🔐 AUTHENTICATION

**How it works:**
1. User registers → Get token
2. User logs in → Get token
3. Token stored in `localStorage` as key: `token`
4. Token automatically added to all API requests in `Authorization` header
5. Backend verifies token on protected routes
6. If token expired/invalid → redirected to login

---

## 🎯 SUCCESS CRITERIA

Your application is working perfectly when:

✅ Backend starts without errors  
✅ Frontend loads without errors  
✅ Can register and login  
✅ Can browse drivers list  
✅ Can view driver details  
✅ Can create bookings  
✅ Bookings show in dashboard with status: "confirmed"  
✅ All Postman tests pass  
✅ No console errors  
✅ No CORS errors  

---

## 📞 NEED HELP?

If something fails:

1. **Share the exact error message**
2. **Share your command line output**
3. **Share browser console errors (F12)**
4. **Share Postman error response**

And I'll provide the exact fix!

---

**Status:** ✅ Ready to Start

**Next Action:** Double-click `backend\INSTALL_AND_RUN.bat` or follow Step 1 manual commands

Let me know when all steps are complete! 🚀
