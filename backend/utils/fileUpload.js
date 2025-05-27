// backend/utils/FileUpload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Convert ESM URLs to file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create subdirectories based on file type
        let folder = 'misc';
        
        if (file.fieldname === 'profilePhoto') {
            folder = 'profiles';
        } else if (file.fieldname === 'licenseImage') {
            folder = 'licenses';
        } else if (file.fieldname === 'vehiclePhoto') {
            folder = 'vehicles';
        } else if (file.fieldname.includes('additionalDocs')) {
            folder = 'documents';
        }
        
        const destination = path.join(uploadsDir, folder);
        
        // Create folder if it doesn't exist
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        
        cb(null, destination);
    },
    filename: function (req, file, cb) {
        // Create unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    // Define allowed file types by field name
    const imageTypes = /jpeg|jpg|png|webp/;
    const documentTypes = /pdf|doc|docx/;
    
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

export default upload;