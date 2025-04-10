import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableCard from '../../components/common/TableCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // In a real app, fetch from API
        // const response = await api.get('/bookings');
        // setBookings(response.data.bookings);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setBookings([
          {
            _id: '1',
            startTime: new Date(2023, 5, 15, 10, 0),
            endTime: new Date(2023, 5, 15, 14, 0),
            user: { _id: 'u1', name: 'John Doe' },
            driver: { _id: 'd1', user: { name: 'Mike Smith' } },
            pickupLocation: '123 Main St, City',
            dropLocation: '456 Park Ave, City',
            totalAmount: 75.00,
            status: 'completed',
            paymentStatus: 'completed'
          },
          {
            _id: '2',
            startTime: new Date(2023, 5, 16, 9, 0),
            endTime: new Date(2023, 5, 16, 12, 0),
            user: { _id: 'u2', name: 'Jane Williams' },
            driver: { _id: 'd2', user: { name: 'David Johnson' } },
            pickupLocation: '456 Park Ave, Town',
            dropLocation: '789 Oak St, Town',
            totalAmount: 60.00,
            status: 'confirmed',
            paymentStatus: 'pending'
          },
          {
            _id: '3',
            startTime: new Date(2023, 5, 17, 13, 0),
            endTime: new Date(2023, 5, 17, 15, 30),
            user: { _id: 'u3', name: 'Robert Brown' },
            driver: { _id: 'd3', user: { name: 'Sarah Davis' } },
            pickupLocation: '789 Oak St, Village',
            dropLocation: '123 Pine St, Village',
            totalAmount: 45.00,
            status: 'pending',
            paymentStatus: 'pending'
          },
          {
            _id: '4',
            startTime: new Date(2023, 5, 18, 11, 0),
            endTime: new Date(2023, 5, 18, 13, 0),
            user: { _id: 'u4', name: 'Alice Johnson' },
            driver: { _id: 'd1', user: { name: 'Mike Smith' } },
            pickupLocation: '321 Elm St, City',
            dropLocation: '654 Maple Ave, City',
            totalAmount: 40.00,
            status: 'cancelled',
            paymentStatus: 'refunded'
          },
          {
            _id: '5',
            startTime: new Date(2023, 5, 19, 15, 0),
            endTime: new Date(2023, 5, 19, 18, 0),
            user: { _id: 'u5', name: 'Mark Wilson' },
            driver: { _id: 'd3', user: { name: 'Sarah Davis' } },
            pickupLocation: '987 Cedar Rd, Town',
            dropLocation: '654 Birch Blvd, Town',
            totalAmount: 65.00,
            status: 'confirmed',
            paymentStatus: 'completed'
          }
        ]);
      } catch (err) {
        console.error(err);
        setError('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const columns = [
    { 
      key: 'bookingId', 
      title: 'Booking ID',
      render: (booking) => (
        <Link to={`/bookings/${booking._id}`} className="text-blue-600 hover:underline">
          #{booking._id}
        </Link>
      )
    },
    { 
      key: 'user', 
      title: 'User',
      render: (booking) => (
        <Link to={`/users/${booking.user._id}`} className="hover:underline">
          {booking.user.name}
        </Link>
      )
    },
    { 
      key: 'driver', 
      title: 'Driver',
      render: (booking) => (
        <Link to={`/drivers/${booking.driver._id}`} className="hover:underline">
          {booking.driver.user.name}
        </Link>
      )
    },
    { 
      key: 'date', 
      title: 'Date & Time',
      render: (booking) => (
        <div>
          <div>{new Date(booking.startTime).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">
            {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            {new Date(booking.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      )
    },
    { 
      key: 'amount', 
      title: 'Amount',
      render: (booking) => `$${booking.totalAmount.toFixed(2)}`
    },
    { 
      key: 'status', 
      title: 'Status',
      render: (booking) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      )
    },
    { 
      key: 'paymentStatus', 
      title: 'Payment',
      render: (booking) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          booking.paymentStatus === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : booking.paymentStatus === 'refunded'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
        </span>
      )
    },
    { 
      key: 'actions', 
      title: 'Actions',
      render: (booking) => (
        <div className="flex space-x-2">
          <Link 
            to={`/bookings/${booking._id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            View
          </Link>
          {booking.status === 'pending' && (
            <button 
              className="text-green-600 hover:text-green-900"
              onClick={(e) => {
                e.stopPropagation();
                // Handle confirm action
              }}
            >
              Confirm
            </button>
          )}
        </div>
      )
    }
  ];
  
  const filteredBookings = bookings.filter(booking => {
    // Apply status filter
    if (statusFilter !== 'all' && booking.status !== statusFilter) {
      return false;
    }
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        booking.user.name.toLowerCase().includes(searchLower) ||
        booking.driver.user.name.toLowerCase().includes(searchLower) ||
        booking.pickupLocation.toLowerCase().includes(searchLower) ||
        booking._id.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });
  
  const filters = (
    <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="w-full md:w-auto">
        <select
          className="form-select w-full"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all ride bookings
          </p>
        </div>
        <div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Export Bookings
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'completed').length}
              </p>
            </div>
            <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
            <div className="bg-yellow-100 h-12 w-12 rounded-full flex items-center justify-center text-yellow-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'cancelled').length}
              </p>
            </div>
            <div className="bg-red-100 h-12 w-12 rounded-full flex items-center justify-center text-red-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <TableCard 
        title="Bookings List"
        columns={columns}
        data={filteredBookings}
        loading={loading}
        emptyMessage="No bookings found"
        onRowClick={(booking) => window.location.href = `/bookings/${booking._id}`}
        filters={filters}
      />
    </div>
  );
};

export default AllBookings;