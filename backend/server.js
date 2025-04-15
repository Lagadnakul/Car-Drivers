import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import imageKitRoutes from './routes/imagekit.js';
import fs from 'fs';

// Load env vars
dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Get directory name (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT: Apply middleware BEFORE routes
// Middleware
app.use(express.json());  // This must come before routes to parse JSON bodies
app.use(cors());

// Debug middleware - must be after body parsers
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    if (req.method === 'POST') {
      console.log('Body:', req.body);
      console.log('Files:', req.files);
      console.log('Headers:', req.headers);
    }
    next();
});

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API routes
app.get("/", (req, res) => {
    res.send("Car Driver API is Working");
});

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/imagekit', imageKitRoutes);
app.use((req, res, next) => {
  console.log(`Route requested: ${req.method} ${req.originalUrl}`);
  next();
});


// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// DB connection
connectDB();

// Run express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});