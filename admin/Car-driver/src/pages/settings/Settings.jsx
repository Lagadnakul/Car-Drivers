import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Go Pilot',
    siteDescription: 'Car Driver Booking Platform',
    contactEmail: 'support@gopilot.com',
    contactPhone: '+1 (555) 123-4567',
    currency: 'USD',
    timezone: 'UTC-5'
  });
  
  const [bookingSettings, setBookingSettings] = useState({
    minBookingTime: 2, // in hours
    maxBookingDuration: 12, // in hours
    advanceBookingDays: 30, // max days in advance for booking
    cancellationPeriod: 24, // hours before which free cancellation is allowed
    cancellationFee: 10, // percentage of booking amount
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUser: 'notifications@gopilot.com',
    smtpPassword: '********',
    senderName: 'Go Pilot Support',
    senderEmail: 'support@gopilot.com'
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBookingSettingsChange = (e) => {
    const { name, value } = e.target;
    setBookingSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEmailSettingsChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveSettings = async (type) => {
    setSaving(true);
    setSuccessMessage('');
    
    try {
      // In a real app, this would be an API call
      // const response = await api.put('/settings', { 
      //   [type]: type === 'general' ? generalSettings : 
      //           type === 'booking' ? bookingSettings : emailSettings
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} settings saved successfully!`);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage application settings and configurations
        </p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}
      
      <div className="space-y-6">
        <Card title="General Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Site Name"
              name="siteName"
              value={generalSettings.siteName}
              onChange={handleGeneralSettingsChange}
            />
            <Input
              label="Site Description"
              name="siteDescription"
              value={generalSettings.siteDescription}
              onChange={handleGeneralSettingsChange}
            />
            <Input
              label="Contact Email"
              name="contactEmail"
              type="email"
              value={generalSettings.contactEmail}
              onChange={handleGeneralSettingsChange}
            />
            <Input
              label="Contact Phone"
              name="contactPhone"
              value={generalSettings.contactPhone}
              onChange={handleGeneralSettingsChange}
            />
            <Input
              label="Currency"
              name="currency"
              value={generalSettings.currency}
              onChange={handleGeneralSettingsChange}
            />
            <Input
              label="Timezone"
              name="timezone"
              value={generalSettings.timezone}
              onChange={handleGeneralSettingsChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => handleSaveSettings('general')}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? 'Saving...' : 'Save General Settings'}
            </Button>
          </div>
        </Card>
        
        <Card title="Booking Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Minimum Booking Time (hours)"
              name="minBookingTime"
              type="number"
              value={bookingSettings.minBookingTime}
              onChange={handleBookingSettingsChange}
            />
            <Input
              label="Maximum Booking Duration (hours)"
              name="maxBookingDuration"
              type="number"
              value={bookingSettings.maxBookingDuration}
              onChange={handleBookingSettingsChange}
            />
            <Input
              label="Advance Booking Days"
              name="advanceBookingDays"
              type="number"
              value={bookingSettings.advanceBookingDays}
              onChange={handleBookingSettingsChange}
            />
            <Input
              label="Free Cancellation Period (hours)"
              name="cancellationPeriod"
              type="number"
              value={bookingSettings.cancellationPeriod}
              onChange={handleBookingSettingsChange}
            />
            <Input
              label="Cancellation Fee (%)"
              name="cancellationFee"
              type="number"
              value={bookingSettings.cancellationFee}
              onChange={handleBookingSettingsChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => handleSaveSettings('booking')}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Booking Settings'}
            </Button>
          </div>
        </Card>
        
        <Card title="Email Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="SMTP Host"
              name="smtpHost"
              value={emailSettings.smtpHost}
              onChange={handleEmailSettingsChange}
            />
            <Input
              label="SMTP Port"
              name="smtpPort"
              type="number"
              value={emailSettings.smtpPort}
              onChange={handleEmailSettingsChange}
            />
            <Input
              label="SMTP Username"
              name="smtpUser"
              value={emailSettings.smtpUser}
              onChange={handleEmailSettingsChange}
            />
            <Input
              label="SMTP Password"
              name="smtpPassword"
              type="password"
              value={emailSettings.smtpPassword}
              onChange={handleEmailSettingsChange}
            />
            <Input
              label="Sender Name"
              name="senderName"
              value={emailSettings.senderName}
              onChange={handleEmailSettingsChange}
            />
            <Input
              label="Sender Email"
              name="senderEmail"
              type="email"
              value={emailSettings.senderEmail}
              onChange={handleEmailSettingsChange}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => handleSaveSettings('email')}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {saving ? 'Saving...' : 'Save Email Settings'}
            </Button>
          </div>
        </Card>
        
        <Card title="System Information">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Application Version</p>
                <p className="font-medium">1.0.0</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Database Status</p>
                <p className="font-medium text-green-600">Connected</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Backup</p>
                <p className="font-medium">2023-06-20 03:00 AM</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Server Environment</p>
                <p className="font-medium">Production</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              Backup Database
            </Button>
            <Button 
              className="bg-red-100 hover:bg-red-200 text-red-800"
            >
              Clear Cache
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;