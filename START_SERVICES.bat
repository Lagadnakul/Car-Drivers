@echo off
REM Comprehensive Development Environment Startup Script
REM This script starts all required services for the Car Driver application

setlocal enabledelayedexpansion
cd /d "d:\VS CODE\Car Driver"

echo.
echo ============================================
echo Car Driver - Development Environment
echo ============================================
echo.

REM Check if Node modules are installed
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

if not exist "admin\node_modules" (
    echo Installing admin dependencies...
    cd admin
    call npm install
    cd ..
)

echo.
echo ============================================
echo Starting Services...
echo ============================================
echo.

REM Start Backend Server in new window
echo [1/3] Starting Backend Server on http://localhost:5000
cd /d "d:\VS CODE\Car Driver\backend"
start "Backend - Port 5000" cmd /k "npm start"

REM Wait for backend to initialize
timeout /t 5 /nobreak

REM Start Frontend Dev Server in new window
echo [2/3] Starting Frontend on http://localhost:5173
cd /d "d:\VS CODE\Car Driver\frontend"
start "Frontend - Port 5173" cmd /k "npm run dev"

REM Wait a moment
timeout /t 3 /nobreak

REM Start Admin Dev Server in new window
echo [3/3] Starting Admin Dashboard on http://localhost:5174
cd /d "d:\VS CODE\Car Driver\admin"
start "Admin - Port 5174" cmd /k "npm run dev"

REM Return to project root and show summary
cd /d "d:\VS CODE\Car Driver"
echo.
echo ============================================
echo All Services Started Successfully!
echo ============================================
echo.
echo Access your applications at:
echo   Frontend:     http://localhost:5173
echo   Admin Panel:  http://localhost:5174
echo   Backend API:  http://localhost:5000/api
echo.
echo Default Credentials (if needed):
echo   Admin Email:    admin@cardriver.com
echo   Admin Password: password123
echo.
echo Press any key to close this window...
pause > nul
