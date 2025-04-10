import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import userRoutes from './routes/userRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

// Load env vars
dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// Get directory name (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Static folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// DB connection
connectDB();

// API routes
app.get("/", (req, res) => {
    res.send("Car Driver API is Working");
});

app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/bookings', bookingRoutes);

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Run express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});