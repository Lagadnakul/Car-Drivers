import pilot1Photo from '../assets/images/pilots/pilot1.jpg';
import pilot2Photo from '../assets/images/pilots/pilot2.jpg';
import pilot3Photo from '../assets/images/pilots/pilot3.jpg';
import pilot4Photo from '../assets/images/pilots/pilot4.jpg';
import pilot5Photo from '../assets/images/pilots/pilot5.jpg';
import api from './api.js';

// Default pilots data for fallback
const defaultPilots = [
  {
    _id: 'p1',
    name: 'John Mitchell',
    rating: 4.9,
    experience: 8,
    profilePhoto: pilot1Photo,
    hourlyRate: 45,
    isAvailable: true,
    vehicleTypes: ['Sedan', 'Luxury'],
    languages: ['English', 'Spanish'],
    documents: { profilePhoto: pilot1Photo },
    certifications: ['Advanced Driving', 'Defensive Driving'],
    locations: ['New York', 'New Jersey'],
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'john.mitchell@gopilot.com'
    }
  }
];

const defaultPhotos = [pilot1Photo, pilot2Photo, pilot3Photo, pilot4Photo, pilot5Photo];

const getRandomPhoto = () => defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)];

const driverService = {
  getAllDrivers: async (filters = {}) => {
    try {
      const response = await api.get('/drivers', { 
        params: filters,
        timeout: 5000
      });
      
      if (!response.data?.drivers) {
        return defaultPilots;
      }

      return response.data.drivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));
    } catch (error) {
      console.error('Error fetching drivers:', error);
      return defaultPilots;
    }
  },

  getDriverById: async (id) => {
    try {
      if (!id) throw new Error('Driver ID is required');

      const defaultPilot = defaultPilots.find(pilot => pilot._id === id);
      if (defaultPilot) return defaultPilot;

      const response = await api.get(`/drivers/${id}`);
      const driver = response.data?.driver;
      
      if (!driver) throw new Error('Driver not found');

      return {
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      };
    } catch (error) {
      console.error('Error fetching driver:', error);
      throw error;
    }
  },

  searchDrivers: async (searchParams = {}) => {
    try {
      const response = await api.get('/drivers/search', { 
        params: searchParams,
        timeout: 5000
      });

      const drivers = response.data?.drivers || [];
      
      return drivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));
    } catch (error) {
      console.error('Error searching drivers:', error);
      return defaultPilots;
    }
  },

  createBooking: async (bookingData) => {
    try {
      if (!bookingData?.driverId) {
        throw new Error('Driver ID is required');
      }

      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }
  
      const formattedBooking = {
        driverId: bookingData.driverId,
        startTime: new Date(bookingData.startTime).toISOString(),
        endTime: new Date(bookingData.endTime).toISOString(),
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation || bookingData.pickupLocation,
        totalAmount: parseFloat(bookingData.totalAmount) || 0
      };

      console.log('Sending booking request to:', api.defaults.baseURL + '/bookings');
      console.log('Booking data:', formattedBooking);
      console.log('Auth token exists:', !!token);
  
      const response = await api.post('/bookings', formattedBooking);
  
      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Booking creation failed');
      }
  
      return response.data;
    } catch (error) {
      console.error('Booking error details:', error);
      
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Cannot connect to server. Please ensure the backend is running on port 4000.');
      }
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      
      if (error.response?.status === 404) {
        throw new Error('Booking service not found. Please contact support.');
      }
      
      const errorMessage = error.response?.data?.message || error.message || 'Unable to create booking';
      throw new Error(errorMessage);
    }
  },

  updateDriverProfile: async (driverId, profileData) => {
    try {
      if (!driverId) throw new Error('Driver ID is required');
      
      const response = await api.put(`/drivers/${driverId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating driver profile:', error);
      throw error;
    }
  },

  getRatings: async (driverId) => {
    try {
      if (!driverId) throw new Error('Driver ID is required');
      
      const response = await api.get(`/drivers/${driverId}/ratings`);
      return response.data?.ratings || [];
    } catch (error) {
      console.error('Error fetching driver ratings:', error);
      return [];
    }
  },

  updateAvailability: async (driverId, isAvailable) => {
    try {
      if (!driverId) throw new Error('Driver ID is required');
      
      const response = await api.patch(`/drivers/${driverId}/availability`, {
        isAvailable
      });
      return response.data;
    } catch (error) {
      console.error('Error updating driver availability:', error);
      throw error;
    }
  },

  registerDriver: async (driverData) => {
    try {
      const response = await api.post('/drivers/register', driverData);
      return response.data;
    } catch (error) {
      console.error('Error registering driver:', error);
      throw error;
    }
  },

  getAvailableDrivers: async () => {
    try {
      const response = await api.get('/drivers/available', { timeout: 5000 });
      const drivers = response.data?.data || [];
      return drivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));
    } catch (error) {
      console.error('Error fetching available drivers:', error);
      return defaultPilots;
    }
  }
};

export default driverService;