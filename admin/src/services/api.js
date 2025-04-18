import axios from 'axios';

// Base URL - update this with your actual backend URL
const BASE_URL = 'http://localhost:4000/api';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const adminUser = JSON.parse(localStorage.getItem('admin_user') || '{}');
    if (adminUser && adminUser.token) {
      config.headers['Authorization'] = `Bearer ${adminUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized responses (token expired, etc.)
    if (error.response && error.response.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem('admin_user');
      window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }
    
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/admin/auth/login', credentials),
  logout: () => api.post('/admin/auth/logout'),
  getProfile: () => api.get('/admin/profile'),
};

// User endpoints
export const userAPI = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  create: (userData) => api.post('/admin/users', userData),
  update: (id, userData) => api.put(`/admin/users/${id}`, userData),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

// Driver endpoints
export const driverAPI = {
  getAll: (params) => api.get('/admin/drivers', { params }),
  getById: (id) => api.get(`/admin/drivers/${id}`),
  verify: (id, status, comments) => api.put(`/admin/drivers/${id}/verify`, { status, comments }),
  update: (id, driverData) => api.put(`/admin/drivers/${id}`, driverData),
  delete: (id) => api.delete(`/admin/drivers/${id}`),
};

// Booking endpoints
export const bookingAPI = {
  getAll: (params) => api.get('/admin/bookings', { params }),
  getById: (id) => api.get(`/admin/bookings/${id}`),
  updateStatus: (id, status) => api.put(`/admin/bookings/${id}/status`, { status }),
  create: (bookingData) => api.post('/admin/bookings', bookingData),
  delete: (id) => api.delete(`/admin/bookings/${id}`),
};

// Dashboard endpoints
export const dashboardAPI = {
  getSummary: () => api.get('/admin/dashboard/summary'),
  getRecentBookings: () => api.get('/admin/dashboard/recent-bookings'),
  getRevenue: (period) => api.get(`/admin/dashboard/revenue?period=${period}`),
  getUserGrowth: (period) => api.get(`/admin/dashboard/user-growth?period=${period}`),
};

// Export the full API instance as default
export default api;