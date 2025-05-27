// frontend/src/services/pilotService.js
const API_URL = '/api/pilots';

export const pilotService = {
  getAvailablePilots: async (searchParams) => {
    try {
      const response = await fetch(`${API_URL}/available?${new URLSearchParams(searchParams)}`);
      if (!response.ok) throw new Error('Failed to fetch pilots');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};