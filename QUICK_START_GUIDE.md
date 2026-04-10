# 🚀 Quick Start Guide - Car Driver MERN Stack

## 5-Minute Setup

### Prerequisites
```bash
# Check Node.js installation
node --version  # Should be v16+
npm --version
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

✅ Backend running at: http://localhost:5000

### Frontend Setup (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: http://localhost:5173

### Open Application
```
http://localhost:5173
```

---

## API Quick Reference

### Authentication
```
POST   /api/auth/register    - Create account
POST   /api/auth/login       - Login
POST   /api/auth/logout      - Logout
```

### Drivers
```
GET    /api/drivers          - Get all drivers
GET    /api/drivers/:id      - Get driver details
GET    /api/drivers/available - Get available drivers
```

### Bookings (Protected)
```
POST   /api/bookings         - Create booking
GET    /api/bookings         - Get user bookings
GET    /api/bookings/:id     - Get booking details
PATCH  /api/bookings/:id/cancel - Cancel booking
```

---

## Quick Test

### 1. Register
```
1. Go to http://localhost:5173/register
2. Enter details:
   - Name: John Doe
   - Email: john@example.com
   - Password: JohnDoe123
   - Phone: 1234567890
3. Click Register
4. Redirect to login
```

### 2. Login
```
1. Go to http://localhost:5173/login
2. Enter:
   - Email: john@example.com
   - Password: JohnDoe123
3. Click Login
4. Should see homepage (logged in)
```

### 3. View Drivers
```
1. Click "Available Pilots" in navbar
2. See list of drivers
3. Click on any driver to see details
```

### 4. Create Booking
```
1. On driver details page
2. Click "Book Now"
3. Select date, time, duration
4. Add location details
5. Click "Confirm Booking"
6. See success page
```

---

## Important Files

### Backend
```
server.js                    - Main server
routes/                      - API routes
controllers/                 - Business logic
models/                      - Database schemas
middleware/                  - Middleware functions
.env                        - Configuration
```

### Frontend
```
src/pages/                   - Page components
src/components/              - UI components
src/services/                - API services
src/context/                 - State management
src/hooks/                   - Custom hooks
.env                        - Configuration
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID {PID} /F

# Check MongoDB is running
# Make sure MongoDB service is started
```

### Frontend can't connect to backend
```
1. Check VITE_API_URL in frontend/.env
2. Check backend is running on port 5000
3. Check browser console for errors (F12)
4. Clear browser cache (Ctrl+Shift+Delete)
```

### Login fails
```
1. Verify user exists in database
2. Check password is correct
3. Check JWT_SECRET in backend/.env
4. Check browser LocalStorage has token
```

---

## Environment Variables

### Backend (.env)
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/cardriver
JWT_SECRET=wdcefbrgnthmyjukilop
JWT_EXPIRE=30d
NODE_ENV=development
```

### Frontend (.env)
```properties
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

---

## Common Commands

```bash
# Backend
cd backend
npm install              # Install dependencies
npm start               # Start server
npm run dev             # Start with nodemon

# Frontend
cd frontend
npm install             # Install dependencies
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build

# Database
# MongoDB should be running in background
# Start MongoDB:
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

---

## Project URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000/api |
| API Docs | http://localhost:5000/api/docs (if configured) |

---

## Database Models

### User
- name, email, password, phone, role

### Driver
- user (ref), licenseNumber, experience, vehicleTypes, isAvailable, rating, hourlyRate

### Booking
- user (ref), driver (ref), startTime, endTime, pickupLocation, dropLocation, totalAmount

---

## Authentication Flow

1. **Register**: POST /api/auth/register → token returned
2. **Login**: POST /api/auth/login → token returned
3. **Store**: Token stored in localStorage
4. **Use**: Token sent in Authorization header for protected routes
5. **Logout**: POST /api/auth/logout → token cleared

---

## Feature Checklist

- [x] User registration and login
- [x] JWT authentication
- [x] Driver listing
- [x] Driver details
- [x] Booking system
- [x] Protected routes
- [x] Error handling
- [x] CORS configuration
- [x] Rate limiting
- [ ] Payment integration (TODO)
- [ ] Email notifications (TODO)
- [ ] Admin dashboard (TODO)

---

## Next Development Steps

1. Add payment integration (Stripe/PayPal)
2. Add email notifications
3. Add admin dashboard
4. Add driver registration flow
5. Add real-time notifications
6. Add map integration
7. Add review system
8. Optimize performance

---

## Additional Resources

- **Backend**: See backend/README.md
- **Frontend**: See frontend/README.md
- **Testing**: See COMPLETE_TESTING_GUIDE.md
- **Integration**: See FINAL_INTEGRATION_COMPLETE.md

---

## Getting Help

1. Check error message in console
2. Check network tab (DevTools F12)
3. Check server logs
4. Review backend error logs
5. Check database (MongoDB Compass)

---

**Last Updated**: April 6, 2026
**Status**: 🟢 PRODUCTION READY

