import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, FaCar, FaClock, FaLanguage, 
  FaTimes, FaCalendarAlt, FaMapMarkerAlt, 
  FaCreditCard 
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import driverService from '../services/driverService';
import { toast } from 'react-toastify';

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  // Booking form states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const data = await driverService.getDriverById(id);
        setDriver(data);
      } catch (error) {
        console.error('Error fetching driver details:', error);
        setError('Failed to load driver details');
        toast.error('Error loading driver details');
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  const calculateEndTime = () => {
    if (!selectedDate || !selectedTime) return null;
    const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
    return new Date(startDateTime.getTime() + duration * 60 * 60 * 1000);
  };

  const calculateTotalAmount = () => {
    return driver?.hourlyRate ? driver.hourlyRate * duration : 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (!user) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      const bookingData = {
        driverId: driver._id,
        startTime: `${selectedDate}T${selectedTime}`,
        endTime: calculateEndTime().toISOString(),
        pickupLocation,
        dropoffLocation: dropoffLocation || pickupLocation,
        totalAmount: calculateTotalAmount()
      };

      const response = await api.bookings.create(bookingData);

      if (response.data.success) {
        toast.success('Booking successful!');
        setBookingModalOpen(false);
        navigate('/booking/success', { 
          state: { 
            booking: response.data.booking 
          }
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
      console.error('Booking error:', err);
    }
  };

  const BookingModal = () => (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button 
            onClick={() => setBookingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Book {driver.name}</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaCalendarAlt className="inline mr-2" />
                Date
              </label>
              <input 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaClock className="inline mr-2" />
                Time
              </label>
              <input 
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaClock className="inline mr-2" />
                Duration (hours)
              </label>
              <input 
                type="number"
                min="1"
                max="12"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="inline mr-2" />
                Pickup Location
              </label>
              <input 
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                placeholder="Enter pickup address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="inline mr-2" />
                Dropoff Location (optional)
              </label>
              <input 
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter dropoff address (if different)"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Rate per hour:</span>
                <span className="font-semibold">${driver.hourlyRate}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Duration:</span>
                <span className="font-semibold">{duration} hours</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${calculateTotalAmount()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/90 flex items-center justify-center"
            >
              <FaCreditCard className="mr-2" />
              Confirm Booking
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error || 'Driver not found'}</p>
          <button 
            onClick={() => navigate('/drivers')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Drivers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <img 
              src={driver.profilePhoto}
              alt={driver.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{driver.name}</h1>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="font-semibold">{driver.rating}</span>
                <span className="text-gray-500 ml-1">({driver.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <FaClock className="mr-2 text-primary" />
                  {driver.experience} years of experience
                </p>
                <p className="flex items-center text-gray-700">
                  <FaCar className="mr-2 text-primary" />
                  {driver.vehicleTypes.join(', ')}
                </p>
                {driver.languages?.length > 0 && (
                  <p className="flex items-center text-gray-700">
                    <FaLanguage className="mr-2 text-primary" />
                    {driver.languages.join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
                <p className="text-3xl font-bold text-primary mb-4">
                  ${driver.hourlyRate}
                  <span className="text-base font-normal text-gray-500">/hour</span>
                </p>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {bookingModalOpen && <BookingModal />}
    </div>
  );
};

export default DriverDetails;