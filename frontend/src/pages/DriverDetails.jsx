import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaCar, FaCheck, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLanguage } from 'react-icons/fa';
// Remove axios import if not used
// import axios from 'axios';

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

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/drivers/${id}`);
        // setDriver(response.data);
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setDriver({
            id,
            name: 'David Johnson',
            profilePhoto: 'https://ik.imagekit.io/bxi3adntf/pilots/pilot1.jpg',
            rating: 4.9,
            reviewCount: 124, // Changed from 'reviews' to 'reviewCount' to avoid duplicate key
            experience: 6,
            hourlyRate: 45,
            isAvailable: true,
            languages: ['English', 'Spanish', 'French'],
            description: 'Professional driver with over 6 years of experience specializing in luxury and executive transportation. I prioritize safety, punctuality, and exceptional customer service to ensure a comfortable journey for all my clients.',
            vehicleTypes: ['Sedan', 'SUV', 'Luxury'],
            certifications: [
              'Professional Driver\'s License',
              'Advanced Defensive Driving',
              'VIP Security Training'
            ],
            locations: ['Downtown', 'Airport', 'Suburbs', 'Long Distance'],
            contactInfo: {
              email: 'david.johnson@gopilot.com',
              phone: '(555) 123-4567'
            },
            vehicle: {
              make: 'Mercedes-Benz',
              model: 'S-Class',
              year: 2022,
              color: 'Black',
              licensePlate: 'GP-1234',
              photo: 'https://ik.imagekit.io/bxi3adntf/vehicles/car1.jpg'
            },
            availability: {
              weekdays: '6:00 AM - 10:00 PM',
              weekends: '8:00 AM - 12:00 AM'
            },
            reviews: [
              {
                id: 1,
                user: 'Sarah M.',
                rating: 5,
                date: '2023-06-15',
                comment: 'David was punctual, professional and an excellent driver. The car was immaculate and the ride was smooth.'
              },
              {
                id: 2,
                user: 'Michael T.',
                rating: 5,
                date: '2023-05-22',
                comment: 'Outstanding service! David made our airport transfer stress-free and comfortable.'
              },
              {
                id: 3,
                user: 'Jennifer K.',
                rating: 4,
                date: '2023-04-10',
                comment: 'Great experience, very professional and knowledgeable about the city.'
              }
            ]
          });
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching driver details:', err);
        setError('Failed to load pilot details. Please try again.');
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    // For demo purposes, we'll just close the modal and show an alert
    alert(`Booking requested with ${driver.name} for ${selectedDate} at ${selectedTime}`);
    setBookingModalOpen(false);
  };

  const BookingModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={() => setBookingModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-xl font-bold mb-4">Book {driver.name}</h3>
        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input 
              type="text" 
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your pickup address"
              required
            />
          </div>
          
          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
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
      <div className="bg-gradient-to-r from-gray-900 to-black py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src={driver.profilePhoto} 
                alt={driver.name} 
                className="h-64 w-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
              {driver.isAvailable && (
                <div className="absolute bottom-4 right-4 bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  Available Now
                </div>
              )}
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{driver.name}</h1>
              <div className="flex items-center justify-center lg:justify-start text-yellow-400 mb-3">
                <FaStar className="mr-1" />
                <span className="text-white font-medium">{driver.rating}</span>
                <span className="text-gray-300 ml-1">({driver.reviewCount} reviews)</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-2xl">{driver.description}</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                {driver.vehicleTypes.map((type, index) => (
                  <span key={index} className="inline-flex items-center bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                    <FaCar className="mr-1 text-primary" />
                    {type}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => setBookingModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setSelectedTab('about')} 
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === 'about' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setSelectedTab('vehicle')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === 'vehicle' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Vehicle
              </button>
              <button
                onClick={() => setSelectedTab('reviews')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  selectedTab === 'reviews' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {selectedTab === 'about' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold mb-4">Pilot Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start">
                      <FaClock className="text-primary mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Experience</p>
                        <p className="text-gray-600">{driver.experience} years</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Service Areas</p>
                        <p className="text-gray-600">{driver.locations.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaLanguage className="text-primary mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Languages</p>
                        <p className="text-gray-600">{driver.languages.join(', ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FaCalendarAlt className="text-primary mt-1 mr-3" />
                      <div>
                        <p className="font-medium">Availability</p>
                        <p className="text-gray-600">Weekdays: {driver.availability.weekdays}</p>
                        <p className="text-gray-600">Weekends: {driver.availability.weekends}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">Certifications</h3>
                  <ul className="space-y-2 mb-8">
                    {driver.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FaPhoneAlt className="text-primary mr-3" />
                        <span>{driver.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <FaEnvelope className="text-primary mr-3" />
                        <span>{driver.contactInfo.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Hourly Rate</span>
                      <span className="text-2xl font-bold text-primary">${driver.hourlyRate}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Additional charges may apply for special requests</p>
                    <button 
                      onClick={() => setBookingModalOpen(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg mt-4 transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'vehicle' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img 
                      src={driver.vehicle.photo} 
                      alt={`${driver.vehicle.make} ${driver.vehicle.model}`}
                      className="w-full h-64 object-cover rounded-xl mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Make & Model</p>
                        <p className="font-medium">{driver.vehicle.make} {driver.vehicle.model}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{driver.vehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Color</p>
                        <p className="font-medium">{driver.vehicle.color}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">License Plate</p>
                        <p className="font-medium">{driver.vehicle.licensePlate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold mb-4">Vehicle Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>Air conditioning</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>Leather seats</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>Bluetooth connectivity</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>USB charging ports</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>Complimentary water</span>
                      </li>
                      <li className="flex items-center">
                        <FaCheck className="text-green-500 mr-2" />
                        <span>Child seats available on request</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {selectedTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Client Reviews</h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-semibold">{driver.rating}</span>
                    <span className="text-gray-500 ml-1">({driver.reviewCount} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {driver.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            to="/pilots" 
            className="text-primary hover:text-primary/80 font-medium"
          >
            ← Back to all pilots
          </Link>
        </div>
      </div>
      
      {bookingModalOpen && <BookingModal />}
    </div>
  );
};

export default DriverDetails;