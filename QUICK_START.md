# 🚀 Quick Start Guide - Car Driver Application

## The Problem You're Facing

You're getting this error:
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
:5000/api/drivers:1
```

**This means**: The backend API on port 5000 is not running or not responding.

---

## 🔧 Solution: Start the Backend Server

### Step 1: Open Command Prompt

Press `Win + R`, type `cmd`, and press Enter.

### Step 2: Navigate to Backend

```bash
cd "d:\VS CODE\Car Driver\backend"
```

### Step 3: Start the Server

```bash
npm start
```

### Expected Output

You should see something like:
```
Server Running on PORT 5000
```

**If you see an error**, see the "Troubleshooting" section below.

---

## 🌐 Start Frontend (in another Command Prompt window)

### Step 1: Open New Command Prompt

Press `Win + R`, type `cmd`, and press Enter again.

### Step 2: Navigate to Frontend

```bash
cd "d:\VS CODE\Car Driver\frontend"
```

### Step 3: Start Frontend

```bash
npm run dev
```

### Expected Output

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 📂 Start Admin (in another Command Prompt window)

### Step 1: Open New Command Prompt

Press `Win + R`, type `cmd`, and press Enter again.

### Step 2: Navigate to Admin

```bash
cd "d:\VS CODE\Car Driver\admin"
```

### Step 3: Start Admin

```bash
npm run dev
```

---

## 🎯 Access the Applications

Once all three services are running:

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173 | Main user application |
| Admin | http://localhost:5174 | Admin dashboard |
| Backend API | http://localhost:5000 | API server (not accessed directly) |

---

## ❌ Troubleshooting

### Problem: "npm: command not found"

**Solution**: Install Node.js from https://nodejs.org

### Problem: "Port 5000 already in use"

**Solution**: Kill the process using port 5000

```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (replace 12345 with the actual PID)
taskkill /PID 12345 /F
```

### Problem: "npm install fails"

**Solution**: Clear cache and reinstall

```bash
npm cache clean --force
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### Problem: "Cannot find module" errors

**Solution**: Make sure dependencies are installed

```bash
npm install
```

Run this in each directory (backend, frontend, admin).

### Problem: "MongoDB connection error"

**Solution**: Check the database connection

1. Open `backend/.env`
2. Verify `MONGO_URI` is correct
3. If using MongoDB Atlas:
   - Check your IP is whitelisted
   - Check username and password are correct
   - Check database name is correct

### Problem: Still getting ERR_CONNECTION_REFUSED?

**Checklist**:
- [ ] Backend is running (`npm start` in backend folder)
- [ ] You see "Server Running on PORT 5000" message
- [ ] Port 5000 is not blocked by firewall
- [ ] Frontend .env has `VITE_API_URL=http://localhost:5000/api`

---

## ✅ How to Know It's Working

### Backend is Working
Open this in your browser:
```
http://localhost:5000/api/drivers
```

You should see JSON data, not an error.

### Frontend is Working
Open this in your browser:
```
http://localhost:5173
```

You should see the Car Driver application homepage.

### API Connection is Working
1. Go to http://localhost:5173
2. Open DevTools (F12)
3. Go to Network tab
4. Browse to a driver page
5. Look for API calls - they should be green (successful), not red (failed)

---

## 📋 Default Login Credentials

### Admin Account
- **Email**: admin@cardriver.com
- **Password**: admin123

### Test User
- **Email**: user@cardriver.com
- **Password**: user123

---

## 🎓 Understanding the Architecture

```
Your Computer (Windows)
├── Backend Server (Port 5000)
│   ├── Handles API requests
│   ├── Connects to MongoDB
│   └── Manages data
│
├── Frontend (Port 5173)
│   ├── React application
│   ├── User interface
│   └── Sends requests to Backend
│
└── Admin Panel (Port 5174)
    ├── Admin interface
    ├── React application
    └── Sends requests to Backend
```

---

## 🆘 Still Having Issues?

1. **Check the detailed guides**:
   - `API_CONNECTION_TROUBLESHOOTING.md` - For connection issues
   - `COMPLETE_SETUP_GUIDE.md` - For complete setup
   - `BUILD_FIX_REPORT.md` - For build errors

2. **Check console output**:
   - Look at error messages in the terminal
   - Copy and paste the error into the troubleshooting guide

3. **Restart everything**:
   - Close all Command Prompt windows
   - Close any node.js processes
   - Start fresh

---

## 💡 Pro Tips

### Tip 1: Keep Terminals Open
Don't close the command prompt windows while developing. You need all three running:
- One for backend
- One for frontend
- One for admin

### Tip 2: Watch Console Output
Check the terminal windows for error messages. They'll tell you what's wrong.

### Tip 3: Clear Browser Cache
If something looks weird:
1. Press `Ctrl + Shift + Delete` in your browser
2. Clear cache and cookies
3. Reload the page

### Tip 4: Hard Refresh
Press `Ctrl + Shift + R` to refresh without cache.

---

## 📞 What to Do Next

1. ✅ Start all three services (backend, frontend, admin)
2. ✅ Open http://localhost:5173 in your browser
3. ✅ Test the application
4. ✅ When ready, deploy to Vercel

---

**Last Updated**: April 6, 2026

**Status**: 🟢 Ready to Use
