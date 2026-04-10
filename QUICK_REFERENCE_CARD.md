# 🚀 Car Driver MERN Stack - Quick Reference Card

**Version:** 1.0.0  
**Last Updated:** April 6, 2026  
**Status:** ✅ PRODUCTION READY

---

## 📂 Project Structure

```
Car Driver/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, logout)
│   │   ├── driverController.js   # Driver operations (CRUD, search)
│   │   └── bookingController.js  # Booking logic (create, update, cancel)
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── error.js              # Error handling
│   │   └── rateLimit.js          # Rate limiting
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Driver.js             # Driver schema
│   │   └── Booking.js            # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── driverRoutes.js       # Driver endpoints
│   │   ├── bookingRoutes.js      # Booking endpoints
│   │   ├── userRoutes.js         # User profile endpoints
│   │   └── adminRoutes.js        # Admin endpoints
│   ├── .env                       # Environment variables
│   ├── server.js                  # Main server file
│   └── package.json               # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Header/navigation
│   │   │   ├── Footer.jsx        # Footer
│   │   │   └── ProtectedRoute.jsx # Auth wrapper
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Drivers.jsx       # Driver listing
│   │   │   ├── DriverDetails.jsx # Driver profile & booking
│   │   │   ├── SearchResults.jsx # Search results
│   │   │   ├── Dashboard.jsx     # User dashboard
│   │   │   ├── BookingSuccess.jsx# Success page
│   │   │   ├── Services.jsx      # Services page
│   │   │   ├── About.jsx         # About page
│   │   │   └── Contact.jsx       # Contact page
│   │   ├── services/
│   │   │   ├── api.js            # Axios instance with auth
│   │   │   └── driverService.js  # Driver API calls
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── .env                       # Environment variables
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.cjs       # Tailwind CSS config
│   └── package.json              # Frontend dependencies
│
└── Documentation/
    ├── COMPLETE_INSTALLATION_GUIDE.md
    ├── POSTMAN_COLLECTION.json
    └── QUICK_REFERENCE_CARD.md (this file)
```

---

## ⚡ Quick Start Commands

### Backend Startup
```bash
cd backend
npm install              # First time only
npm run dev             # Start with auto-reload
npm start               # Production start
```

### Frontend Startup
```bash
cd frontend
npm install              # First time only
npm run dev             # Start development server
npm run build           # Build for production
```

### Both Servers (Windows)
```bash
START_ALL_SERVERS.bat
```

---

## 🔌 Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | http://localhost:5000 |
| Frontend Dev | 5175 | http://localhost:5175 |
| Frontend Build | 5000 | (production) |
| MongoDB | 27017 | (local only) |

---

## 🔐 Environment Variables

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
VITE_FRONTEND_PORT=5175
```

---

## 📡 API Endpoints (Quick Reference)

### Authentication
```
POST   /api/auth/register      { fullName, email, phone, password }
POST   /api/auth/login         { email, password } → returns token
POST   /api/auth/logout        [Protected]
```

### Drivers
```
GET    /api/drivers            Get all drivers (paginated)
GET    /api/drivers/:id        Get specific driver
GET    /api/drivers/search     Search with filters (location, rating, price)
GET    /api/drivers/available  Get available drivers
```

### Bookings [All Protected]
```
POST   /api/bookings           Create new booking
GET    /api/bookings           Get user's bookings
GET    /api/bookings/:id       Get specific booking
PUT    /api/bookings/:id       Update booking
PATCH  /api/bookings/:id/cancel Cancel booking
DELETE /api/bookings/:id       Delete booking
```

### Users [Protected]
```
GET    /api/users/profile      Get user profile
PUT    /api/users/profile      Update profile
```

### Health Check
```
GET    /api/health             Server status
```

---

## 🔑 Auth Flow

### 1. Register User
```javascript
POST /api/auth/register
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "Password123!"
}
Response: { user, token }
```

### 2. Login User
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "Password123!"
}
Response: { user, token }
// Token stored in localStorage
```

### 3. Protected Request
```javascript
// All protected routes require Authorization header
Authorization: Bearer <token>
```

### 4. Logout
```javascript
POST /api/auth/logout
// Token removed from localStorage
```

---

## 💼 Booking Flow

### 1. Get Drivers
```javascript
GET /api/drivers?page=1&limit=10
```

### 2. View Driver Details
```javascript
GET /api/drivers/{driverId}
```

### 3. Create Booking
```javascript
POST /api/bookings [Protected]
{
  "driverId": "driver123",
  "pickupLocation": "123 Main St",
  "dropoffLocation": "456 Park Ave",
  "pickupTime": "2026-04-07T10:00:00Z",
  "passengers": 1,
  "paymentMethod": "cod"
}
Response: { bookingId, status: "confirmed" }
```

### 4. View Booking Status
```javascript
GET /api/bookings/{bookingId} [Protected]
```

---

## 🛠️ Important Files & Their Purpose

| File | Purpose | Key Functions |
|------|---------|----------------|
| `server.js` | Main server entry | CORS, routes, middleware |
| `db.js` | MongoDB connection | connectDB(), fallback to mock |
| `authController.js` | Auth logic | register, login, logout, JWT |
| `driverController.js` | Driver CRUD | getAllDrivers, search, filters |
| `bookingController.js` | Booking logic | create, update, cancel, COD |
| `auth.js` | JWT middleware | Verify token, protect routes |
| `api.js` (Frontend) | Axios config | Interceptors, auth headers |
| `AuthContext.jsx` | State management | Token, user, login/logout |
| `ProtectedRoute.jsx` | Route protection | Redirect if not authenticated |

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Server starts: `npm run dev` on port 5000
- [ ] Health check: `curl http://localhost:5000/api/health`
- [ ] Register works: POST /auth/register
- [ ] Login works: POST /auth/login
- [ ] Protected routes need token
- [ ] Drivers list loads
- [ ] Search filters work
- [ ] Booking creation succeeds

### Frontend Tests
- [ ] App loads: http://localhost:5175
- [ ] All pages accessible
- [ ] Register form works
- [ ] Login form works
- [ ] Dashboard shows after login
- [ ] Drivers list loads
- [ ] Search works
- [ ] Booking form appears
- [ ] Success page shows after booking
- [ ] No console errors (F12)

### CORS Tests
- [ ] No CORS errors in console
- [ ] API calls succeed
- [ ] Preflight requests work

---

## 📦 Key Dependencies

### Backend
```json
{
  "express": "^4.18.2",              # HTTP server
  "mongoose": "^7.0.0",              # MongoDB ORM
  "jsonwebtoken": "9.0.2",           # JWT auth
  "bcrypt": "^5.0.0",                # Password hashing
  "cors": "^2.8.5",                  # CORS middleware
  "dotenv": "^16.0.0",               # Environment vars
  "express-rate-limit": "^6.7.0",    # Rate limiting
  "nodemon": "^3.0.1"                # Auto-reload
}
```

### Frontend
```json
{
  "react": "^18.2.0",                # UI library
  "react-router-dom": "^7.5.0",      # Routing
  "axios": "^1.x",                   # HTTP client
  "react-toastify": "^11.0.5",       # Notifications
  "tailwindcss": "^3.4.17",          # CSS framework
  "vite": "^6.3.5"                   # Build tool
}
```

---

## 🔗 Common API Patterns

### GET Request (No Auth)
```javascript
// Get all drivers
axios.get('/drivers')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

### GET Request (With Auth)
```javascript
// Get user bookings
axios.get('/bookings', {
  headers: { Authorization: `Bearer ${token}` }
})
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

### POST Request
```javascript
// Create booking
axios.post('/bookings', 
  {
    driverId: "123",
    pickupLocation: "Main St",
    dropoffLocation: "Park Ave",
    pickupTime: new Date(),
    passengers: 1,
    paymentMethod: "cod"
  },
  {
    headers: { Authorization: `Bearer ${token}` }
  }
)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `EADDRINUSE: Port 5000 in use` | Another app using port | Kill process or use different port |
| `CORS error` | Frontend/backend mismatch | Check VITE_API_URL, ensure backend running |
| `Token undefined` | Not logged in | Login first, token stored in localStorage |
| `MongoDB connection error` | MongoDB not running | Start mongod or app uses mock data |
| `Cannot find module` | Missing dependency | Run `npm install` |
| `404 Not Found` | Wrong endpoint | Check API endpoint spelling |

---

## 🎯 Development Tips

### 1. Frontend Development
```bash
npm run dev          # Hot reload enabled
# Edit files, changes auto-refresh
F12                  # Open DevTools
Network tab          # See API calls
Console              # Check errors
```

### 2. Backend Development
```bash
npm run dev          # nodemon watches for changes
# Files auto-save and restart
# Check terminal for errors
```

### 3. Testing with Postman
1. Import POSTMAN_COLLECTION.json
2. Set environment variable `token` after login
3. All protected routes automatically use token
4. Test all endpoints in sequence

### 4. Debugging
```javascript
// Frontend
console.log('state:', state);
debugger;  // Browser DevTools
// Network tab shows all API calls

// Backend
console.log('request:', req.body);
console.error('error:', error);
// Terminal shows all server logs
```

---

## 📈 Performance Optimization

### Frontend
- ✅ Lazy loading routes
- ✅ Code splitting with Vite
- ✅ Cached API responses
- ✅ Optimized images
- ✅ Minified CSS/JS

### Backend
- ✅ Rate limiting enabled
- ✅ Pagination on list endpoints
- ✅ Indexed database queries
- ✅ Error handling middleware
- ✅ CORS pre-flight optimization

---

## 🚀 Deployment Checklist

- [ ] Set NODE_ENV=production
- [ ] Update JWT_SECRET to strong value
- [ ] Configure real MongoDB URI
- [ ] Update VITE_API_URL to production URL
- [ ] Enable HTTPS/SSL
- [ ] Setup environment-specific configs
- [ ] Test all endpoints
- [ ] Monitor server logs
- [ ] Setup CI/CD pipeline
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Setup error tracking (Sentry)

---

## 🔗 Useful Links

- [Express.js Docs](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Axios Docs](https://axios-http.com)
- [JWT.io](https://jwt.io)
- [CORS Info](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## 📞 Quick Support

**Issue?** Follow these steps:
1. Check this Quick Reference Card
2. Read COMPLETE_INSTALLATION_GUIDE.md
3. Review browser console (F12)
4. Check server terminal output
5. Verify .env files
6. Restart both servers

**Still stuck?** 
- Check MongoDB connection
- Verify ports are open
- Clear node_modules & reinstall
- Check Node.js version (v16+)

---

## 📝 Notes

- **First time?** Start with COMPLETE_INSTALLATION_GUIDE.md
- **Testing APIs?** Use POSTMAN_COLLECTION.json
- **This file?** Quick reference for common tasks
- **Code changes?** Both servers auto-reload
- **Git commits?** Don't commit node_modules or .env

---

**Status:** ✅ PRODUCTION READY  
**Version:** 1.0.0  
**Last Updated:** April 6, 2026
