# 🧪 Complete Testing Guide - Car Driver MERN Stack

## Pre-Testing Checklist

### 1. Prerequisites
- [ ] MongoDB is running (port 27017)
- [ ] Node.js v16+ installed
- [ ] npm/yarn installed
- [ ] Port 5000 available for backend
- [ ] Port 5173 available for frontend

### 2. Configuration Files
- [ ] Backend `.env` has correct MONGO_URI and JWT_SECRET
- [ ] Frontend `.env` has VITE_API_URL=http://localhost:5000/api
- [ ] Both have NODE_ENV or NODE configuration

### 3. Dependencies
- [ ] Backend: `npm install` completed successfully
- [ ] Frontend: `npm install` completed successfully

---

## Backend Testing

### Step 1: Start Backend Server

```bash
cd backend
npm start
```

**Expected Output:**
```
✅ MongoDB Connected Successfully
Server Running on PORT 5000
```

**If MongoDB fails to connect:**
```
⚠️ MongoDB connection failed: ...
Will start server anyway with mock data
```

### Step 2: Test API Health

**Test 1: Verify Server is Running**
```bash
curl http://localhost:5000
```

**Test 2: Test CORS Configuration**
```bash
curl -H "Origin: http://localhost:5173" http://localhost:5000/api/drivers
```

### Step 3: Test Auth Endpoints

**Test 3: Register New User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

**Test 4: Login with Credentials**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "...",
  "user": { ... }
}
```

### Step 4: Test Driver Endpoints

**Test 5: Get All Drivers**
```bash
curl http://localhost:5000/api/drivers
```

**Expected Response:**
```json
{
  "success": true,
  "data": [ { driver objects } ],
  "pagination": { ... }
}
```

**Test 6: Get Available Drivers**
```bash
curl http://localhost:5000/api/drivers/available
```

**Test 7: Get Single Driver**
```bash
curl http://localhost:5000/api/drivers/{driver_id}
```

### Step 5: Test Booking Endpoints (Protected)

**Test 8: Create Booking (Requires Auth)**
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token}" \
  -d '{
    "driverId": "{driver_id}",
    "startTime": "2024-04-15T10:00:00Z",
    "endTime": "2024-04-15T12:00:00Z",
    "pickupLocation": "Downtown",
    "dropLocation": "Airport",
    "totalAmount": 100
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": { booking object }
}
```

**Test 9: Get User Bookings (Requires Auth)**
```bash
curl http://localhost:5000/api/bookings \
  -H "Authorization: Bearer {your_token}"
```

**Test 10: Logout**
```bash
curl -X POST http://localhost:5000/api/auth/logout
```

---

## Frontend Testing

### Step 1: Start Frontend Server

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 2: UI Accessibility Tests

**Test 1: Homepage Load**
- Navigate to http://localhost:5173
- Verify navbar displays correctly
- Verify hero section and CTAs display

**Test 2: Navigation**
- Check all navbar links work
- Check mobile menu (if implemented)
- Verify no 404 errors in console

### Step 3: Authentication Tests

**Test 3: Registration Flow**
1. Click "Register" in navbar
2. Fill registration form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "1234567890"
   - Password: "TestPass123"
   - Confirm Password: "TestPass123"
3. Click Submit
4. **Expected**: Success message, redirect to login page
5. **Verify**: Check localStorage for token (should be empty after registration)

**Test 4: Validation**
1. Try submitting empty form
2. Try mismatched passwords
3. Try invalid email format
4. Try short password
5. **Expected**: Error messages appear

**Test 5: Login Flow**
1. Go to login page
2. Enter credentials (test@example.com / TestPass123)
3. Click Submit
4. **Expected**: Login successful, redirect to home, token in localStorage

**Test 6: Check Token Storage**
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. **Expected**: Key "token" with JWT value present

**Test 7: Token Persistence**
1. Refresh page (F5)
2. **Expected**: User still logged in, navbar shows logout option

### Step 4: Driver Viewing Tests

**Test 8: View Drivers List**
1. Click "Available Pilots" or "Drivers" in navbar
2. **Expected**: List of drivers loads with:
   - Driver photos
   - Names and ratings
   - Hourly rates
   - Vehicle types
   - Availability status

**Test 9: Filter Drivers**
1. Use filter panel (if present):
   - Filter by vehicle type
   - Filter by minimum rating
   - Filter by price range
2. **Expected**: List filters correctly

**Test 10: Search Drivers**
1. Use search bar
2. Search by driver name or vehicle type
3. **Expected**: Results filter correctly

**Test 11: View Driver Details**
1. Click on a driver card
2. **Expected**: Driver details page loads with:
   - Full profile information
   - Rating breakdown
   - Booking form
   - Booking history (if logged in)

### Step 5: Booking Tests

**Test 12: Booking Flow (Logged In)**
1. On driver details page, click "Book Now" or similar button
2. Fill booking form:
   - Date: Select future date
   - Time: Select time
   - Duration: Select hours
   - Pickup location: Enter address
   - Drop location: Enter address
3. Click "Confirm Booking"
4. **Expected**: Success page shows booking confirmation

**Test 13: Booking Flow (Not Logged In)**
1. Log out first (or use incognito window)
2. On driver details page, click "Book Now"
3. **Expected**: Redirected to login page

**Test 14: Verify Booking Stored**
1. Go to Dashboard (protected route)
2. **Expected**: See your booking in the list

### Step 6: Error Handling Tests

**Test 15: Network Error**
1. Stop backend server
2. Try any API call (view drivers, login, etc.)
3. **Expected**: Error message displayed, graceful fallback shown

**Test 16: Invalid Token**
1. Manually clear token from localStorage
2. Try accessing protected route
3. **Expected**: Redirected to login

**Test 17: Expired Token**
1. Modify token in localStorage (make it invalid)
2. Try any API call
3. **Expected**: 401 error, token cleared, redirected to login

---

## Integration Tests

### Complete User Journey Test

#### Scenario 1: New User Registration and Booking

1. **Registration**
   - [ ] Open http://localhost:5173
   - [ ] Click Register
   - [ ] Fill form with new user data
   - [ ] Submit registration
   - [ ] See success message
   - [ ] Redirected to login

2. **Login**
   - [ ] Enter registered credentials
   - [ ] Click Login
   - [ ] See success message
   - [ ] Token stored in localStorage
   - [ ] Redirected to home

3. **View Drivers**
   - [ ] Click on "Drivers" or "Available Pilots"
   - [ ] See driver list loaded
   - [ ] See filters working
   - [ ] Click on a driver

4. **View Driver Details**
   - [ ] See driver profile
   - [ ] See booking form
   - [ ] Fill booking form
   - [ ] Click "Book Now"

5. **Booking Confirmation**
   - [ ] See success page
   - [ ] See booking details displayed
   - [ ] Option to view bookings

6. **View Bookings**
   - [ ] Click Dashboard or My Bookings
   - [ ] See created booking in list
   - [ ] Can view booking details

7. **Logout**
   - [ ] Click Logout in navbar
   - [ ] Token removed from localStorage
   - [ ] Redirected to home
   - [ ] Navbar shows Login option

#### Scenario 2: Existing User Quick Booking

1. **Login with existing account**
   - [ ] Navigate to login
   - [ ] Enter credentials
   - [ ] Successfully logged in

2. **Direct booking**
   - [ ] Navigate directly to driver details
   - [ ] Create booking immediately
   - [ ] See success

---

## Performance Tests

### Load Testing

**Test 1: Driver List Load Time**
1. Open DevTools Network tab
2. Navigate to drivers page
3. **Expected**: Page loads in < 3 seconds
4. **Note**: API request should be < 1 second

**Test 2: Image Loading**
1. Check Network tab for image requests
2. **Expected**: All images load successfully
3. **Expected**: Placeholder shown while loading

### Response Time Validation

- Auth endpoints: < 500ms
- Driver list: < 1000ms
- Driver details: < 500ms
- Booking creation: < 1000ms

---

## Browser Compatibility Tests

Test in following browsers:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### Mobile Responsiveness

- [ ] Hamburger menu works
- [ ] Driver cards stack properly
- [ ] Booking form is usable
- [ ] All buttons are tappable
- [ ] No horizontal scrolling

---

## Security Tests

### Test 1: CSRF Protection
- [ ] Verify form submissions work with CORS

### Test 2: XSS Protection
- [ ] Try entering script tags in form fields
- [ ] Verify scripts don't execute

### Test 3: Authentication
- [ ] Can't access protected routes without token
- [ ] Token validation works
- [ ] 401 redirects to login

### Test 4: Authorization
- [ ] User can only see their own bookings
- [ ] Can't modify other users' bookings

---

## Bug Tracking

### Issues Found During Testing

| No. | Issue | Steps to Reproduce | Expected | Actual | Status |
|-----|-------|-------------------|----------|--------|--------|
| 1   |       |                   |          |        |        |
| 2   |       |                   |          |        |        |
| 3   |       |                   |          |        |        |

---

## Test Results Summary

### Backend
- [ ] Server starts successfully
- [ ] All auth endpoints work
- [ ] All driver endpoints work
- [ ] All booking endpoints work
- [ ] Error handling works
- [ ] CORS configured correctly

### Frontend
- [ ] All pages load correctly
- [ ] All forms work correctly
- [ ] All API calls successful
- [ ] Token management works
- [ ] Protected routes work
- [ ] Error messages display correctly

### Integration
- [ ] Complete registration flow works
- [ ] Complete login flow works
- [ ] Complete booking flow works
- [ ] Token persists across refreshes
- [ ] Logout clears everything

---

## Test Execution Commands

### Quick Test Script

```bash
# Terminal 1: Start Backend
cd backend
npm start

# Terminal 2: Start Frontend
cd frontend
npm run dev

# Terminal 3: Run Tests (if configured)
npm test

# Terminal 4: Run Backend Tests
cd backend
npm test
```

---

## Sign-Off

- **Tested By**: [Your Name]
- **Test Date**: [Date]
- **Overall Status**: ✅ PASS / ❌ FAIL
- **Critical Issues**: None / [List]
- **Minor Issues**: None / [List]
- **Ready for Production**: YES / NO

**Notes**:
```
[Add any additional notes or observations]
```

---

## Next Steps After Testing

1. If all tests pass:
   - [ ] Deploy to production
   - [ ] Monitor error logs
   - [ ] Gather user feedback

2. If tests fail:
   - [ ] Document all failures
   - [ ] Fix issues
   - [ ] Re-run failing tests
   - [ ] Get sign-off

---

**Test Date**: April 6, 2026
**Test Version**: 1.0
**Status**: 🟢 READY FOR EXECUTION
