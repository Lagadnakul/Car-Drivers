// frontend/src/pages/DriverDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCar, FaCheck, FaCalendarAlt, FaClock, FaMapMarkerAlt, 
         FaPhoneAlt, FaEnvelope, FaLanguage, FaShieldAlt, FaCertificate, 
         FaTimes, FaUserTie } from 'react-icons/fa';
import driverService from '../services/driverService';

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('about');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Booking form states
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        if (!id) {
          throw new Error('Driver ID is required');
        }
        const data = await driverService.getDriverById(id);
        setDriver(data);
      } catch (err) {
        console.error('Error fetching driver details:', err);
        setError(err.message || 'Failed to load driver details');
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const bookingData = {
        driverId: driver._id,
        userId: 'current-user-id', // Replace with actual user ID from auth context
        startTime: `${selectedDate}T${selectedTime}`,
        pickupLocation,
        dropoffLocation,
        vehicleType: driver.vehicleTypes[0]
      };

      await driverService.createBooking(bookingData);
      setBookingSuccess(true);

      // Redirect after successful booking
      setTimeout(() => {
        navigate('/booking/success', {
          state: {
            driverName: driver.name,
            date: selectedDate,
            time: selectedTime,
            pickupLocation,
            dropoffLocation
          }
        });
      }, 2000);

    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to create booking. Please try again.');
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
        {/* Modal content */}
        <motion.div 
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {/* Close button */}
          <button 
            onClick={() => setBookingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Booking form */}
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input 
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <input 
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dropoff Location</label>
              <input 
                type="text"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/90"
            >
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
    <div className="bg-gray-50">
      {/* Driver details section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <img 
              src={driver.profilePhoto}
              alt={driver.name}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h1 className="text-2xl font-bold">{driver.name}</h1>
              <div className="flex items-center mt-2">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{driver.rating} ({driver.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Driver info */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Driver Information</h2>
              <div className="space-y-4">
                <p>
                  <FaClock className="inline mr-2 text-primary" />
                  {driver.experience} years of experience
                </p>
                <p>
                  <FaCar className="inline mr-2 text-primary" />
                  {driver.vehicleTypes.join(', ')}
                </p>
                <p>
                  <FaLanguage className="inline mr-2 text-primary" />
                  {driver.languages?.join(', ')}
                </p>
              </div>
            </div>

            {/* Booking section */}
            <div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Booking Information</h2>
                <p className="text-2xl font-bold text-primary mb-2">
                  ${driver.hourlyRate}/hour
                </p>
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show booking modal when open */}
      {bookingModalOpen && <BookingModal />}
    </div>
  );
};

export default DriverDetails;