// filepath: d:\VS CODE\Car Driver\frontend\src\pages\DriverDetails.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaCar, FaClock, FaCreditCard, FaLanguage, FaMapMarkerAlt, FaStar, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import driverService from '../services/driverService';

const DriverDetails = () => {
  // ✅ GET DRIVER ID FROM URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ STATE MANAGEMENT
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // ✅ BOOKING FORM STATE
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');

  // ✅ FETCH DRIVER DETAILS
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`📥 Fetching details for driver: ${id}`);

        if (!id) {
          throw new Error('Driver ID not found');
        }

        const data = await driverService.getDriverById(id);

        if (!data) {
          throw new Error('Driver not found');
        }

        console.log('✅ Driver details loaded:', data);
        setDriver(data);
      } catch (err) {
        console.error('❌ Error loading driver:', err);
        const errorMessage = err.message || 'Failed to load driver details';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [id]);

  // ✅ CALCULATE TOTAL AMOUNT
  const calculateTotalAmount = () => {
    if (!driver?.hourlyRate) return 0;
    return (driver.hourlyRate * duration).toFixed(2);
  };

  // ✅ VALIDATE BOOKING FORM
  const validateBooking = () => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return false;
    }
    if (!selectedTime) {
      toast.error('Please select a time');
      return false;
    }
    if (!pickupLocation.trim()) {
      toast.error('Please enter pickup location');
      return false;
    }
    if (duration < 1) {
      toast.error('Duration must be at least 1 hour');
      return false;
    }
    return true;
  };

  // ✅ HANDLE BOOKING SUBMISSION
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Check if user is logged in
      if (!user) {
        toast.error('Please login to book a driver');
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      // Validate form
      if (!validateBooking()) {
        return;
      }

      setBookingLoading(true);

      // Create datetime objects
      const startDateTime = new Date(`${selectedDate}T${selectedTime}`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(endDateTime.getHours() + parseInt(duration));

      // Prepare booking data
      const bookingData = {
        driverId: driver._id,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
        pickupLocation,
        dropLocation: dropoffLocation || pickupLocation,
        totalAmount: calculateTotalAmount(),
        paymentMethod: 'COD'
      };

      console.log('📤 Submitting booking:', bookingData);

      // Submit booking
      const response = await driverService.createBooking(bookingData);

      if (response.success) {
        toast.success('✅ Booking confirmed successfully!');
        setBookingModalOpen(false);
        
        // Navigate to booking success page
        navigate('/booking/success', {
          state: {
            booking: response.booking,
            driver
          }
        });
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      const errorMessage = err.message || 'Failed to create booking';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  // ✅ LOADING STATE
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading driver details...</p>
        </div>
      </div>
    );
  }

  // ✅ ERROR STATE
  if (error && !driver) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded max-w-md">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Driver</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ DRIVER NOT FOUND
  if (!driver) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Driver not found</p>
          <button
            onClick={() => navigate('/drivers')}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded"
          >
            Back to Drivers
          </button>
        </div>
      </div>
    );
  }

  // ✅ RENDER DRIVER DETAILS
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Profile Photo */}
            <div className="md:col-span-1">
              <img
                src={driver.profilePhoto}
                alt={driver.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            {/* Driver Info */}
            <div className="md:col-span-2 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{driver.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(driver.rating || 0) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="text-gray-600">{driver.rating || 'N/A'} ({driver.totalRatings || 0} ratings)</span>
                </div>

                {/* Experience */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Experience</p>
                    <p className="text-lg font-semibold">{driver.experience || 'N/A'} years</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Hourly Rate</p>
                    <p className="text-lg font-semibold">${driver.hourlyRate || 'N/A'}/hour</p>
                  </div>
                </div>

                {/* Vehicle Types */}
                {driver.vehicleTypes && driver.vehicleTypes.length > 0 && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Vehicle Types</p>
                    <div className="flex flex-wrap gap-2">
                      {driver.vehicleTypes.map((type, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <FaCar className="w-4 h-4" /> {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">Availability</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    driver.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {driver.isAvailable ? '✅ Available' : '❌ Not Available'}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={() => setBookingModalOpen(true)}
                disabled={!driver.isAvailable}
                className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition ${
                  driver.isAvailable
                    ? 'bg-primary hover:bg-primary/80 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {driver.isAvailable ? '📅 Book Now' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Languages */}
          {driver.languages && driver.languages.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FaLanguage /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {driver.languages.map((lang, idx) => (
                  <span key={idx} className="bg-gray-100 px-3 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {driver.certifications && driver.certifications.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <ul className="space-y-2">
                {driver.certifications.map((cert, idx) => (
                  <li key={idx} className="text-gray-700">✓ {cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ✅ BOOKING MODAL */}
      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Book {driver.name}</h2>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2" />Pickup Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaClock className="inline mr-2" />Pickup Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (hours)
                </label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />Pickup Location
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="Enter pickup location"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Dropoff Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />Dropoff Location
                </label>
                <input
                  type="text"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  placeholder="Leave blank if same as pickup"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Payment Method (Fixed to COD) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCreditCard className="inline mr-2" />Payment Method
                </label>
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800">💵 Cash on Delivery (COD)</p>
                  <p className="text-sm text-green-600">Pay the driver directly</p>
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${calculateTotalAmount()}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 p-3 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  bookingLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/80'
                }`}
              >
                {bookingLoading ? '⏳ Booking...' : '✅ Confirm Booking'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDetails;