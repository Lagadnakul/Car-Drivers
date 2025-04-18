// backend/utils/FileUpload.js
import multer from 'multer';
import path from 'path';
import imagekit from '../config/imagekit.js';

// Define allowed file types
const imageTypes = /jpeg|jpg|png|webp/;
const documentTypes = /pdf|doc|docx/;

// Set up memory storage instead of disk storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
    let allowedTypes;
    
    if (['profilePhoto', 'vehiclePhoto'].includes(file.fieldname)) {
        allowedTypes = imageTypes;
    } else if (['licenseImage', 'additionalDocs'].includes(file.fieldname)) {
        allowedTypes = new RegExp(imageTypes.source + '|' + documentTypes.source);
    } else {
        allowedTypes = new RegExp(imageTypes.source + '|' + documentTypes.source);
    }
    
    // Check file type
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error(`Only ${allowedTypes.source.replace(/\|/g, ', ')} files are allowed`));
    }
};

// Initialize multer with configured settings
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});

// Helper function to upload file buffer to ImageKit
export const uploadToImageKit = async (fileBuffer, fileName, folder = '') => {
    try {
        const uploadResponse = await imagekit.upload({
            file: fileBuffer.toString('base64'),
            fileName: fileName,
            folder: `Car-Driver/${folder}`
        });
        
        return uploadResponse.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error('Failed to upload file to ImageKit');
    }
};

export default upload;