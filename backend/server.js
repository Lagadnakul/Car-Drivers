import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Middleware
import errorHandler from "./middleware/error.js";

dotenv.config();

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🚀 START SERVER (continue even if DB fails)
const startServer = async () => {
  try {
    let dbConnected = false;
    try {
      const dbConnection = await connectDB();
      dbConnected = !!dbConnection;
    } catch (dbError) {
      console.warn("⚠️  Database connection failed, continuing without DB...");
      dbConnected = false;
    }

    // ✅ Store DB status globally
    app.locals.dbConnected = dbConnected;

    // ✅ CORS
    app.use(cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:5174"
      ],
      credentials: true
    }));

    // ✅ Body parsers
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // ✅ Static files
    app.use("/assets", express.static(path.join(__dirname, "assets")));

    // ✅ Health route
    app.get("/api/health", (req, res) => {
      res.json({
        success: true,
        message: "Server is running",
        database: req.app.locals.dbConnected ? "✅ Connected" : "⚠️ Using Mock Data",
        timestamp: new Date().toISOString()
      });
    });

    // ✅ Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/drivers", driverRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/admin", adminRoutes);

    // ✅ 404
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`
      });
    });

    // ✅ Error handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();