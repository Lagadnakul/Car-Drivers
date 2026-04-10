# API Connection Troubleshooting Guide

## Issue: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

This error means the frontend cannot connect to the backend API server.

### Root Causes

1. **Backend server is not running**
2. **Wrong port configuration**
3. **API URL misconfiguration**
4. **Firewall/Network issues**
5. **CORS configuration issues**

---

## Solution Steps

### Step 1: Verify Backend is Running

#### Check if port 5000 is in use:
```bash
netstat -ano | findstr :5000
```

If nothing shows up, the backend is NOT running.

#### Start the Backend:
```bash
cd backend
npm start
```

You should see:
```
Server Running on PORT 5000
```

---

### Step 2: Verify Environment Configuration

#### Check Frontend .env file:
```bash
# Should contain:
VITE_API_URL=http://localhost:5000/api
```

Location: `frontend/.env`

#### Check Backend .env file:
```bash
# Should contain:
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
```

Location: `backend/.env`

---

### Step 3: Verify API Configuration

#### Frontend API Config:
Check `frontend/src/services/api.js`

```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

---

### Step 4: Test Connection Manually

#### Using Browser Developer Tools:

1. Open DevTools (F12)
2. Go to Console tab
3. Run this command:

```javascript
fetch('http://localhost:5000/api/drivers')
  .then(res => res.json())
  .then(data => console.log('Success!', data))
  .catch(err => console.error('Error:', err));
```

If this works, frontend-backend connection is OK.

#### Using PowerShell:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/drivers" -Method Get
```

If this works, the API is responding.

---

### Step 5: Check CORS Configuration

Backend CORS should allow frontend origin:

#### File: `backend/server.js`

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000'],
  credentials: true
}));
```

This should include port 5173 (frontend) and 5174 (admin).

---

### Step 6: Verify Database Connection

Check MongoDB connection is working:

#### Run test script:
```bash
cd backend
node test-server.js
```

You should see:
```
Connected to MongoDB
```

---

## Quick Fix Checklist

- [ ] Backend server is running on port 5000
- [ ] Frontend .env has `VITE_API_URL=http://localhost:5000/api`
- [ ] Backend .env has `PORT=5000`
- [ ] MongoDB connection is working
- [ ] CORS is configured to allow `http://localhost:5173`
- [ ] No firewall blocking port 5000
- [ ] Frontend is on port 5173
- [ ] Admin is on port 5174

---

## Common Errors & Solutions

### Error: "Cannot connect to MongoDB"
**Solution:** 
- Check MongoDB URI in `.env`
- Ensure internet connection (for MongoDB Atlas)
- Check IP whitelist in MongoDB Atlas

### Error: "Port 5000 already in use"
**Solution:**
- Find process using port 5000: `netstat -ano | findstr :5000`
- Kill it: `taskkill /PID <PID> /F`
- Or change port in `backend/.env`

### Error: "CORS error"
**Solution:**
- Add frontend URL to CORS whitelist in `backend/server.js`
- Ensure `withCredentials: true` in both frontend and backend

### Error: "404 Not Found on /api/drivers"
**Solution:**
- Check route exists: `backend/routes/driverRoutes.js`
- Check route is registered: `backend/server.js`
- Verify correct API path in frontend

---

## Automatic Startup Script

Use the provided startup script to start all services:

```bash
START_SERVICES.bat
```

This will:
1. Install missing dependencies
2. Start backend on port 5000
3. Start frontend on port 5173
4. Start admin on port 5174

---

## Network Testing

### Test Backend Connectivity:

```bash
# Using curl (if installed)
curl http://localhost:5000/api/drivers

# Using PowerShell
(Invoke-WebRequest -Uri "http://localhost:5000/api/drivers").Content
```

### Check Services Status:

```bash
# Check if all ports are listening
netstat -ano | findstr ":5000\|:5173\|:5174"
```

---

## Reset Everything

If nothing works, try a clean restart:

```bash
# Stop all services
taskkill /F /IM node.exe

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install

# Restart services
START_SERVICES.bat
```

---

## Additional Resources

- Backend API Docs: `backend/README.md`
- Frontend Setup: `frontend/README.md`
- Admin Setup: `admin/README.md`
- Main Setup Guide: `COMPLETE_SETUP_GUIDE.md`

For more help, check the console logs in each terminal window.
