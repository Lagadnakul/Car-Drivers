import axios from 'axios';
import { toast } from 'react-toastify';

// Base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
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
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 422:
          toast.error('Validation failed');
          break;
        case 500:
          toast.error('Server error. Please try again later');
          break;
        default:
          toast.error(error.response.data?.message || 'Something went wrong');
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('No response from server. Please check your connection');
    } else {
      // Something happened in setting up the request
      toast.error('Error setting up request. Please try again');
    }

    return Promise.reject(error);
  }
);

// API endpoints
const endpoints = {
  auth: {
    login: (credentials) => api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    }),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => api.post('/auth/logout'),
    profile: () => api.get('/users/profile')
  },

  drivers: {
    getAll: (params) => api.get('/drivers', { params }),
    getById: (id) => api.get(`/drivers/${id}`),
    create: (driverData) => api.post('/drivers', driverData),
    update: (id, driverData) => api.put(`/drivers/${id}`, driverData),
    delete: (id) => api.delete(`/drivers/${id}`),
    toggleAvailability: (id) => api.patch(`/drivers/${id}/availability`),
    search: (params) => api.get('/drivers/search', { params }),
    getAvailable: () => api.get('/drivers/available'),
  },

  bookings: {
    create: (bookingData) => api.post('/bookings', bookingData),
    getAll: () => api.get('/bookings'),
    getById: (id) => api.get(`/bookings/${id}`),
    update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
    cancel: (id) => api.patch(`/bookings/${id}/cancel`)
  },

  users: {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (userData) => api.put('/users/profile', userData),
    getBookings: () => api.get('/users/bookings'),
    updatePassword: (passwordData) => api.put('/users/password', passwordData)
  },

  upload: {
    image: (formData) => api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
};

export { api as default, endpoints };
