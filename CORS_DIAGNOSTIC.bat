@echo off
REM Diagnostic script to test CORS and API connectivity
REM Run this after starting the backend server

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         Car Driver MERN - CORS & API Diagnostic Tool          ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Test 1: Health check
echo [1] Testing backend health check...
echo.
curl -X GET http://localhost:5000/api/health -H "Content-Type: application/json"
echo.
echo.

REM Test 2: Register endpoint (CORS preflight)
echo [2] Testing CORS preflight on register endpoint...
echo.
curl -X OPTIONS http://localhost:5000/api/auth/register ^
  -H "Origin: http://localhost:5173" ^
  -H "Access-Control-Request-Method: POST" ^
  -H "Access-Control-Request-Headers: Content-Type" ^
  -v
echo.
echo.

REM Test 3: Get drivers
echo [3] Testing get drivers endpoint...
echo.
curl -X GET http://localhost:5000/api/drivers ^
  -H "Content-Type: application/json"
echo.
echo.

echo ╔════════════════════════════════════════════════════════════════╗
echo ║                    Diagnostic Complete                         ║
echo ║                                                                ║
echo ║ If all tests above show 200 status, the backend is working!   ║
echo ║ If you still see CORS errors in browser, try:                ║
echo ║  1. Clear browser cache (Ctrl+Shift+Delete)                  ║
echo ║  2. Close and reopen the browser                             ║
echo ║  3. Check DevTools Network tab for CORS headers              ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
pause
