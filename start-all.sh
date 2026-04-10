#!/bin/bash

# Car Driver MERN Stack - Full Application Startup
# This script starts both backend and frontend servers

echo "🚀 Starting Car Driver Application..."
echo ""

# Check if both directories exist
if [ ! -d "backend" ]; then
    echo "❌ Error: backend directory not found"
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found"
    exit 1
fi

# Start backend in background
echo "📦 Starting Backend Server (Port 5000)..."
cd backend
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
sleep 3
cd ..

# Start frontend in background
echo ""
echo "⚛️  Starting Frontend Server (Port 5175)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
cd ..

# Summary
echo ""
echo "═══════════════════════════════════════════════════════"
echo "🎉 Both servers are now running!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📍 Backend:  http://localhost:5000"
echo "📍 Frontend: http://localhost:5175"
echo ""
echo "🧪 Test Health: curl http://localhost:5000/api/health"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
wait
