@echo off
echo ========================================
echo   Starting Complete Car Driver Server
echo ========================================
echo.
echo Server Features:
echo - User Registration and Login
echo - Driver Management  
echo - Booking System
echo - Authentication with JWT
echo.
echo Demo Accounts:
echo User: user@example.com / password123
echo Driver: driver@example.com / password123
echo.
echo Starting server on port 4000...
echo.

cd /d "d:\VS CODE\Car Driver\backend"
node test-server.js

echo.
echo Server stopped. Press any key to exit...
pause > nul
