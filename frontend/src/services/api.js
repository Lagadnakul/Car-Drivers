// filepath: d:\VS CODE\Car Driver\frontend\src\services\api.js
import axios from 'axios';
import { toast } from 'react-toastify';

// ✅ Configure base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API Base URL:', BASE_URL);

// ✅ Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000 // 10 second timeout
});

// ✅ REQUEST INTERCEPTOR - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token added to request');
    }
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR - Handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          toast.error(error.response.data?.message || 'Bad request');
          break;
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 500:
          toast.error('Server error. Please try again later');
          break;
        default:
          toast.error(error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', error.request);
      toast.error('Network error. Please check your connection.');
    } else {
      // Error in request setup
      console.error('Error:', error.message);
      toast.error(error.message || 'An unexpected error occurred');
    }

    return Promise.reject(error);
  }
);

export default api;

// ✅ API ENDPOINTS OBJECT
export const endpoints = {
  // Auth endpoints
  auth: {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    logout: () => api.post('/auth/logout'),
  },

  // User endpoints
  users: {
    getProfile: () => api.get('/users/profile/me'),
    updateProfile: (data) => api.put('/users/profile/me', data),
    getUser: (id) => api.get(`/users/${id}`),
    getAllUsers: (params) => api.get('/users', { params }),
  },

  // Driver endpoints
  drivers: {
    getAll: (params) => api.get('/drivers', { params }),
    getById: (id) => api.get(`/drivers/${id}`),
    search: (params) => api.get('/drivers/search', { params }),
    getAvailable: () => api.get('/drivers/available'),
    getNearby: (params) => api.get('/drivers/nearby', { params }),
  },

  // Booking endpoints
  bookings: {
    create: (data) => api.post('/bookings', data),
    getAll: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    update: (id, data) => api.put(`/bookings/${id}`, data),
    cancel: (id) => api.patch(`/bookings/${id}/cancel`),
    delete: (id) => api.delete(`/bookings/${id}`),
  }
};