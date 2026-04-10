# 🔧 BACKEND SETUP FIX - Manual Installation Guide

**Issue:** jsonwebtoken version not found in npm registry

**Status:** We'll fix this step by step

---

## ✅ SOLUTION: Use Stable Version of jsonwebtoken

### Step 1: Update package.json with Stable Versions

Open: `d:\VS CODE\Car Driver\backend\package.json`

Replace the `dependencies` section with this:

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
    "axios": "^1.6.0",
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.5",
    "jsonwebtoken": "9.0.2",
    "mongoose": "^7.5.0",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

### Step 2: Delete Old node_modules (Using CMD, not PowerShell)

Open **Command Prompt (cmd.exe)** as Administrator and run:

```cmd
cd /d "d:\VS CODE\Car Driver\backend"
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
```

---

### Step 3: Clear npm Cache

```cmd
npm cache clean --force
```

---

### Step 4: Install Dependencies

```cmd
npm install
```

This will take 2-3 minutes. Wait for completion.

---

### Step 5: Verify Installation

```cmd
npm list
```

Should show all packages installed without errors.

---

## 🚀 If Step 4 Still Fails:

Try this alternative:

```cmd
npm install --no-optional
```

Or manually install each package:

```cmd
npm install express cors dotenv mongoose bcrypt cookie-parser multer express-rate-limit nodemon
npm install jsonwebtoken@9.0.2
```

---

## ✅ After Installation Success:

### Test Backend

```cmd
npm run dev
```

Expected output:
```
Registering routes...
✅ All routes registered
🚀 Server Running on PORT 5000
```

---

## 🐛 If You Still Get Port Error:

Open PowerShell as Administrator:

```powershell
Get-Process node
```

Then close any open Node terminals, or use CMD to kill the process:

```cmd
taskkill /F /IM node.exe
```

Then restart:

```cmd
npm run dev
```

---

## 📋 Complete Commands (Copy-Paste Ready for CMD)

```cmd
cd /d "d:\VS CODE\Car Driver\backend"
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

**If this still doesn't work, share your error message and I'll provide an alternative solution!**
