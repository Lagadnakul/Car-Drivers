import React, { useState, useContext } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    
    try {
      // Validate passwords match if changing password
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      // In a real app, call API here
      // For demo, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update local storage
      const userData = JSON.parse(localStorage.getItem('admin_user') || '{}');
      const updatedUser = {
        ...userData,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      
      // Update context
      updateProfile && updateProfile(updatedUser);
      
      setSuccess(true);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
      
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and change your password
        </p>
      </div>
      
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Profile successfully updated</p>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <div className="flex flex-col items-center py-6">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
                {formData.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold">{formData.name}</h3>
              <p className="text-gray-600 mb-3 capitalize">{formData.role}</p>
              <div>
                <label htmlFor="avatar" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Change Avatar
                </label>
                <input id="avatar" type="file" className="hidden" accept="image/*" />
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Member Since</span>
                <span className="text-sm font-medium">June 15, 2023</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Last Login</span>
                <span className="text-sm font-medium">Today</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <Card title="Account Information">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    disabled
                  />
                </div>
              </div>
            </Card>
            
            <Card title="Change Password" className="mt-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Leave the password fields empty if you don't want to change your password.
                </p>
              </div>
            </Card>
            
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;