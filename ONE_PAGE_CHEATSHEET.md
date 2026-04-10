# 🚀 QUICK START - ONE PAGE CHEATSHEET

## ⚡ 5-Minute Setup

```bash
# Terminal 1: Backend
cd backend && npm install && npm start
# ✅ Backend running at http://localhost:5000

# Terminal 2: Frontend  
cd frontend && npm install && npm run dev
# ✅ Frontend running at http://localhost:5173

# Browser
Open: http://localhost:5173
```

---

## 🧪 Quick Test Flow

```
1. REGISTER
   → Click "Register"
   → Fill form (Name, Email, Phone, Password)
   → Click Submit
   → Redirected to Login

2. LOGIN
   → Enter Email & Password
   → Click Login
   → Token saved to localStorage
   → Redirected to Home (logged in)

3. VIEW DRIVERS
   → Click "Available Pilots" or "Drivers"
   → See driver list
   → Click driver card

4. BOOK DRIVER
   → Fill booking form (Date, Time, Location)
   → Click "Book Now"
   → See confirmation page

5. LOGOUT
   → Click Logout in navbar
   → Redirected to home
```

---

## 📍 Key URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| API Base | http://localhost:5000/api |
| Database | mongodb://localhost:27017 |

---

## 🔗 API Endpoints

```
# Auth (No token required)
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout

# Drivers (No token required)
GET    /api/drivers
GET    /api/drivers/:id
GET    /api/drivers/available

# Bookings (Token required)
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
PATCH  /api/bookings/:id/cancel
```

---

## ⚙️ Configuration

### Backend .env
```properties
PORT=5000
MONGO_URI=mongodb://localhost:27017/cardriver
JWT_SECRET=wdcefbrgnthmyjukilop
NODE_ENV=development
```

### Frontend .env
```properties
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🐛 Troubleshooting (Quick Fixes)

| Problem | Solution |
|---------|----------|
| Backend won't start | Check port 5000, start MongoDB |
| Can't connect frontend | Check VITE_API_URL, backend running |
| Login fails | Check credentials, clear localStorage |
| Booking fails | Check user logged in, check driver exists |

---

## 📂 Key Files

```
backend/server.js              Main server
backend/.env                   Backend config
backend/routes/authRoutes.js  Auth endpoints
backend/controllers/           Business logic

frontend/src/App.jsx          Main frontend
frontend/.env                 Frontend config
frontend/src/services/api.js  API client
frontend/src/context/         State management
```

---

## 💾 Database

```
Collections:
- users          (accounts)
- drivers        (driver profiles)
- bookings       (reservations)
```

---

## 🔐 Security

✅ JWT Tokens  
✅ Password Hashing  
✅ Rate Limiting (5 auth attempts/15min)  
✅ CORS Protection  
✅ Input Validation  

---

## 📊 Tech Stack

Frontend: React 18 + Vite + TailwindCSS  
Backend: Node.js + Express  
Database: MongoDB  
Auth: JWT + bcrypt  

---

## 📖 Full Docs

- **5-min setup**: QUICK_START_GUIDE.md
- **Complete system**: FINAL_INTEGRATION_COMPLETE.md
- **Testing**: COMPLETE_TESTING_GUIDE.md
- **Status**: PROJECT_STATUS_REPORT.md
- **Index**: MASTER_DOCUMENTATION_INDEX.md

---

## ✅ Pre-Flight Checklist

- [ ] Node.js v16+ installed
- [ ] MongoDB running
- [ ] Port 5000 available
- [ ] Port 5173 available
- [ ] npm install completed (both)
- [ ] .env files configured

---

## 🎯 Session Status: ✅ COMPLETE

**Backend**: Production Ready ✅  
**Frontend**: Production Ready ✅  
**Database**: Configured ✅  
**Documentation**: Complete ✅  
**Testing**: Ready ✅  

---

## 🚀 Next Step

Run the application and test the complete flow!

```bash
# Start backend, then frontend, then open browser
http://localhost:5173
```

---

**Last Updated**: April 6, 2026  
**Status**: 🟢 Production Ready
