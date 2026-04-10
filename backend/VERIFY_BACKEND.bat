@echo off
REM ============================================
REM Backend Verification Script
REM ============================================

setlocal enabledelayedexpansion

echo.
echo ===============================================
echo  Car Driver Backend - Startup Verification
echo ===============================================
echo.

REM Kill existing node processes
echo [1/4] Cleaning up existing processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo      ✓ Killed existing Node processes
) else (
    echo      ✓ No existing processes
)

REM Verify npm packages
echo.
echo [2/4] Verifying npm packages...
cd /d "%~dp0"
call npm list jsonwebtoken bcrypt express cors >nul 2>&1
if %errorlevel% equ 0 (
    echo      ✓ All critical packages installed
) else (
    echo      ✗ Missing packages - installing...
    call npm install >nul 2>&1
)

REM Start backend server
echo.
echo [3/4] Starting backend server on port 5000...
start "Backend Server" /MIN cmd /k "node server.js"

REM Wait for server to start
timeout /t 3 /nobreak >nul

REM Test health endpoint
echo.
echo [4/4] Testing server health...
call curl -s http://localhost:5000/api/health >nul 2>&1

if %errorlevel% equ 0 (
    echo      ✓ Server is responding
    echo.
    echo ===============================================
    echo  ✅ Backend Server Started Successfully!
    echo ===============================================
    echo.
    echo Server: http://localhost:5000
    echo Health: http://localhost:5000/api/health
    echo.
    echo Routes Available:
    echo   POST   /api/auth/register
    echo   POST   /api/auth/login
    echo   POST   /api/auth/logout (protected)
    echo   GET    /api/auth/me (protected)
    echo   GET    /api/drivers
    echo   GET    /api/drivers/search
    echo   GET    /api/drivers/:id
    echo   POST   /api/bookings (protected)
    echo.
) else (
    echo      ✗ Server not responding
    echo.
    echo ===============================================
    echo  ⚠️  Backend Server Issues
    echo ===============================================
    echo.
    echo Please check:
    echo 1. Port 5000 is available
    echo 2. MongoDB is running
    echo 3. .env file is configured
    echo.
)

pause
