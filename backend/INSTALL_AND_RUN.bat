@echo off
REM Backend Installation and Startup Script
REM This script will clean install and start the backend server

echo ========================================
echo Car Driver - Backend Setup and Start
echo ========================================
echo.

REM Navigate to backend folder
cd /d "d:\VS CODE\Car Driver\backend"
echo ✓ In backend folder

REM Delete old node_modules
if exist node_modules (
  echo.
  echo Removing old node_modules...
  rmdir /s /q node_modules
  echo ✓ Removed old node_modules
)

REM Delete old package-lock.json
if exist package-lock.json (
  echo Removing old package-lock.json...
  del package-lock.json
  echo ✓ Removed package-lock.json
)

REM Clear npm cache
echo.
echo Clearing npm cache...
npm cache clean --force
echo ✓ Cache cleared

REM Install dependencies
echo.
echo Installing dependencies... (This may take 3-5 minutes)
echo.
npm install

if %ERRORLEVEL% NEQ 0 (
  echo.
  echo ERROR: Installation failed!
  echo Try running: npm install --legacy-peer-deps
  pause
  exit /b 1
)

echo.
echo ========================================
echo ✅ Installation Complete!
echo ========================================
echo.

REM Start the server
echo Starting backend server...
echo.
npm run dev

pause
