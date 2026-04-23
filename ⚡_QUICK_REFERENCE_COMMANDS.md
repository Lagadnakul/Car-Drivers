# ⚡ QUICK REFERENCE CARD - Essential Commands

## 🚀 START EVERYTHING IN 2 COMMANDS

### Terminal 1 - Backend
```bash
cd "d:\VS CODE\Car Driver\backend"
npm run dev
```

### Terminal 2 - Frontend  
```bash
cd "d:\VS CODE\Car Driver\frontend"
npm run dev
```

**Then open:** http://localhost:5175

---

## 🔧 COMMON ISSUES & FIXES

### Port Already in Use
```bash
# Windows: Find and kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or restart both servers
```

### Dependencies Not Installed
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### MongoDB Connection Issue
- ✅ Backend continues with mock data
- ✅ Bookings will process
- ✅ Check `.env` file for correct `MONGO_URI`

### CORS Errors
- ✅ Already fixed in `frontend/src/services/api.js`
- ✅ `withCredentials: true` is set
- ✅ No changes needed

---

## 📍 KEY FILE LOCATIONS

| Purpose | File | Status |
|---------|------|--------|
| Backend Config | `backend/.env` | ✅ Ready |
| Frontend Config | `frontend/.env` | ✅ Ready |
| CORS Settings | `backend/server.js` | ✅ Configured |
| Booking API | `backend/controllers/bookingController.js` | ✅ Fixed |
| Booking Model | `backend/models/Booking.js` | ✅ Fixed |
| API Service | `frontend/src/services/api.js` | ✅ Fixed |
| Success Page | `frontend/src/pages/BookingSuccess.jsx` | ✅ Created |

---

## ✅ VERIFICATION CHECKLIST

### Backend Running ✅
- [ ] Terminal shows "Server running on http://localhost:5000"
- [ ] No red error messages
- [ ] Database message shows (success or mock data)

### Frontend Running ✅
- [ ] Terminal shows "Local: http://localhost:5175"
- [ ] Browser page loads
- [ ] Console clear of red errors

### Booking Flow ✅
1. Register → Success
2. Login → Success
3. Browse Drivers → Shows list
4. Book Driver → Animated confirmation
5. Details Visible → All info displayed

---

## 🎯 SUCCESS INDICATORS

**Backend Console Should Show:**
```
✅ 📍 Database: carDriver-1
✅ 🔗 Server running on http://localhost:5000
✅ ✨ All routes registered
```

**Frontend Console Should Show:**
```
✅ 🔗 API Base URL: http://localhost:5000/api
```

**Network Tab Should Show:**
```
✅ POST /api/auth/register - 201
✅ POST /api/auth/login - 200
✅ GET /api/drivers - 200
✅ POST /api/bookings - 201
```

---

## 🆘 IF SOMETHING BREAKS

1. **Check console** (F12) for error messages
2. **Restart both servers** (Ctrl+C, then npm run dev)
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Check .env files** for correct URLs and ports
5. **Verify MongoDB** is accessible (or running in mock mode)

---

## 📊 URL REFERENCE

| URL | Purpose |
|-----|---------|
| `http://localhost:5000` | Backend API root |
| `http://localhost:5000/api/health` | Backend health check |
| `http://localhost:5175` | Frontend app |
| `http://localhost:5175/register` | Registration page |
| `http://localhost:5175/login` | Login page |
| `http://localhost:5175/drivers` | Driver list |
| `http://localhost:5175/booking/success` | Booking confirmation |

---

**Time to test:** 5-10 minutes  
**Expected success rate:** 95%+  
**Questions?** Check `MASTER_DOCUMENTATION_INDEX.md`
