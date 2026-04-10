# 🎯 COMPLETE BACKEND INSTALLATION & STARTUP FIX

**Problem:** npm install failing with jsonwebtoken version error

**Solution:** Use stable versions and proper installation steps

---

## 📋 STEP-BY-STEP INSTALLATION (Use CMD, Not PowerShell)

### **STEP 1: Open Command Prompt as Administrator**

Press: `Win + X` → Select **"Command Prompt (Admin)"**

---

### **STEP 2: Navigate to Backend Folder**

```cmd
cd /d "d:\VS CODE\Car Driver\backend"
```

**Verify you see:**
```
d:\VS CODE\Car Driver\backend>
```

---

### **STEP 3: Delete Old Installation**

```cmd
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
cls
```

---

### **STEP 4: Clear npm Cache**

```cmd
npm cache clean --force
npm cache verify
```

---

### **STEP 5: Update package.json**

The current package.json has jsonwebtoken@^9.1.2 which doesn't exist.

**Open:** `d:\VS CODE\Car Driver\backend\package.json`

**Replace the entire file with:**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcrypt": "^5.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "express-rate-limit": "^6.7.0",
    "jsonwebtoken": "9.0.2",
    "mongoose": "^7.0.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**Save the file** (Ctrl+S)

---

### **STEP 6: Install All Dependencies**

```cmd
npm install
```

⏱️ **Wait 3-5 minutes** for installation to complete

Expected output:
```
added XXX packages in X.XXs
```

---

### **STEP 7: Verify Installation**

```cmd
npm list
```

Should show: `backend@1.0.0` with all packages listed

---

### **STEP 8: Start Backend Server**

```cmd
npm run dev
```

**Expected Output:**
```
Registering routes...
✅ All routes registered
🚀 Server Running on PORT 5000
```

---

## ✅ TESTING BACKEND IS RUNNING

Open a **new Command Prompt** and run:

```cmd
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{"success":true,"message":"Server is running"}
```

---

## 🔴 TROUBLESHOOTING

### **Error: "Port 5000 already in use"**

```cmd
netstat -ano | findstr :5000
```

See the PID (number on right). Then kill it:

```cmd
taskkill /PID 12345 /F
```

Then restart:
```cmd
npm run dev
```

---

### **Error: "npm install still fails"**

Try with legacy peer deps:

```cmd
npm install --legacy-peer-deps
```

---

### **Error: "Module not found"**

Run:

```cmd
npm install
npm dedupe
npm audit fix
```

---

### **Mongoose Warning about duplicate index**

This is just a warning, not an error. Ignore it for now.

---

## 📝 FINAL VERIFICATION CHECKLIST

- [ ] Command Prompt open as Administrator
- [ ] Navigated to `d:\VS CODE\Car Driver\backend`
- [ ] Deleted node_modules and package-lock.json
- [ ] Ran `npm cache clean --force`
- [ ] Updated package.json with correct versions
- [ ] Ran `npm install` successfully (no errors)
- [ ] Ran `npm list` shows all packages
- [ ] Ran `npm run dev` shows server running on 5000
- [ ] `curl http://localhost:5000/api/health` returns success

---

## 🚀 NEXT: START FRONTEND

Once backend is running, open another Command Prompt:

```cmd
cd /d "d:\VS CODE\Car Driver\frontend"
npm install
npm run dev
```

Expected:
```
➜ Local: http://localhost:5175/
```

---

## 📊 COMPLETE COMMAND SEQUENCE (Copy-Paste All at Once)

```cmd
cd /d "d:\VS CODE\Car Driver\backend"
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

**If it works → You'll see "🚀 Server Running on PORT 5000"**

**If it fails → Share the exact error message and I'll fix it!**

Let me know when backend is running! 🎯
