// backend/routes/imagekit.js
import express from 'express';
import imagekit from '../config/imagekit.js';
import { protect } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get authentication parameters for client-side uploads
router.get('/auth', protect, async (req, res) => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        res.status(200).json(authenticationParameters);
    } catch (error) {
        res.status(500).json({ message: "Error generating ImageKit auth params", error: error.message });
    }
});

// Direct server-side upload endpoint
router.post('/upload', protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file provided' });
        }

        const folder = req.body.folder || '';
        
        const uploadResponse = await imagekit.upload({
            file: req.file.buffer.toString('base64'),
            fileName: `${Date.now()}-${req.file.originalname}`,
            folder: `Car-Driver/${folder}`
        });
        
        res.status(200).json({ 
            success: true,
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            name: uploadResponse.name
        });
    } catch (error) {
        console.error('ImageKit upload error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Failed to upload file',
            error: error.message 
        });
    }
});

// Delete file from ImageKit
router.delete('/:fileId', protect, async (req, res) => {
    try {
        await imagekit.deleteFile(req.params.fileId);
        res.status(200).json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        console.error('ImageKit delete error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to delete file',
            error: error.message 
        });
    }
});

export default router;