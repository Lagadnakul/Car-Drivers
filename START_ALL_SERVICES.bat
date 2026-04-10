@echo off
REM Start Backend Server
cd /d "d:\VS CODE\Car Driver\backend"
echo Starting Backend Server on port 5000...
start "Backend Server" npm start

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend Dev Server  
cd /d "d:\VS CODE\Car Driver\frontend"
echo Starting Frontend Dev Server on port 5173...
start "Frontend Server" npm run dev

REM Start Admin Dev Server
cd /d "d:\VS CODE\Car Driver\admin"
echo Starting Admin Dev Server on port 5174...
start "Admin Server" npm run dev

REM Return to project root
cd /d "d:\VS CODE\Car Driver"
echo.
echo ============================================
echo All services are starting...
echo ============================================
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin:    http://localhost:5174
echo ============================================
echo.
echo Press any key to continue...
pause > nul
