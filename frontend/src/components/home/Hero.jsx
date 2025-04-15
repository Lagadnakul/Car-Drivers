// frontend/src/components/home/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaClock, FaCalendar } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/pilots', { state: { ...searchParams } });
  };

  return (
    <div className="relative min-h-[85vh] flex items-center">
      {/* Background video or image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary/60"></div>
        <img 
          src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/hero-bg.jpg?updatedAt=1744453150639" 
          alt="Luxury car" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Professional <span className="text-primary">Driver</span> Just a Click Away
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-lg">
              Experience safe, reliable and comfortable journeys with our professional pilots across the city and beyond.
            </p>
            <div className="mt-8 flex space-x-4">
              <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105">
                Book Now
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white hover:border-primary hover:text-primary text-white font-medium rounded-full transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 transform md:translate-y-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Your Pilot</h2>
            
            <form onSubmit={handleSearch}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Pickup Location</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <input 
                      type="text" 
                      name="location" 
                      placeholder="Enter pickup address"
                      className="w-full focus:outline-none text-gray-800"
                      value={searchParams.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <FaCalendar className="text-gray-400 mr-2" />
                    <input 
                      type="date" 
                      name="date" 
                      className="w-full focus:outline-none text-gray-800"
                      value={searchParams.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Time</label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <FaClock className="text-gray-400 mr-2" />
                    <input 
                      type="time" 
                      name="time" 
                      className="w-full focus:outline-none text-gray-800"
                      value={searchParams.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
                >
                  <FaSearch className="mr-2" /> Find Available Pilots
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;