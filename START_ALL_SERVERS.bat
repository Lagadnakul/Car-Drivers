@echo off
REM Car Driver MERN Stack - Full Application Startup (Windows)
REM This batch file starts both backend and frontend servers in separate windows

echo.
echo ===================================================
echo     CAR DRIVER MERN STACK - STARTUP SCRIPT
echo ===================================================
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo Error: backend directory not found
    pause
    exit /b 1
)

REM Check if frontend directory exists
if not exist "frontend" (
    echo Error: frontend directory not found
    pause
    exit /b 1
)

echo Starting servers...
echo.

REM Start backend in new window
echo [1/2] Starting Backend Server (Port 5000)...
start "Car Driver Backend" cmd /k "cd backend && npm start"
echo.

REM Wait 3 seconds before starting frontend
timeout /t 3 /nobreak

REM Start frontend in new window
echo [2/2] Starting Frontend Server (Port 5175)...
start "Car Driver Frontend" cmd /k "cd frontend && npm run dev"
echo.

REM Summary
echo ===================================================
echo     SERVERS STARTED SUCCESSFULLY!
echo ===================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5175
echo.
echo Test Health: curl http://localhost:5000/api/health
echo.
echo Two terminal windows should have opened.
echo Keep them open while testing the application.
echo.
echo ===================================================
echo Press any key to continue...
echo ===================================================
pause
