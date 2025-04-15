// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { login } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const register = async (userData, isDriver = false, driverData = null, files = null) => {
    try {
      let response;
      let authToken;
      
      // Regular user registration
      if (!isDriver) {
        response = await api.post('/users/register', userData);
        const { user: registeredUser, token } = response.data;
        
        // Save user data and token
        localStorage.setItem('user', JSON.stringify(registeredUser));
        localStorage.setItem('token', token);
        
        setUser(registeredUser);
        return registeredUser;
      } 
      // Driver registration (with files)
      else {
        // First register the user
        response = await api.post('/users/register', userData);
        
        const { user: registeredUser, token } = response.data;
        authToken = token; // Store token for later use
        
        // Create form data for driver registration
        const formData = new FormData();
        
        // Add driver details
        Object.keys(driverData).forEach(key => {
          formData.append(key, driverData[key]);
        });
        
        // Add files if present
        if (files) {
          if (files.profilePhoto) formData.append('profilePhoto', files.profilePhoto);
          if (files.licenseImage) formData.append('licenseImage', files.licenseImage);
          if (files.vehiclePhoto) formData.append('vehiclePhoto', files.vehiclePhoto);
          
          // For multiple files like additional docs
          if (files.additionalDocs) {
            if (Array.isArray(files.additionalDocs)) {
              files.additionalDocs.forEach(file => {
                formData.append('additionalDocs', file);
              });
            } else {
              formData.append('additionalDocs', files.additionalDocs);
            }
          }
        }
        
        // Register as driver with the token from user registration
        await api.post('/drivers/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        // Save user data and token
        localStorage.setItem('user', JSON.stringify(registeredUser));
        localStorage.setItem('token', authToken);
        
        setUser(registeredUser);
        return registeredUser;
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};