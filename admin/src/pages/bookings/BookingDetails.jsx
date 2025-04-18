import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // In a real app, fetch from API
        // const response = await api.get(`/bookings/${id}`);
        // setBooking(response.data.booking);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setBooking({
          _id: id,
          startTime: new Date(2023, 5, 16, 9, 0),
          endTime: new Date(2023, 5, 16, 12, 0),
          user: { 
            _id: 'u2', 
            name: 'Jane Williams',
            email: 'jane@example.com',
            phone: '555-1234'
          },
          driver: { 
            _id: 'd2', 
            user: { 
              name: 'David Johnson',
              email: 'david@example.com',
              phone: '555-5678'
            },
            rating: 4.8
          },
          pickupLocation: '456 Park Ave, Town',
          dropLocation: '789 Oak St, Town',
          totalAmount: 60.00,
          status: 'confirmed',
          paymentStatus: 'pending',
          paymentMethod: 'credit_card',
          createdAt: '2023-06-15T14:30:00Z',
          vehicleDetails: {
            type: 'sedan',
            model: 'Toyota Camry',
            make: 'Toyota',
            year: 2020,
            licensePlate: 'ABC123'
          },
          notes: 'Please call when arrived at pickup location.',
          timeline: [
            { 
              status: 'booked', 
              time: '2023-06-14T10:15:00Z',
              note: 'Booking created by user'
            },
            { 
              status: 'confirmed', 
              time: '2023-06-14T10:30:00Z',
              note: 'Booking confirmed by driver'
            }
          ]
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load booking details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, [id]);
  
  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      // In a real app, make an API call
      // await api.put(`/bookings/${id}/status`, { status: newStatus });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setBooking({
        ...booking,
        status: newStatus,
        timeline: [
          ...booking.timeline,
          {
            status: newStatus,
            time: new Date().toISOString(),
            note: `Status updated to ${newStatus} by admin`
          }
        ]
      });
    } catch (err) {
      console.error(err);
      setError('Failed to update booking status');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'booked':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error || !booking) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">{error || 'Booking not found'}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
          <p className="mt-1 text-sm text-gray-500">
            Booking ID: <span className="font-medium">#{booking._id}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => navigate('/bookings')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Back to Bookings
          </Button>
          
          {booking.status === 'pending' && (
            <Button
              onClick={() => handleStatusUpdate('confirmed')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm Booking
            </Button>
          )}
          
          {booking.status === 'confirmed' && (
            <Button
              onClick={() => handleStatusUpdate('completed')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Mark as Completed
            </Button>
          )}
          
          {(booking.status === 'pending' || booking.status === 'confirmed') && (
            <Button
              onClick={() => handleStatusUpdate('cancelled')}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Cancel Booking
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card title="Booking Information">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <div className="text-sm">
                <span className="text-gray-500">Created: </span>
                <span className="font-medium">{new Date(booking.createdAt).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Trip Details</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium">{new Date(booking.startTime).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium">
                      {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pickup Location</p>
                    <p className="font-medium">{booking.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Drop Location</p>
                    <p className="font-medium">{booking.dropLocation}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="font-medium">${booking.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      booking.paymentStatus === 'completed'
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Method</p>
                    <p className="font-medium capitalize">{booking.paymentMethod.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Vehicle Details</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Vehicle Type</p>
                  <p className="font-medium capitalize">{booking.vehicleDetails.type}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Make & Model</p>
                  <p className="font-medium">{booking.vehicleDetails.make} {booking.vehicleDetails.model}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Year</p>
                  <p className="font-medium">{booking.vehicleDetails.year}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">License Plate</p>
                  <p className="font-medium">{booking.vehicleDetails.licensePlate}</p>
                </div>
              </div>
            </div>
            
            {booking.notes && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">{booking.notes}</p>
                </div>
              </div>
            )}
          </Card>
          
          <Card title="Booking Timeline" className="mt-6">
            <div className="space-y-4">
              {booking.timeline.map((event, index) => (
                <div key={index} className="flex">
                  <div className="mr-4">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center ${getStatusColor(event.status)}`}>
                      {event.status === 'booked' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                      {event.status === 'confirmed' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {event.status === 'completed' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {event.status === 'cancelled' && (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    {index < booking.timeline.length - 1 && <div className="h-full w-0.5 bg-gray-200 mx-auto"></div>}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-800 capitalize">{event.status}</h3>
                      <span className="ml-2 text-xs text-gray-500">
                        {new Date(event.time).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User</h3>
              <Link to={`/users/${booking.user._id}`} className="text-sm text-blue-600 hover:text-blue-800">View Profile</Link>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                {booking.user.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{booking.user.name}</p>
                <p className="text-sm text-gray-500">{booking.user.email}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Phone Number</p>
                <p className="font-medium">{booking.user.phone}</p>
              </div>
            </div>
          </Card>
          
          <Card className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Driver</h3>
              <Link to={`/drivers/${booking.driver._id}`} className="text-sm text-blue-600 hover:text-blue-800">View Profile</Link>
            </div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold mr-3">
                {booking.driver.user.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-medium mr-2">{booking.driver.user.name}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                    <span>{booking.driver.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{booking.driver.user.email}</p>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Phone Number</p>
                <p className="font-medium">{booking.driver.user.phone}</p>
              </div>
            </div>
          </Card>
          
          <div className="mt-6 space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Contact User
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Contact Driver
            </Button>
            <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800">
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;