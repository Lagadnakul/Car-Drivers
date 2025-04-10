import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./components/layout/Layout";

// Auth
import { AuthProvider } from "./contexts/AuthContext"; // Not from "./context/AuthContext"
import { DataProvider } from "./contexts/DataContext";
import Login from "./pages/auth/Login";

// Pages
import Dashboard from './pages/dashboard/Dashboard';
import AllDrivers from './pages/drivers/AllDrivers';
import DriverDetails from './pages/drivers/DriverDetails';
import VerifyDriver from './pages/drivers/VerifyDriver';
import AddDriver from './pages/drivers/AddDriver';
import AllUsers from './pages/users/AllUsers';
import UserDetails from './pages/users/UserDetails';
import AddUser from './pages/users/AddUser';
import AllBookings from './pages/bookings/AllBookings';
import BookingDetails from './pages/bookings/BookingDetails';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}');
  
  if (!user.id) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              
              {/* Driver Routes */}
              <Route path="drivers">
                <Route index element={<AllDrivers />} />
                <Route path="add" element={<AddDriver />} />
                <Route path=":id" element={<DriverDetails />} />
                <Route path="verify/:id" element={<VerifyDriver />} />
              </Route>
              
              {/* User Routes */}
              <Route path="users">
                <Route index element={<AllUsers />} />
                <Route path="add" element={<AddUser />} />
                <Route path=":id" element={<UserDetails />} />
              </Route>
              
              {/* Booking Routes */}
              <Route path="bookings">
                <Route index element={<AllBookings />} />
                <Route path=":id" element={<BookingDetails />} />
              </Route>
              
              {/* Settings */}
              <Route path="settings" element={<Settings />} />
              
              {/* Profile */}
              <Route path="profile" element={<Profile />} />
              
              {/* Catch all - redirect to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;