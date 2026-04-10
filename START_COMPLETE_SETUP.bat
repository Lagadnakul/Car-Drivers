@echo off
REM Car Driver MERN Stack - Complete Startup Script (Final Version)
REM This script starts both the backend and frontend servers

setlocal enabledelayedexpansion
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║     🚗 Car Driver MERN Stack - Complete Startup v2 🚗        ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if node is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo ❌ ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed
node --version
npm --version
echo.

REM Create separate terminal windows for backend and frontend

echo ╔════════════════════════════════════════════════════════════════╗
echo ║ Starting Backend Server (Port 5000)                           ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd /d "backend"
if not exist "node_modules" (
    echo 📦 Installing backend dependencies...
    call npm install
)

echo 🚀 Starting backend server...
start cmd /k "title Backend Server && npm start"

timeout /t 3 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║ Starting Frontend Server (Port 5173)                          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

cd /d "..\frontend"
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    call npm install
)

echo 🚀 Starting frontend server...
start cmd /k "title Frontend Server && npm run dev"

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║ ✅ Servers Starting...                                         ║
echo ║                                                                ║
echo ║ Backend:  http://localhost:5000                              ║
echo ║ Frontend: http://localhost:5173                              ║
echo ║ API:      http://localhost:5000/api                          ║
echo ║                                                                ║
echo ║ 📌 Important Requirements:                                   ║
echo ║ • MongoDB must be running on localhost:27017                ║
echo ║ • Check .env files for correct configuration               ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Waiting for servers to start (this may take a minute)...
echo.

timeout /t 5 /nobreak

start http://localhost:5173

echo.
echo 🎉 All servers started! Opening frontend in browser...
echo Check the backend and frontend terminal windows for any errors.
echo.
pause
