import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        // In a real app, fetch from API
        // const response = await api.get(`/drivers/${id}`);
        // setDriver(response.data.driver);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setDriver({
          _id: id,
          user: { 
            name: 'John Smith', 
            email: 'john@example.com', 
            phone: '555-1234',
          },
          experience: 5,
          licenseNumber: 'DL12345',
          licenseExpiry: '2025-06-15',
          hourlyRate: 25,
          rating: 4.7,
          isAvailable: true,
          vehicleTypes: ['sedan', 'suv'],
          documents: {
            licenseImage: 'https://via.placeholder.com/300x200',
            profilePhoto: 'https://via.placeholder.com/150',
            additionalDocs: [
              'https://via.placeholder.com/200',
              'https://via.placeholder.com/200',
            ],
          },
          completedTrips: 127,
          totalEarnings: 3175.50,
          joinedDate: '2023-01-15',
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load driver details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDriverDetails();
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !driver) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error || 'Driver not found'}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage driver information
          </p>
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => navigate('/drivers')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Back to Drivers
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Edit Driver
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <div className="flex flex-col items-center pb-6">
              <img 
                src={driver.documents.profilePhoto} 
                alt={driver.user.name}
                className="w-24 h-24 rounded-full object-cover mb-4" 
              />
              <h3 className="text-lg font-semibold">{driver.user.name}</h3>
              <div className="flex items-center mb-3">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{driver.rating}</span>
              </div>
              <div className="flex space-x-2">
                <span className={`px-3 py-1 text-xs rounded-full ${
                  driver.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {driver.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <button 
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  onClick={() => {/* Toggle availability */}}
                >
                  Toggle Status
                </button>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Driver Since</span>
                <span className="text-sm font-medium">{new Date(driver.joinedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Hourly Rate</span>
                <span className="text-sm font-medium">${driver.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Experience</span>
                <span className="text-sm font-medium">{driver.experience} years</span>
              </div>
            </div>
          </Card>
          
          <Card title="Vehicle Types" className="mt-6">
            <div className="flex flex-wrap gap-2">
              {driver.vehicleTypes.map((type, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize"
                >
                  {type}
                </span>
              ))}
            </div>
          </Card>
        </div>
        
        <div className="col-span-2">
          <Card title="Driver Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{driver.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{driver.user.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{driver.user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{driver.licenseNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">License Expiry</p>
                  <p className="font-medium">{new Date(driver.licenseExpiry).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Earnings</p>
                  <p className="font-medium">${driver.totalEarnings.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Performance Statistics" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-800">{driver.completedTrips}</p>
                <p className="text-sm text-gray-500">Total Trips</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">{driver.rating}</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">${driver.hourlyRate}</p>
                <p className="text-sm text-gray-500">Hourly Rate</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">{driver.experience}</p>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </div>
          </Card>
          
          <Card title="Documents" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">License</p>
                <img 
                  src={driver.documents.licenseImage} 
                  alt="Driver License"
                  className="w-full h-40 object-cover rounded-lg" 
                />
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Additional Documents</p>
                <div className="grid grid-cols-2 gap-2">
                  {driver.documents.additionalDocs.map((doc, index) => (
                    <img 
                      key={index}
                      src={doc} 
                      alt={`Document ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg" 
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;