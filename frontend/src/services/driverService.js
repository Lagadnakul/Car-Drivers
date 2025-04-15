// frontend/src/services/driverService.js
import api from './api';

export const driverService = {
  getAllDrivers: async (filters = {}) => {
    const response = await api.get('/drivers', { params: filters });
    return response.data.drivers;
  },

  getDriverById: async (id) => {
    const response = await api.get(`/drivers/${id}`);
    return response.data.driver;
  },
  
  bookDriver: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data.booking;
  }
};