import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // In a real app, fetch from API
        // const response = await api.get(`/users/${id}`);
        // setUser(response.data.user);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setUser({
          _id: id,
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-1234',
          role: 'user',
          createdAt: '2023-06-15T10:00:00Z',
          lastLogin: '2023-06-20T08:45:00Z',
          bookingStats: {
            total: 12,
            completed: 8,
            cancelled: 1,
            pending: 3
          },
          address: '123 Main St, Anytown, USA'
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !user) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error || 'User not found'}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage user information
          </p>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => navigate('/users')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Back to Users
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit User
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <div className="flex flex-col items-center pb-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {user.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600 mb-3">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Active
                </button>
                <button className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  Suspend
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Last Login</span>
                <span className="text-sm font-medium">{new Date(user.lastLogin).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="col-span-2">
          <Card title="User Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{user.address}</p>
              </div>
            </div>
          </Card>
          
          <Card title="Booking Statistics" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-800">{user.bookingStats.total}</p>
                <p className="text-sm text-gray-500">Total Bookings</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{user.bookingStats.completed}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600">{user.bookingStats.pending}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-600">{user.bookingStats.cancelled}</p>
                <p className="text-sm text-gray-500">Cancelled</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                View All Bookings
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;