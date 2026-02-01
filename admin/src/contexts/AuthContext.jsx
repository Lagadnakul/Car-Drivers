import React, { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('admin_user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API using the password
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const userData = await response.json();
      
      // For demo purposes:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use password in condition to avoid unused variable warning
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Mock user data
      const userData = {
        id: '123',
        name: 'Admin User',
        email: email,
        role: 'admin',
        token: 'mock-jwt-token',
      };
      
      // Store in localStorage
      localStorage.setItem('admin_user', JSON.stringify(userData));
      
      // Update state
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    setLoading(true);
    
    try {
      // Clear localStorage and state
      localStorage.removeItem('admin_user');
      setUser(null);
      window.location.href = '/login'; // Force redirect to login page
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = (userData) => {
    // Update the user in localStorage and state
    setUser(userData);
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};