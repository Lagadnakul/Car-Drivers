/**
 * Creates a FormData object for driver registration with proper file handling
 * 
 * @param {Object} driverData - Driver data object with all required fields
 * @param {Object} files - Object containing all file references
 * @returns {FormData} FormData object ready to be sent to the API
 */
export const createDriverFormData = (driverData, files) => {
    const formData = new FormData();
    
    // Add basic driver information
    formData.append('firstName', driverData.firstName || '');
    formData.append('lastName', driverData.lastName || '');
    formData.append('email', driverData.email || '');
    formData.append('phone', driverData.phone || '');
    formData.append('dateOfBirth', driverData.dateOfBirth || '');
    formData.append('gender', driverData.gender || 'male');
    
    // Add address information
    formData.append('address', driverData.address || '');
    formData.append('city', driverData.city || '');
    formData.append('state', driverData.state || '');
    formData.append('zipCode', driverData.zipCode || '');
    
    // Add driver professional details
    formData.append('experience', driverData.experience || '1');
    formData.append('hourlyRate', driverData.hourlyRate || '20');
    
    // Add vehicle information
    formData.append('vehicleType', driverData.vehicleType || 'sedan');
    formData.append('vehicleMake', driverData.vehicleMake || '');
    formData.append('vehicleModel', driverData.vehicleModel || '');
    formData.append('vehicleYear', driverData.vehicleYear || '');
    formData.append('vehicleColor', driverData.vehicleColor || '');
    formData.append('licensePlate', driverData.licensePlate || '');
    
    // Add license & insurance information
    formData.append('licenseNumber', driverData.licenseNumber || '');
    formData.append('licenseExpiry', driverData.licenseExpiry || '');
    formData.append('insuranceProvider', driverData.insuranceProvider || '');
    formData.append('insurancePolicyNumber', driverData.insurancePolicyNumber || '');
    formData.append('insuranceExpiry', driverData.insuranceExpiry || '');
    
    // Add vehicle types as array (if provided)
    if (driverData.vehicleTypes && Array.isArray(driverData.vehicleTypes)) {
      driverData.vehicleTypes.forEach(type => {
        formData.append('vehicleTypes', type);
      });
    } else if (driverData.vehicleType) {
      // Add single vehicle type if vehicleTypes array isn't present
      formData.append('vehicleTypes', driverData.vehicleType);
    }
    
    // Add files with proper error handling
    if (files) {
      // Profile photo
      if (files.profilePhoto) {
        formData.append('profilePhoto', files.profilePhoto);
      }
      
      // License image
      if (files.licenseImage) {
        formData.append('licenseImage', files.licenseImage);
      }
      
      // Vehicle photo
      if (files.vehiclePhoto) {
        formData.append('vehiclePhoto', files.vehiclePhoto);
      }
      
      // Additional documents (multiple file support)
      if (files.additionalDocs) {
        if (Array.isArray(files.additionalDocs)) {
          files.additionalDocs.forEach(file => {
            formData.append('additionalDocs', file);
          });
        } else {
          // If a single file was provided
          formData.append('additionalDocs', files.additionalDocs);
        }
      }
    }
    
    return formData;
  };
  
  /**
   * Creates a FormData object for user registration
   * 
   * @param {Object} userData - User data object
   * @returns {FormData} FormData object ready to be sent to the API
   */
  export const createUserFormData = (userData) => {
    const formData = new FormData();
    
    formData.append('name', userData.fullName || '');
    formData.append('email', userData.email || '');
    formData.append('password', userData.password || '');
    formData.append('phone', userData.phone || '');
    
    return formData;
  };
  
  /**
   * Creates a FormData object for booking creation
   * 
   * @param {Object} bookingData - Booking data object
   * @returns {FormData} FormData object ready to be sent to the API
   */
  export const createBookingFormData = (bookingData) => {
    const formData = new FormData();
    
    formData.append('driverId', bookingData.driverId || '');
    formData.append('startTime', bookingData.startTime || '');
    formData.append('endTime', bookingData.endTime || '');
    formData.append('pickupLocation', bookingData.pickupLocation || '');
    formData.append('dropLocation', bookingData.dropLocation || '');
    
    // Add vehicle details
    if (bookingData.vehicleDetails) {
      formData.append('vehicleDetails[type]', bookingData.vehicleDetails.type || '');
      formData.append('vehicleDetails[make]', bookingData.vehicleDetails.make || '');
      formData.append('vehicleDetails[model]', bookingData.vehicleDetails.model || '');
      formData.append('vehicleDetails[year]', bookingData.vehicleDetails.year || '');
      formData.append('vehicleDetails[licensePlate]', bookingData.vehicleDetails.licensePlate || '');
    }
    
    if (bookingData.totalAmount) {
      formData.append('totalAmount', bookingData.totalAmount);
    }
    
    return formData;
  };