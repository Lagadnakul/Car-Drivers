import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Driver Registration',
      message: 'Mark Johnson has registered as a new driver',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Booking Cancelled',
      message: 'Booking #1234 has been cancelled by the user',
      time: '45 minutes ago',
      read: false
    },
    {
      id: 3,
      title: 'Payment Failed',
      message: 'Payment for booking #2345 has failed',
      time: '2 hours ago',
      read: false
    }
  ]);

  const addDriver = (driver) => {
    const newDriver = {
      _id: `d${drivers.length + 1}`,
      user: {
        name: `${driver.firstName} ${driver.lastName}`,
        email: driver.email,
        phone: driver.phone
      },
      experience: parseInt(driver.experience || '1'),
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry,
      hourlyRate: parseInt(driver.hourlyRate || '20'),
      rating: 0,
      isAvailable: true,
      vehicleTypes: [driver.vehicleType],
      documents: {
        licenseImage: 'https://via.placeholder.com/300x200',
        profilePhoto: 'https://via.placeholder.com/150',
        additionalDocs: []
      },
      joinedDate: new Date().toISOString(),
      completedTrips: 0,
      totalEarnings: 0
    };
    
    setDrivers([newDriver, ...drivers]);
    
    // Add notification
    addNotification({
      title: 'New Driver Added',
      message: `${newDriver.user.name} has been added as a new driver`,
      time: 'Just now'
    });
    
    return newDriver;
  };
  
  const addUser = (user) => {
    const newUser = {
      _id: `u${users.length + 1}`,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      role: user.role || 'user',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      bookingStats: {
        total: 0,
        completed: 0,
        cancelled: 0,
        pending: 0
      },
      address: `${user.address || ''}, ${user.city || ''}, ${user.state || ''}`
    };
    
    setUsers([newUser, ...users]);
    
    // Add notification
    addNotification({
      title: 'New User Added',
      message: `${newUser.name} has been added to the system`,
      time: 'Just now'
    });
    
    return newUser;
  };
  
  const addNotification = (notification) => {
    const newNotification = {
      id: notifications.length + 1,
      ...notification,
      read: false,
      time: notification.time || 'Just now'
    };
    
    setNotifications([newNotification, ...notifications]);
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };
  
  return (
    <DataContext.Provider value={{
      drivers,
      setDrivers,
      addDriver,
      users,
      setUsers,
      addUser,
      bookings,
      setBookings,
      notifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataContext;