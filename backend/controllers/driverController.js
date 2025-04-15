import Driver from '../models/Driver.js';
import User from '../models/User.js';

// Register as a driver
export const registerDriver = async (req, res) => {
    console.log("=== DRIVER REGISTRATION REQUEST RECEIVED ===");
    console.log("Headers:", req.headers);
    console.log("Files:", req.files);
    console.log("Body:", req.body);
    console.log("User:", req.user);
    console.log("===========================================");
    
    try {
        const {
            experience,
            licenseNumber,
            licenseExpiry,
            vehicleTypes,
            hourlyRate
        } = req.body;

        // Log the extracted data
        console.log("Extracted data:");
        console.log("- Experience:", experience);
        console.log("- License Number:", licenseNumber);
        console.log("- License Expiry:", licenseExpiry);
        console.log("- Vehicle Types:", vehicleTypes);
        console.log("- Hourly Rate:", hourlyRate);

        // Check if driver profile already exists
        const existingDriver = await Driver.findOne({ user: req.user._id });
        if (existingDriver) {
            console.log("Driver profile already exists for user:", req.user._id);
            return res.status(400).json({ success: false, message: 'Driver profile already exists' });
        }

        // Create driver profile
        const driver = await Driver.create({
            user: req.user._id,
            experience,
            licenseNumber,
            licenseExpiry,
            vehicleTypes: Array.isArray(vehicleTypes) ? vehicleTypes : [vehicleTypes], // Handle single string vs array
            hourlyRate,
            documents: {
                licenseImage: req.files?.licenseImage ? req.files.licenseImage[0].path : '',
                profilePhoto: req.files?.profilePhoto ? req.files.profilePhoto[0].path : '',
                additionalDocs: req.files?.additionalDocs ? req.files.additionalDocs.map(file => file.path) : []
            }
        });

        console.log("Driver profile created successfully:", driver._id);

        // Update user role to driver
        await User.findByIdAndUpdate(req.user._id, { role: 'driver' });
        console.log("User role updated to 'driver'");

        res.status(201).json({ success: true, driver });
    } catch (error) {
        console.error("ERROR IN DRIVER REGISTRATION:", error);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get all drivers
export const getAllDrivers = async (req, res) => {
    try {
        const { vehicleType, available } = req.query;
        
        let query = {};
        
        if (vehicleType) {
            query.vehicleTypes = vehicleType;
        }
        
        if (available) {
            query.isAvailable = available === 'true';
        }
        
        const drivers = await Driver.find(query).populate('user', 'name email phone');
        
        res.json({ success: true, count: drivers.length, drivers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get driver by ID
export const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id).populate('user', 'name email phone');
        
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver not found' });
        }
        
        res.json({ success: true, driver });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Update driver profile
export const updateDriverProfile = async (req, res) => {
    try {
        const driver = await Driver.findOne({ user: req.user._id });
        
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver profile not found' });
        }
        
        const {
            experience,
            licenseNumber,
            licenseExpiry,
            vehicleTypes,
            hourlyRate,
            isAvailable
        } = req.body;
        
        driver.experience = experience || driver.experience;
        driver.licenseNumber = licenseNumber || driver.licenseNumber;
        driver.licenseExpiry = licenseExpiry || driver.licenseExpiry;
        driver.vehicleTypes = vehicleTypes || driver.vehicleTypes;
        driver.hourlyRate = hourlyRate || driver.hourlyRate;
        driver.isAvailable = isAvailable !== undefined ? isAvailable : driver.isAvailable;
        
        if (req.files) {
            if (req.files.licenseImage) {
                driver.documents.licenseImage = req.files.licenseImage[0].path;
            }
            if (req.files.profilePhoto) {
                driver.documents.profilePhoto = req.files.profilePhoto[0].path;
            }
            if (req.files.additionalDocs) {
                driver.documents.additionalDocs = req.files.additionalDocs.map(file => file.path);
            }
        }
        
        const updatedDriver = await driver.save();
        
        res.json({ success: true, driver: updatedDriver });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Toggle driver availability
export const toggleAvailability = async (req, res) => {
    try {
        const driver = await Driver.findOne({ user: req.user._id });
        
        if (!driver) {
            return res.status(404).json({ success: false, message: 'Driver profile not found' });
        }
        
        driver.isAvailable = !driver.isAvailable;
        await driver.save();
        
        res.json({ 
            success: true, 
            message: `Driver is now ${driver.isAvailable ? 'available' : 'unavailable'}`,
            isAvailable: driver.isAvailable
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};