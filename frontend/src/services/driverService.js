// frontend/src/services/driverService.js
import axios from 'axios';
import pilot1Photo from '../assets/images/pilots/pilot1.jpg';
import pilot2Photo from '../assets/images/pilots/pilot2.jpg';
import pilot3Photo from '../assets/images/pilots/pilot3.jpg';
import pilot4Photo from '../assets/images/pilots/pilot4.jpg';
import pilot5Photo from '../assets/images/pilots/pilot5.jpg';

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
    documents: {
      profilePhoto: pilot1Photo
    },
    certifications: ['Advanced Driving', 'Defensive Driving'],
    locations: ['New York', 'New Jersey'],
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'john.mitchell@gopilot.com'
    }
  },
  {
    _id: 'p2',
    name: 'Sarah Williams',
    rating: 4.8,
    experience: 6,
    profilePhoto: pilot2Photo,
    hourlyRate: 40,
    isAvailable: true,
    vehicleTypes: ['SUV', 'Van'],
    languages: ['English', 'French'],
    documents: {
      profilePhoto: pilot2Photo
    },
    certifications: ['Passenger Safety', 'First Aid'],
    locations: ['Boston', 'Cambridge']
  },
  {
    _id: 'p3',
    name: 'Michael Chen',
    rating: 4.7,
    experience: 5,
    profilePhoto: pilot3Photo,
    hourlyRate: 38,
    isAvailable: true,
    vehicleTypes: ['Sedan', 'SUV'],
    languages: ['English', 'Mandarin'],
    documents: {
      profilePhoto: pilot3Photo
    },
    certifications: ['Urban Navigation', 'Customer Service'],
    locations: ['San Francisco', 'San Jose']
  }
];

const defaultPhotos = [pilot1Photo, pilot2Photo, pilot3Photo, pilot4Photo, pilot5Photo];

const getRandomPhoto = () => {
  const randomIndex = Math.floor(Math.random() * defaultPhotos.length);
  return defaultPhotos[randomIndex];
};

// Create axios instance with CORS config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  }
});

// Add request interceptor for error handling
api.interceptors.request.use(
  config => {
    // Add CORS headers to every request
    config.headers['Access-Control-Allow-Origin'] = 'http://localhost:3001';
    config.headers['Access-Control-Allow-Credentials'] = true;
    return config;
  },
  error => Promise.reject(error)
);

const driverService = {
  getAllDrivers: async (filters = {}) => {
    try {
      const response = await api.get('/drivers', { 
        params: filters,
        timeout: 5000 // Add timeout
      });
      
      if (!response.data?.drivers) {
        return defaultPilots;
      }

      const apiDrivers = response.data.drivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));

      // Apply filters
      let filteredDrivers = [...apiDrivers];
      
      if (filters.vehicleType) {
        filteredDrivers = filteredDrivers.filter(driver => 
          driver.vehicleTypes?.some(type => 
            type.toLowerCase() === filters.vehicleType.toLowerCase()
          )
        );
      }
      
      if (filters.availability) {
        filteredDrivers = filteredDrivers.filter(driver => driver.isAvailable);
      }
      
      return filteredDrivers;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      return defaultPilots; // Fallback to default pilots on error
    }
  },

  getDriverById: async (id) => {
    try {
      if (!id) {
        throw new Error('Driver ID is required');
      }

      // Check default pilots first
      const defaultPilot = defaultPilots.find(pilot => pilot._id === id);
      if (defaultPilot) return defaultPilot;

      const response = await api.get(`/drivers/${id}`);
      
      if (!response.data?.driver) {
        throw new Error('Driver not found');
      }

      const driver = response.data.driver;
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

  createBooking: async (bookingData) => {
    try {
      if (!bookingData.driverId) {
        throw new Error('Driver ID is required for booking');
      }
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  searchDrivers: async (searchParams) => {
    try {
      const response = await api.get('/drivers/search', { params: searchParams });
      const apiDrivers = response.data?.drivers || [];
      
      return apiDrivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));
    } catch (error) {
      console.error('Error searching drivers:', error);
      return defaultPilots;
    }
  },

  updateDriverProfile: async (driverId, profileData) => {
    try {
      if (!driverId) {
        throw new Error('Driver ID is required');
      }
      const response = await api.put(`/drivers/${driverId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating driver profile:', error);
      throw error;
    }
  }
};

export default driverService;