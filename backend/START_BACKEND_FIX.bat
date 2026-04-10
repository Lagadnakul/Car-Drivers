@echo off
REM Backend Server Startup Script with Memory Fix
REM This script starts the backend server with increased memory allocation

setlocal enabledelayedexpansion
cd /d "d:\VS CODE\Car Driver\backend"

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║          Backend Server Startup - With Memory Fix             ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ npm install failed
        pause
        exit /b 1
    )
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo Starting Backend Server...
echo ═══════════════════════════════════════════════════════════════
echo.

REM Set Node.js memory limit
set NODE_OPTIONS=--max-old-space-size=4096

REM Start the server
echo Listening on Port 5000...
echo Press Ctrl+C to stop the server
echo.

call npm start

echo.
echo Server stopped.
pause
