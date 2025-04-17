// backend/routes/imagekit.js
import express from 'express';
import imagekit from '../config/imagekit.js';
import { protect } from '../middleware/auth.js'; // Change to named import

const router = express.Router();

router.get('/auth', protect, async (req, res) => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        res.status(200).json(authenticationParameters);
    } catch (error) {
        res.status(500).json({ message: "Error generating ImageKit auth params", error: error.message });
    }
});

export default router;