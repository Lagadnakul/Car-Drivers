# ✅ COMPLETE TESTING SCENARIOS & VERIFICATION MATRIX

**Project:** Car Driver MERN Stack  
**Purpose:** Comprehensive testing guide with all scenarios  
**Expected Duration:** 20-30 minutes  

---

## 📊 TEST EXECUTION MATRIX

| Test ID | Scenario | Steps | Expected | Status |
|---------|----------|-------|----------|--------|
| T001 | Backend Startup | Start server | Port 5000 listening | ⬜ |
| T002 | Frontend Startup | Start server | Port 5175 accessible | ⬜ |
| T003 | API Health Check | Call health endpoint | 200 OK | ⬜ |
| T004 | User Registration | Register new user | Account created | ⬜ |
| T005 | User Login | Login with credentials | JWT token returned | ⬜ |
| T006 | Session Persist | Refresh page | User stays logged in | ⬜ |
| T007 | Driver List | Browse drivers | List displays | ⬜ |
| T008 | Booking Form | Fill booking details | Form validates | ⬜ |
| T009 | Booking Submit | Submit booking | 201 Created | ⬜ |
| T010 | Success Page | Redirect after booking | Animations play | ⬜ |
| T011 | Mobile Responsive | Resize to 375px | Layout adapts | ⬜ |
| T012 | Dark Mode | Enable dark mode | Styles apply | ⬜ |
| T013 | Error Handling | Trigger error | Error message displays | ⬜ |
| T014 | CORS Headers | Check response headers | CORS headers present | ⬜ |
| T015 | Database Persist | Refresh page after booking | Booking still exists | ⬜ |

---

## 🧪 DETAILED TEST SCENARIOS

---

## TEST GROUP 1: SERVER STARTUP

### TEST T001: Backend Server Startup

**Objective:** Verify backend server starts correctly

**Precondition:**
- Node.js installed and working
- MongoDB URI valid in `.env`
- Port 5000 not in use

**Steps:**
1. Open terminal/command prompt
2. Navigate to `d:\VS CODE\Car Driver\backend`
3. Run: `npm run dev`
4. Wait 5 seconds

**Expected Results:**
```
✅ Server running on http://localhost:5000
✅ 📍 Database: carDriver-1  (or Using Mock Data)
✅ ✨ All routes registered
✅ No error messages
```

**Pass Criteria:**
- [ ] Output contains "Server running"
- [ ] No red error text
- [ ] Process doesn't exit
- [ ] Port 5000 accessible

**Fail Recovery:**
- If fails, see [Troubleshooting Guide](🆘_TROUBLESHOOTING_GUIDE.md)

---

### TEST T002: Frontend Server Startup

**Objective:** Verify frontend server starts correctly

**Precondition:**
- Node.js installed and working
- Backend running (or at least accessible)
- Port 5175 not in use (or 5173/5174/5176)

**Steps:**
1. Open new terminal/command prompt
2. Navigate to `d:\VS CODE\Car Driver\frontend`
3. Run: `npm run dev`
4. Wait 10 seconds

**Expected Results:**
```
✅ Local: http://localhost:5175/
✅ Network: Available on network
✅ 🔗 API Base URL: http://localhost:5000/api
✅ No error messages
```

**Pass Criteria:**
- [ ] Output contains port number
- [ ] No red error text
- [ ] Process doesn't exit
- [ ] Browser can access http://localhost:5175

**Fail Recovery:**
- If fails, see [Troubleshooting Guide](🆘_TROUBLESHOOTING_GUIDE.md)

---

### TEST T003: API Health Check

**Objective:** Verify backend API is responding

**Precondition:**
- Backend server running

**Steps:**
1. Open browser
2. Go to: `http://localhost:5000/api/health`
3. Observe response

**Expected Results:**
```json
{
  "success": true,
  "message": "Server is running",
  "database": "✅ Connected" or "⚠️ Using Mock Data"
}
```

**Pass Criteria:**
- [ ] Returns JSON (not HTML)
- [ ] success: true
- [ ] HTTP 200 OK status

---

## TEST GROUP 2: AUTHENTICATION

### TEST T004: User Registration

**Objective:** Verify user registration creates account

**Precondition:**
- Frontend running at http://localhost:5175
- Backend running

**Steps:**
1. Open browser: `http://localhost:5175/register`
2. Fill registration form:
   - **Name:** `Test User 001`
   - **Email:** `test001@example.com`
   - **Password:** `Test@Password123`
   - **Phone:** `9876543210`
3. Click "Register" button
4. Wait for response (5 seconds)

**Expected Results:**
```
✅ Form validation passes
✅ No error messages
✅ Success notification appears
✅ Redirected to dashboard or login
```

**Pass Criteria:**
- [ ] Form submits without errors
- [ ] No console errors (F12)
- [ ] Status code 201 in Network tab
- [ ] Response has user data

**Fail Recovery:**
- Check backend console for validation errors
- Verify all required fields filled
- Try different email address

**Data to Save:**
```
Email: test001@example.com
Password: Test@Password123
(Save for next tests)
```

---

### TEST T005: User Login

**Objective:** Verify user login generates JWT token

**Precondition:**
- User registered (from T004)
- Frontend running
- Backend running

**Steps:**
1. Open browser: `http://localhost:5175/login`
2. Fill login form:
   - **Email:** `test001@example.com` (from T004)
   - **Password:** `Test@Password123` (from T004)
3. Click "Login" button
4. Wait for response (3 seconds)

**Expected Results:**
```
✅ Form validates
✅ No error messages
✅ Redirected to dashboard
✅ JWT token stored
```

**Pass Criteria:**
- [ ] Form submits successfully
- [ ] No console errors
- [ ] Status code 200 in Network tab
- [ ] localStorage has 'token' key

**Verify Token:**
1. Open DevTools (F12)
2. Go to Application tab
3. Look for Local Storage
4. Check for 'token' key
5. Should see JWT starting with "eyJ"

---

### TEST T006: Session Persistence

**Objective:** Verify user session persists on page refresh

**Precondition:**
- User logged in (from T005)
- On dashboard or any protected page

**Steps:**
1. User currently logged in (status bar shows name)
2. Refresh page: Press F5
3. Wait for page to load (3 seconds)
4. Check if still logged in

**Expected Results:**
```
✅ Page loads
✅ User still logged in
✅ Dashboard visible (not redirected to login)
✅ User name shown in header
```

**Pass Criteria:**
- [ ] No redirect to login page
- [ ] User info visible in UI
- [ ] No "Not authorized" messages
- [ ] localStorage still has token

---

## TEST GROUP 3: DRIVER BROWSING

### TEST T007: Driver List Display

**Objective:** Verify driver list displays correctly

**Precondition:**
- User logged in (from T005)
- Frontend running
- Backend running

**Steps:**
1. From dashboard, click "Browse Drivers"
2. Or navigate to: `http://localhost:5175/drivers`
3. Wait for page to load (3 seconds)
4. Observe driver list

**Expected Results:**
```
✅ Page loads
✅ Multiple driver cards visible
✅ Each card shows:
   - Driver photo/avatar
   - Name
   - Rating
   - Vehicle info
   - Availability status
   - "Book Now" button
✅ No error messages
```

**Pass Criteria:**
- [ ] At least 3 drivers visible
- [ ] All required info displayed
- [ ] "Book Now" buttons clickable
- [ ] No console errors

**Network Check:**
1. Open DevTools (F12)
2. Go to Network tab
3. Find `GET /api/drivers`
4. Status should be 200
5. Response should be JSON array

---

## TEST GROUP 4: BOOKING FLOW

### TEST T008: Booking Form Validation

**Objective:** Verify booking form validates input

**Precondition:**
- User logged in
- On driver list page

**Steps:**
1. Click "Book Now" on any driver
2. Modal/form opens with booking details
3. Try to submit with empty fields
4. Observe validation

**Expected Results:**
```
✅ Form appears
✅ Fields show validation errors
✅ Cannot submit with missing fields
✅ Error messages helpful
```

**Pass Criteria:**
- [ ] All required fields marked
- [ ] Validation triggers before submit
- [ ] User can correct errors
- [ ] Submit button becomes enabled when valid

---

### TEST T009: Booking Submission

**Objective:** Verify booking is created successfully

**Precondition:**
- Booking form open
- All fields valid

**Steps:**
1. Fill all booking fields:
   - **Pickup:** `123 Main Street`
   - **Drop:** `456 Final Avenue`
   - **Date:** Tomorrow's date
   - **Start Time:** 09:00 AM
   - **End Time:** 10:00 AM (or later)
2. Click "Confirm Booking" button
3. Wait for response (5 seconds)

**Expected Results:**
```
✅ Form submitted
✅ Loading indicator appears
✅ No error messages
✅ Response status 201 Created
✅ Redirect to success page
```

**Pass Criteria:**
- [ ] No console errors (F12)
- [ ] Network tab shows POST /bookings with 201 status
- [ ] Response has booking ID
- [ ] Booking data in response

**Network Verification:**
1. Open DevTools (F12)
2. Network tab
3. Submit booking
4. Find POST request to `/api/bookings`
5. Check:
   - [ ] Status: 201
   - [ ] Response includes bookingId
   - [ ] Response includes booking details

---

### TEST T010: Success Page Display

**Objective:** Verify booking confirmation page displays correctly

**Precondition:**
- Booking submitted successfully (from T009)
- Redirected to success page

**Steps:**
1. Wait for page to fully load (3 seconds)
2. Observe animated confirmation page
3. Look for all elements

**Expected Results:**
```
✅ Page loads
✅ Checkmark animates smoothly
✅ Confetti falls across screen
✅ Success message displays
✅ Driver information card visible
✅ Booking details expandable
✅ Action buttons present
```

**Animation Checklist:**
- [ ] Checkmark springs in (animated)
- [ ] Confetti particles fall (3 sec duration)
- [ ] Text fades in smoothly
- [ ] Background has gradient animation
- [ ] Buttons have hover effects
- [ ] Details section expands smoothly

**Content Checklist:**
- [ ] Booking ID visible
- [ ] Driver name displayed
- [ ] Driver photo/avatar shown
- [ ] Driver rating visible
- [ ] Pickup location shown
- [ ] Drop location shown
- [ ] Date and time visible
- [ ] Total amount displayed
- [ ] "View All Bookings" button present
- [ ] "Book Again" button present

**Pass Criteria:**
- [ ] All animations play smoothly
- [ ] All information visible
- [ ] No layout shifts (CLS < 0.1)
- [ ] Page responsive
- [ ] Buttons clickable

---

## TEST GROUP 5: RESPONSIVE DESIGN

### TEST T011: Mobile Responsiveness

**Objective:** Verify UI adapts to mobile screen size

**Precondition:**
- Browser DevTools open
- Any page of app loaded

**Steps:**
1. Open DevTools (F12)
2. Click device toolbar icon (toggle device mode)
3. Select mobile device or set dimensions:
   - **Width:** 375px
   - **Height:** 667px
4. Reload page (F5)
5. Navigate through app
6. Try submitting a booking

**Expected Results:**
```
✅ Text readable without zooming
✅ Buttons easily tappable (min 44x44px)
✅ No horizontal scroll needed
✅ Layout adapts to screen
✅ Images responsive
✅ Navigation works on mobile
```

**Mobile Checklist:**
- [ ] Header responsive
- [ ] Driver cards stack vertically
- [ ] Booking form fields full width
- [ ] Buttons full width or centered
- [ ] Text readable at default zoom
- [ ] Success page animations smooth
- [ ] No overflow/truncation

**Test Different Sizes:**
- [ ] iPhone SE (375x667)
- [ ] iPhone 12 (390x844)
- [ ] iPad (768x1024)
- [ ] Desktop (1920x1080)

---

### TEST T012: Dark Mode Support

**Objective:** Verify dark mode styling applies correctly

**Precondition:**
- App loaded
- Browser dark mode support available

**Steps:**
1. Access system dark mode setting
2. Enable dark mode (OS level or browser extension)
3. Refresh app page (F5)
4. Observe styling

**Alternative:**
1. Open DevTools (F12)
2. Go to Rendering tab
3. Find "Emulate CSS media feature prefers-color-scheme"
4. Select "dark"

**Expected Results:**
```
✅ Background dark
✅ Text light/readable
✅ Good contrast ratio (WCAG AA minimum)
✅ No white background
✅ All text visible
✅ Images not oversaturated
```

**Dark Mode Checklist:**
- [ ] Background dark (not white)
- [ ] Text light color
- [ ] Contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Cards have dark background
- [ ] Buttons styled for dark mode
- [ ] Links readable
- [ ] No unreadable text
- [ ] Images render correctly

---

## TEST GROUP 6: ERROR HANDLING

### TEST T013: Error Handling

**Objective:** Verify errors handled gracefully

**Precondition:**
- App running
- DevTools open (F12)

**Steps:**

#### Scenario A: Network Error
1. Disable internet or use DevTools throttling
2. Try any API call (like browsing drivers)
3. Observe error handling

#### Scenario B: Invalid Input
1. Go to registration form
2. Try invalid email format
3. Try password too short
4. Observe validation

#### Scenario C: Authentication Error
1. Clear localStorage (DevTools)
2. Refresh page
3. Try accessing protected route
4. Should redirect to login

**Expected Results:**
```
✅ Errors display user-friendly messages
✅ No exposed technical details
✅ Graceful degradation
✅ User knows what happened
✅ Clear path to recovery
```

**Error Handling Checklist:**
- [ ] Network errors: Helpful message shown
- [ ] Validation errors: Clear explanation
- [ ] Auth errors: Redirect to login
- [ ] Server errors: Generic message (no secrets)
- [ ] Timeouts: Handled gracefully
- [ ] Offline: App indicates offline state

---

### TEST T014: CORS Headers Verification

**Objective:** Verify CORS headers in responses

**Precondition:**
- Backend running
- Frontend making requests

**Steps:**
1. Open DevTools (F12)
2. Go to Network tab
3. Make an API request (like login or get drivers)
4. Click on request in Network tab
5. Go to Response Headers tab
6. Look for CORS headers

**Expected Response Headers:**
```
Access-Control-Allow-Origin: http://localhost:5175
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Pass Criteria:**
- [ ] All CORS headers present
- [ ] Origin matches frontend URL
- [ ] Credentials: true
- [ ] Methods include POST
- [ ] Headers include Authorization

---

## TEST GROUP 7: DATABASE PERSISTENCE

### TEST T015: Data Persistence

**Objective:** Verify bookings persist in database

**Precondition:**
- Successfully created at least one booking
- On success page

**Steps:**
1. Note booking ID displayed on success page
2. Click "View All Bookings" button
3. Should see booking in list
4. Close browser completely
5. Reopen browser
6. Login again with same account
7. Check bookings list

**Expected Results:**
```
✅ Booking appears in list immediately (after success)
✅ Booking ID matches
✅ All details preserved
✅ After browser restart:
   ✅ User still logged in
   ✅ Booking still in database
   ✅ Booking details intact
```

**Persistence Checklist:**
- [ ] Booking visible on success page
- [ ] Booking in "View All Bookings"
- [ ] Booking survives page refresh
- [ ] Booking survives browser restart
- [ ] Booking details complete:
  - [ ] Booking ID
  - [ ] Driver info
  - [ ] Pickup location
  - [ ] Drop location
  - [ ] Booking date/time
  - [ ] Status (pending)

---

## 📊 TEST RESULT SUMMARY

After completing all tests, fill in the matrix:

| Test ID | Test Name | Result | Notes |
|---------|-----------|--------|-------|
| T001 | Backend Startup | ✅/❌ | |
| T002 | Frontend Startup | ✅/❌ | |
| T003 | API Health Check | ✅/❌ | |
| T004 | User Registration | ✅/❌ | |
| T005 | User Login | ✅/❌ | |
| T006 | Session Persistence | ✅/❌ | |
| T007 | Driver List | ✅/❌ | |
| T008 | Booking Form Validation | ✅/❌ | |
| T009 | Booking Submission | ✅/❌ | |
| T010 | Success Page | ✅/❌ | |
| T011 | Mobile Responsive | ✅/❌ | |
| T012 | Dark Mode | ✅/❌ | |
| T013 | Error Handling | ✅/❌ | |
| T014 | CORS Headers | ✅/❌ | |
| T015 | Data Persistence | ✅/❌ | |

**Total Tests:** 15  
**Passed:** ____ / 15  
**Success Rate:** _____%

### Pass Criteria
- ✅ **Excellent:** 15/15 (100%) - Ready for production
- ✅ **Good:** 14/15 (93%+) - Minor issues only
- ⚠️ **Fair:** 12/15 (80%+) - Address failures
- ❌ **Needs Work:** <80% - Major issues

---

## 🔧 IF TESTS FAIL

1. **Note the test ID** (T001-T015)
2. **Check troubleshooting guide** for that component
3. **Review console errors** (F12 → Console)
4. **Check network tab** for failed requests
5. **Restart relevant server**
6. **Re-run test**

**Most common causes:**
- Backend not running
- Frontend not running
- Port already in use
- Credentials wrong in .env
- Browser cache issue (Ctrl+Shift+Delete)

---

**Expected time to complete all tests:** 20-30 minutes  
**Success rate for production-ready system:** 95%+

**Next step:** If all tests pass, system is ready for production deployment! 🚀
