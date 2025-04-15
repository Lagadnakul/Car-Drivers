// frontend/src/pages/DriverDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaCar, FaCheck, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLanguage, FaShieldAlt, FaCertificate, FaTimes, FaUserTie } from 'react-icons/fa';
import { driverService } from '../services/driverService';

const DriverDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('about');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        setLoading(true);
        
        // Use your API service for real data
        const driverData = await driverService.getDriverById(id);
        setDriver(driverData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching driver details:', err);
        setError('Failed to load pilot details. Please try again.');
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
        startTime: `${selectedDate}T${selectedTime}`,
        endTime: `${selectedDate}T${selectedTime}`,
        pickupLocation,
        dropLocation: dropoffLocation,
        vehicleDetails: {
          type: driver.vehicleTypes[0] || 'sedan',
          model: driver.vehicle.model,
          make: driver.vehicle.make,
          year: driver.vehicle.year,
          licensePlate: driver.vehicle.licensePlate
        }
      };
      
      await driverService.bookDriver(bookingData);
      setBookingSuccess(true);
      
      // Navigate after successful booking
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
      setError('Failed to make booking. Please try again.');
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
          transition={{ type: "spring", duration: 0.5 }}
        >
          <button 
            onClick={() => setBookingModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            disabled={bookingSuccess}
          >
            <FaTimes className="w-6 h-6" />
          </button>
          
          {bookingSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Successful!</h3>
              <p className="text-gray-600 mb-6">
                Your booking with {driver.name} is being processed. Redirecting you to the confirmation page...
              </p>
              <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <img 
                  src={driver.profilePhoto} 
                  alt={driver.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold">Book {driver.name}</h3>
                  <div className="flex items-center text-sm">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{driver.rating} ({driver.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input 
                    type="time" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
                  <input 
                    type="text" 
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your pickup address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dropoff Location</label>
                  <input 
                    type="text" 
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your destination"
                    required
                  />
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Hourly Rate</span>
                    <span className="font-medium">${driver.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Estimated Total</span>
                    <span className="font-bold text-primary">${driver.hourlyRate} minimum</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
      </div>
    );
  }

  if (error || !driver) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700">{error || "Pilot not found"}</p>
          <button 
            onClick={() => navigate('/pilots')}
            className="mt-3 text-primary hover:underline"
          >
            Go back to pilots
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pb-12">
      {/* Hero section with driver info */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-16 mb-8">
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div 
              className="lg:col-span-2 flex justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <img 
                  src={driver.profilePhoto} 
                  alt={driver.name} 
                  className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-full border-4 border-white/30 shadow-2xl"
                />
                {driver.isAvailable && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-4 py-1 rounded-full flex items-center shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                    Available Now
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-bold">{driver.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-3 text-center lg:text-left"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{driver.name}</h1>
              <div className="flex items-center justify-center lg:justify-start text-yellow-400 mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star} 
                      className={`${star <= Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-400'} mr-1`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium ml-2">{driver.rating}</span>
                <span className="text-gray-300 ml-1">({driver.reviewCount} reviews)</span>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto lg:mx-0">{driver.description}</p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                {driver.vehicleTypes.map((type, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center bg-gray-800/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm"
                  >
                    <FaCar className="mr-2 text-primary" />
                    {type}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <button 
                  onClick={() => setBookingModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg flex items-center"
                >
                  <FaClock className="mr-2" />
                  Book Now
                </button>
                <a 
                  href={`tel:${driver.contactInfo.phone.replace(/[^0-9]/g, '')}`}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition duration-300 backdrop-blur-sm"
                >
                  <FaPhoneAlt className="mr-2 inline-block" />
                  Contact
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setSelectedTab('about')} 
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === 'about' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Driver Info
              </button>
              <button
                onClick={() => setSelectedTab('vehicle')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === 'vehicle' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Vehicle
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === 'reviews' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setSelectedTab('certifications')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  selectedTab === 'certifications' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Certifications
              </button>
            </div>
          </div>
          
          {/* Tab content */}
          <div className="p-6 md:p-8">
            {/* About Tab */}
            {selectedTab === 'about' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaUserTie className="mr-3 text-primary" />
                    Driver Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
                      <div className="flex items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FaClock className="text-primary h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">Experience</p>
                          <p className="text-gray-600">{driver.experience} years of professional driving</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
                      <div className="flex items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FaMapMarkerAlt className="text-primary h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">Service Areas</p>
                          <p className="text-gray-600">{driver.locations.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
                      <div className="flex items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FaLanguage className="text-primary h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">Languages</p>
                          <p className="text-gray-600">{driver.languages.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition duration-300">
                      <div className="flex items-start">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <FaCalendarAlt className="text-primary h-6 w-6" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-lg mb-1">Availability</p>
                          <p className="text-gray-600">Weekdays: {driver.availability.weekdays}</p>
                          <p className="text-gray-600">Weekends: {driver.availability.weekends}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="p-2 bg-primary/10 rounded-lg mr-3">
                        <FaPhoneAlt className="text-primary h-5 w-5" />
                      </div>
                      Contact
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaPhoneAlt className="text-primary mr-3" />
                        <a href={`tel:${driver.contactInfo.phone}`} className="text-gray-600 hover:text-primary transition-colors">
                          {driver.contactInfo.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-primary mr-3" />
                        <a href={`mailto:${driver.contactInfo.email}`} className="text-gray-600 hover:text-primary transition-colors">
                          {driver.contactInfo.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FaClock className="text-blue-600 h-5 w-5" />
                      </div>
                      Pricing
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Hourly Rate</span>
                      <span className="text-2xl font-bold text-primary">${driver.hourlyRate}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 mb-5">Additional charges may apply for special requests</p>
                    <button 
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <FaClock className="mr-2" />
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vehicle Tab */}
            {selectedTab === 'vehicle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCar className="mr-3 text-primary" />
                  Vehicle Details
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="relative rounded-xl overflow-hidden mb-6 group">
                      <img 
                        src={driver.vehicle.photo} 
                        alt={`${driver.vehicle.make} ${driver.vehicle.model}`}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h4 className="text-2xl font-bold text-white">{driver.vehicle.make} {driver.vehicle.model}</h4>
                        <p className="text-white/90">Luxury transport experience</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">Make & Model</p>
                        <p className="font-medium">{driver.vehicle.make} {driver.vehicle.model}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">Year</p>
                        <p className="font-medium">{driver.vehicle.year}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">Color</p>
                        <p className="font-medium">{driver.vehicle.color}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">License Plate</p>
                        <p className="font-medium">{driver.vehicle.licensePlate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-blue-50 rounded-xl p-6 mb-6">
                      <h3 className="text-xl font-semibold mb-5 flex items-center">
                        <div className="p-2 bg-primary/10 rounded-lg mr-3">
                          <FaShieldAlt className="text-primary h-5 w-5" />
                        </div>
                        Vehicle Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {driver.vehicle.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-center bg-white p-3 rounded-lg shadow-sm"
                          >
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              <FaCheck className="text-primary h-4 w-4" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full transform translate-x-8 -translate-y-8"></div>
                      <div className="relative">
                        <h4 className="text-lg font-semibold mb-4">Premium Experience Guarantee</h4>
                        <p className="text-gray-600 mb-4">
                          All our vehicles are regularly maintained to ensure the highest levels of comfort, safety, and performance during your journey.
                        </p>
                        <button 
                          onClick={() => setBookingModalOpen(true)}
                          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition duration-300 inline-flex items-center"
                        >
                          Book This Vehicle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Reviews Tab */}
            {selectedTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <h3 className="text-2xl font-semibold flex items-center">
                    <FaStar className="mr-3 text-primary" />
                    Client Reviews
                  </h3>
                  
                  <div className="flex items-center bg-gray-50 px-4 py-2 rounded-lg">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar 
                          key={star} 
                          className={`${star <= Math.floor(driver.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="font-semibold">{driver.rating}</span>
                      <span className="text-gray-500 ml-1">({driver.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {driver.reviews.map((review, index) => (
                    <motion.div 
                      key={review.id} 
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-3">
                        <h4 className="font-semibold text-lg">{review.user}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic">"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Certifications Tab */}
            {selectedTab === 'certifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCertificate className="mr-3 text-primary" />
                  Professional Certifications
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {driver.certifications.map((cert, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <FaCertificate className="text-primary h-6 w-6" />
                        </div>
                        <h4 className="font-semibold text-lg">{cert}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-start mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FaShieldAlt className="text-blue-600 h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Safety & Quality Assurance</h4>
                      <p className="text-gray-600">
                        At Go Pilot, we ensure all our drivers maintain the highest professional standards by requiring regular certification updates, rigorous background checks, and ongoing training to deliver a premium transportation experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setBookingModalOpen(true)}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition duration-300 inline-flex items-center"
                    >
                      Book With {driver.name}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <div className="text-center">
          <Link 
            to="/pilots" 
            className="text-primary hover:text-primary/80 font-medium flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all pilots
          </Link>
        </div>
      </section>
      
      {bookingModalOpen && <BookingModal />}
    </div>
  );
};

export default DriverDetails;