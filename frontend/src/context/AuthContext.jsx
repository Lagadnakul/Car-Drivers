import  { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { login as loginApi } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await loginApi(email, password);
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Transform fullName to name if it exists
      const formattedUserData = {
        ...userData,
        name: userData.fullName, // Add the name field expected by backend
        fullName: undefined // Remove the fullName field
      };
      
      const response = await api.post('/users/register', formattedUserData);
      const newUserData = response.data;
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(newUserData));
      setUser(newUserData);
      return newUserData;
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      const errorMsg = error.response?.data?.message || error.response?.data?.error || 'Registration failed.';
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await api.put('/users/profile', userData);
      const updatedUserData = response.data;
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      return updatedUserData;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Failed to update profile.';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};