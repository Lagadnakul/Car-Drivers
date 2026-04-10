// filepath: d:\VS CODE\Car Driver\frontend\src\services\driverService.js
import pilot1Photo from '../assets/images/pilots/pilot1.jpg';
import pilot2Photo from '../assets/images/pilots/pilot2.jpg';
import pilot3Photo from '../assets/images/pilots/pilot3.jpg';
import pilot4Photo from '../assets/images/pilots/pilot4.jpg';
import pilot5Photo from '../assets/images/pilots/pilot5.jpg';
import api from './api.js';

// ✅ Mock data for fallback
const mockDrivers = [
  {
    _id: 'mock-1',
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
      email: 'john@example.com'
    }
  }
];

const mockPhotos = [pilot1Photo, pilot2Photo, pilot3Photo, pilot4Photo, pilot5Photo];

const getRandomPhoto = () => mockPhotos[Math.floor(Math.random() * mockPhotos.length)];

const driverService = {
  // ✅ GET ALL DRIVERS
  getAllDrivers: async (filters = {}) => {
    try {
      console.log('📥 Fetching all drivers...');
      const response = await api.get('/drivers', {
        params: filters,
        timeout: 10000
      });

      if (!response.data?.drivers) {
        console.warn('⚠️ No drivers in response, using mock data');
        return mockDrivers;
      }

      const drivers = response.data.drivers.map(driver => ({
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      }));

      console.log(`✅ Fetched ${drivers.length} drivers`);
      return drivers;
    } catch (error) {
      console.error('❌ Error fetching drivers:', error.message);
      console.log('📦 Using mock data as fallback');
      return mockDrivers;
    }
  },

  // ✅ GET DRIVER BY ID
  getDriverById: async (id) => {
    try {
      if (!id) throw new Error('Driver ID is required');

      console.log(`📥 Fetching driver ${id}...`);

      // Check mock data first
      const mockDriver = mockDrivers.find(d => d._id === id);
      if (mockDriver) {
        console.log('✅ Using mock driver data');
        return mockDriver;
      }

      const response = await api.get(`/drivers/${id}`, {
        timeout: 10000
      });

      if (!response.data?.driver) {
        throw new Error('Driver data not found');
      }

      const driver = response.data.driver;
      const formattedDriver = {
        ...driver,
        profilePhoto: driver.documents?.profilePhoto || driver.profilePhoto || getRandomPhoto(),
        name: driver.user?.name || driver.name || 'Unknown Driver'
      };

      console.log(`✅ Fetched driver: ${formattedDriver.name}`);
      return formattedDriver;
    } catch (error) {
      console.error(`❌ Error fetching driver ${id}:`, error.message);
      
      // Return mock data as fallback
      const fallbackDriver = {
        _id: id,
        name: 'John Mitchell',
        rating: 4.9,
        experience: 8,
        profilePhoto: getRandomPhoto(),
        hourlyRate: 45,
        isAvailable: true,
        vehicleTypes: ['Sedan'],
        message: 'Using demo data'
      };

      return fallbackDriver;
    }
  },

  // ✅ SEARCH DRIVERS
  searchDrivers: async (params = {}) => {
    try {
      console.log('📥 Searching drivers with params:', params);
      const response = await api.get('/drivers/search', {
        params,
        timeout: 10000
      });

      const drivers = response.data?.drivers || [];
      console.log(`✅ Found ${drivers.length} drivers`);
      return drivers;
    } catch (error) {
      console.error('❌ Error searching drivers:', error.message);
      return mockDrivers;
    }
  },

  // ✅ CREATE BOOKING
  createBooking: async (bookingData) => {
    try {
      if (!bookingData?.driverId) {
        throw new Error('Driver ID is required');
      }

      // Check authentication
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login first.');
      }

      console.log('📤 Creating booking:', bookingData);

      const formattedBooking = {
        driverId: bookingData.driverId,
        startTime: new Date(bookingData.startTime).toISOString(),
        endTime: new Date(bookingData.endTime).toISOString(),
        pickupLocation: bookingData.pickupLocation,
        dropLocation: bookingData.dropLocation || bookingData.pickupLocation,
        totalAmount: parseFloat(bookingData.totalAmount) || 0,
        paymentMethod: 'COD' // Cash on Delivery
      };

      console.log('📬 Sending to server:', formattedBooking);

      const response = await api.post('/bookings', formattedBooking);

      if (!response.data?.success) {
        throw new Error(response.data?.message || 'Booking failed');
      }

      console.log('✅ Booking created successfully:', response.data.booking);
      return response.data;
    } catch (error) {
      console.error('❌ Booking error:', error);

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expired. Please login again.');
      }

      const errorMessage = error.response?.data?.message || error.message || 'Failed to create booking';
      throw new Error(errorMessage);
    }
  }
};

export default driverService;