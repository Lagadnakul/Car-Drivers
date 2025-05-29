import axios from 'axios';
import pilot1Photo from '../assets/images/pilots/pilot1.jpg';
import pilot2Photo from '../assets/images/pilots/pilot2.jpg';
import pilot3Photo from '../assets/images/pilots/pilot3.jpg';
import pilot4Photo from '../assets/images/pilots/pilot4.jpg';
import pilot5Photo from '../assets/images/pilots/pilot5.jpg';

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
  },
  // Add more default pilots as needed
];

const defaultPhotos = [pilot1Photo, pilot2Photo, pilot3Photo, pilot4Photo, pilot5Photo];

const getRandomPhoto = () => defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)];

// Create axios instance with enhanced config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  validateStatus: status => status >= 200 && status < 300
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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
        throw new Error('Driver ID is required for booking');
      }
  
      const response = await api.post('/bookings', {
        ...bookingData,
        // Make sure these required fields are included
        driver: bookingData.driverId,
        startTime: new Date(bookingData.startTime).toISOString(),
        endTime: new Date(bookingData.endTime).toISOString(),
        pickupLocation: bookingData.pickupLocation,
        dropoffLocation: bookingData.dropoffLocation || bookingData.pickupLocation,
        totalAmount: bookingData.totalAmount
      });
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
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
  }
};

export default driverService;