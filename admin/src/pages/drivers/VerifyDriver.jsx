import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const VerifyDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [comments, setComments] = useState('');
  
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
            name: 'Mark Johnson', 
            email: 'mark@example.com', 
            phone: '555-9876'
          },
          experience: 3,
          licenseNumber: 'DL54321',
          licenseExpiry: '2024-08-15',
          hourlyRate: 22,
          rating: 0,
          isAvailable: false,
          vehicleTypes: ['sedan', 'luxury'],
          documents: {
            licenseImage: 'https://via.placeholder.com/300x200',
            profilePhoto: 'https://via.placeholder.com/150',
            additionalDocs: [
              'https://via.placeholder.com/200',
              'https://via.placeholder.com/200'
            ]
          },
          status: 'pending',
          submissionDate: '2023-06-18'
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load driver details for verification');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDriverDetails();
  }, [id]);
  
  const handleVerification = async (status) => {
    try {
      setLoading(true);
      // In a real app, make an API call
      // await api.put(`/drivers/${id}/verify`, { status, comments });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVerificationStatus(status);
      
      // Navigate back to drivers list after verification
      setTimeout(() => {
        navigate('/drivers');
      }, 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to update verification status');
    } finally {
      setLoading(false);
    }
  };
  
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
  
  if (verificationStatus !== 'pending') {
    return (
      <div className={`p-6 rounded-lg ${
        verificationStatus === 'approved' 
          ? 'bg-green-50 border border-green-200' 
          : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-full ${
            verificationStatus === 'approved' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          } flex items-center justify-center mb-3`}>
            {verificationStatus === 'approved' ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-bold mb-2">
            Driver {verificationStatus === 'approved' ? 'Approved' : 'Rejected'}
          </h2>
          <p className="text-gray-500 text-center mb-4">
            {verificationStatus === 'approved'
              ? 'The driver has been approved and can now accept bookings.'
              : 'The driver has been rejected. They will be notified of this decision.'}
          </p>
          <Button
            onClick={() => navigate('/drivers')}
            className="bg-gray-800 hover:bg-gray-900 text-white"
          >
            Return to Drivers List
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Driver Verification</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and verify driver application
          </p>
        </div>
        <div>
          <Button
            onClick={() => navigate('/drivers')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Back to Drivers
          </Button>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This driver is awaiting verification. Please review their details and documents carefully.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Applicant Information">
            <div className="flex flex-col items-center mb-6">
              <img 
                src={driver.documents.profilePhoto} 
                alt={driver.user.name}
                className="w-24 h-24 rounded-full object-cover mb-4" 
              />
              <h3 className="text-lg font-semibold">{driver.user.name}</h3>
              <p className="text-gray-600 mb-2">{driver.user.email}</p>
              <p className="text-gray-600">{driver.user.phone}</p>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Applied On</span>
                <span className="text-sm font-medium">{new Date(driver.submissionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Experience</span>
                <span className="text-sm font-medium">{driver.experience} years</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Requested Rate</span>
                <span className="text-sm font-medium">${driver.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">Vehicle Types</span>
                <span className="text-sm font-medium capitalize">{driver.vehicleTypes.join(', ')}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card title="Verification Documents">
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2">Driver's License</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <img 
                    src={driver.documents.licenseImage} 
                    alt="Driver License"
                    className="w-full max-h-60 object-contain rounded mb-2" 
                  />
                  <div className="flex justify-between text-sm">
                    <span>License Number: <strong>{driver.licenseNumber}</strong></span>
                    <span>Expiry: <strong>{new Date(driver.licenseExpiry).toLocaleDateString()}</strong></span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Additional Documents</h4>
                <div className="grid grid-cols-2 gap-4">
                  {driver.documents.additionalDocs.map((doc, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <img 
                        src={doc} 
                        alt={`Document ${index + 1}`}
                        className="w-full h-40 object-cover rounded mb-2" 
                      />
                      <p className="text-sm text-center text-gray-500">Document {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="text-md font-medium mb-2">Verification Comments</h4>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Add your comments about this driver verification..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => handleVerification('approved')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve Driver
                </Button>
                <Button
                  onClick={() => handleVerification('rejected')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject Driver
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyDriver;