// frontend/src/components/home/BookingSearch.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCarSide } from 'react-icons/fa';

const BookingSearch = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    vehicleType: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass search parameters to the booking page
    navigate('/booking', { state: { searchParams: formData } });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Your Professional Pilot</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-primary" /> Pickup Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter pickup address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-primary" /> Dropoff Location
              </label>
              <input
                type="text"
                id="dropoffLocation"
                name="dropoffLocation"
                value={formData.dropoffLocation}
                onChange={handleChange}
                placeholder="Enter destination address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" /> Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 flex items-center">
                <FaClock className="mr-2 text-primary" /> Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaCarSide className="mr-2 text-primary" /> Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">All Types</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="luxury">Luxury</option>
                <option value="van">Van</option>
              </select>
              
              <button
                type="submit"
                className="mt-6 md:mt-8 w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
              >
                Search Pilots
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSearch;