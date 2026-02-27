import { validateCoordinates, validateEmail, validatePassword, validatePhoneNumber } from '../utils/helpers.js';

// Validation middleware for user registration
export const validateUserRegistration = (req, res, next) => {
  const { name, email, password, phone } = req.body;
  const errors = [];

  // Required fields validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || !validatePassword(password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
  }

  if (!phone || !validatePhoneNumber(phone)) {
    errors.push('Valid phone number is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for driver registration
export const validateDriverRegistration = (req, res, next) => {
  const { 
    name, 
    email, 
    password, 
    phone, 
    licenseNumber, 
    vehicleDetails 
  } = req.body;
  const errors = [];

  // Basic user validation
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Valid email is required');
  }

  if (!password || !validatePassword(password)) {
    errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
  }

  if (!phone || !validatePhoneNumber(phone)) {
    errors.push('Valid phone number is required');
  }

  // Driver-specific validation
  if (!licenseNumber || licenseNumber.trim().length < 5) {
    errors.push('Valid license number is required');
  }

  if (!vehicleDetails) {
    errors.push('Vehicle details are required');
  } else {
    const { make, model, year, plateNumber, color } = vehicleDetails;
    
    if (!make || make.trim().length < 2) {
      errors.push('Vehicle make is required');
    }
    
    if (!model || model.trim().length < 2) {
      errors.push('Vehicle model is required');
    }
    
    if (!year || year < 2000 || year > new Date().getFullYear() + 1) {
      errors.push('Valid vehicle year is required');
    }
    
    if (!plateNumber || plateNumber.trim().length < 3) {
      errors.push('Valid plate number is required');
    }
    
    if (!color || color.trim().length < 3) {
      errors.push('Vehicle color is required');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for booking creation
export const validateBookingCreation = (req, res, next) => {
  const { 
    pickupLocation, 
    dropoffLocation, 
    scheduledDateTime,
    serviceType 
  } = req.body;
  const errors = [];

  // Pickup location validation
  if (!pickupLocation) {
    errors.push('Pickup location is required');
  } else {
    const { address, coordinates } = pickupLocation;
    
    if (!address || address.trim().length < 5) {
      errors.push('Valid pickup address is required');
    }
    
    if (!coordinates || !validateCoordinates(coordinates.latitude, coordinates.longitude)) {
      errors.push('Valid pickup coordinates are required');
    }
  }

  // Dropoff location validation
  if (!dropoffLocation) {
    errors.push('Dropoff location is required');
  } else {
    const { address, coordinates } = dropoffLocation;
    
    if (!address || address.trim().length < 5) {
      errors.push('Valid dropoff address is required');
    }
    
    if (!coordinates || !validateCoordinates(coordinates.latitude, coordinates.longitude)) {
      errors.push('Valid dropoff coordinates are required');
    }
  }

  // Scheduled date time validation
  if (scheduledDateTime) {
    const scheduledDate = new Date(scheduledDateTime);
    const now = new Date();
    
    if (isNaN(scheduledDate.getTime())) {
      errors.push('Valid scheduled date and time is required');
    } else if (scheduledDate <= now) {
      errors.push('Scheduled time must be in the future');
    }
  }

  // Service type validation
  const validServiceTypes = ['standard', 'premium', 'luxury', 'shared'];
  if (!serviceType || !validServiceTypes.includes(serviceType)) {
    errors.push('Valid service type is required (standard, premium, luxury, shared)');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for location updates
export const validateLocationUpdate = (req, res, next) => {
  const { latitude, longitude } = req.body;
  const errors = [];

  if (!validateCoordinates(latitude, longitude)) {
    errors.push('Valid latitude and longitude are required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for password update
export const validatePasswordUpdate = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const errors = [];

  if (!currentPassword) {
    errors.push('Current password is required');
  }

  if (!newPassword || !validatePassword(newPassword)) {
    errors.push('New password must be at least 8 characters with uppercase, lowercase, and number');
  }

  if (currentPassword === newPassword) {
    errors.push('New password must be different from current password');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Validation middleware for pagination parameters
export const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;
  
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Page must be a positive number'
    });
  }
  
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be a number between 1 and 100'
    });
  }
  
  next();
};

// Validation middleware for MongoDB ObjectId
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    next();
  };
};
