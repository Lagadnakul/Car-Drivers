// frontend/src/services/driverService.js
const API_URL = '/api/drivers';

export const driverService = {
  getAllDrivers: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_URL}/search?${queryString}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch pilots');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pilots:', error);
      throw error;
    }
  },

  getDriverById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch pilot details');
      return await response.json();
    } catch (error) {
      console.error('Error fetching pilot:', error);
      throw error;
    }
  }
};