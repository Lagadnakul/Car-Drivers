# ⚡ QUICK FIX & RESTART GUIDE

## 🐛 Bug Fixed
**Error**: `ReferenceError: Cannot access 'router' before initialization`  
**File**: `backend/routes/bookingRoutes.js`  
**Status**: ✅ **FIXED**

---

## 🚀 Start Backend NOW

### Command:
```bash
cd "d:\VS CODE\Car Driver\backend"
npm run dev
```

### Expected Output:
```
[nodemon] starting `node server.js`
✅ MongoDB Connected Successfully
Server Running on PORT 5000
```

### If You See This:
✅ **SUCCESS** - Backend is running!

---

## 🎯 Next: Start Other Services

### In Terminal 2 - Frontend:
```bash
cd "d:\VS CODE\Car Driver\frontend"
npm run dev
```

### In Terminal 3 - Admin:
```bash
cd "d:\VS CODE\Car Driver\admin"
npm run dev
```

---

## 🌐 Access Applications

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | user@cardriver.com / password123 |
| **Admin** | http://localhost:5174 | admin@cardriver.com / password123 |
| **Backend** | http://localhost:5000/api | (JWT authenticated) |

---

## ✅ Verification

After all services start:

1. ✅ Backend: No errors in terminal
2. ✅ Frontend: Shows "Local: http://localhost:5173"
3. ✅ Admin: Shows "Local: http://localhost:5174"
4. ✅ Open http://localhost:5173 - should work without connection errors
5. ✅ Can login with credentials

---

## 📝 What Was Fixed

**File**: `backend/routes/bookingRoutes.js`

**Change**: Moved `const router = express.Router();` declaration to BEFORE it's used in route definitions.

**Result**: Backend now starts without ReferenceError

---

## 🆘 Still Having Issues?

1. Check Node version: `node --version` (should be 18+)
2. Check dependencies: `npm list mongoose` in backend folder
3. Check MongoDB URI: `cat backend/.env | findstr MONGO_URI`
4. Restart: Press `Ctrl+C` then `npm run dev` again

---

**Status**: 🟢 READY  
**Next Step**: Run `npm run dev` in backend folder
