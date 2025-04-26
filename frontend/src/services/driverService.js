import axios from 'axios';
import pilot1Photo from '../assets/images/pilots/pilot1.jpg';
import pilot2Photo from '../assets/images/pilots/pilot2.jpg';
import pilot3Photo from '../assets/images/pilots/pilot3.jpg';
import pilot4Photo from '../assets/images/pilots/pilot4.jpg';
import pilot5Photo from '../assets/images/pilots/pilot5.jpg';

// Default pilots data
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
    profilePhoto: pilot4Photo,
    hourlyRate: 40,
    isAvailable: true,
    vehicleTypes: ['SUV', 'Van'],
    languages: ['English', 'French'],
    documents: {
      profilePhoto: pilot4Photo
    },
    certifications: ['Passenger Safety', 'First Aid'],
    locations: ['Boston', 'Cambridge'],
    contactInfo: {
      phone: '+1 (555) 234-5678',
      email: 'sarah.williams@gopilot.com'
    }
  },
  {
    _id: 'p3',
    name: 'Michael Chen',
    rating: 4.7,
    experience: 5,
    profilePhoto: pilot5Photo,
    hourlyRate: 38,
    isAvailable: true,
    vehicleTypes: ['Sedan', 'SUV'],
    languages: ['English', 'Mandarin'],
    documents: {
      profilePhoto: pilot5Photo
    },
    certifications: ['Urban Navigation', 'Customer Service'],
    locations: ['San Francisco', 'San Jose'],
    contactInfo: {
      phone: '+1 (555) 345-6789',
      email: 'michael.chen@gopilot.com'
    }
  }
];

const defaultPhotos = [pilot1Photo, pilot2Photo, pilot3Photo, pilot4Photo, pilot5Photo];

const getRandomPhoto = () => {
  const randomIndex = Math.floor(Math.random() * defaultPhotos.length);
  return defaultPhotos[randomIndex];
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const driverService = {
  getAllDrivers: async (filters = {}) => {
    try {
      const response = await api.get('/api/drivers', { params: filters });
      
      // Combine API drivers with default pilots
      let allDrivers = [...defaultPilots];
      
      // Add API drivers with photos
      if (response.data.drivers && response.data.drivers.length > 0) {
        const apiDrivers = response.data.drivers.map(driver => ({
          ...driver,
          profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto()
        }));
        allDrivers = [...allDrivers, ...apiDrivers];
      }
      
      // Apply filters if any
      if (filters.vehicleType) {
        allDrivers = allDrivers.filter(driver => 
          driver.vehicleTypes.some(type => 
            type.toLowerCase() === filters.vehicleType.toLowerCase()
          )
        );
      }
      
      if (filters.availability) {
        allDrivers = allDrivers.filter(driver => driver.isAvailable);
      }
      
      return allDrivers;
    } catch (error) {
      console.error('Error fetching drivers:', error);
      return defaultPilots; // Return default pilots if API fails
    }
  },

  searchDrivers: async (searchParams) => {
    try {
      const response = await api.get('/api/drivers/search', { params: searchParams });
      const apiDrivers = response.data.drivers || [];
      
      // Combine and filter all drivers
      const allDrivers = [...defaultPilots, ...apiDrivers].map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto()
      }));
      
      return allDrivers;
    } catch (error) {
      console.error('Error searching drivers:', error);
      return defaultPilots; // Return default pilots if API fails
    }
  },

  getDriverById: async (id) => {
    try {
      // Check default pilots first
      const defaultPilot = defaultPilots.find(pilot => pilot._id === id);
      if (defaultPilot) return defaultPilot;
      
      // If not found in defaults, check API
      const response = await api.get(`/api/drivers/${id}`);
      const driver = response.data.driver;
      return {
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto()
      };
    } catch (error) {
      console.error('Error fetching driver:', error);
      throw error;
    }
  }
};

export default driverService;