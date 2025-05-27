// frontend/src/pages/Drivers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaCheck } from 'react-icons/fa';
import PilotCard from '../components/PilotCard';
import driverService from '../services/driverService';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    vehicleType: '',
    minRating: 0,
    maxPrice: '',
    availability: false
  });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const driversData = await driverService.getAllDrivers();
      setDrivers(driversData);
      setFilteredDrivers(driversData);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError('Failed to load pilots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, drivers]);

  const applyFilters = () => {
    let results = [...drivers];
    
    if (searchTerm) {
      results = results.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicleTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filters.vehicleType) {
      results = results.filter(driver => 
        driver.vehicleTypes.some(type => type.toLowerCase() === filters.vehicleType.toLowerCase())
      );
    }
    
    if (filters.minRating > 0) {
      results = results.filter(driver => driver.rating >= filters.minRating);
    }
    
    if (filters.maxPrice) {
      results = results.filter(driver => driver.hourlyRate <= parseInt(filters.maxPrice));
    }
    
    if (filters.availability) {
      results = results.filter(driver => driver.isAvailable);
    }
    
    setFilteredDrivers(results);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      vehicleType: '',
      minRating: 0,
      maxPrice: '',
      availability: false
    });
    setSearchTerm('');
  };

  const handleSort = (e) => {
    const sortedDrivers = [...filteredDrivers];
    switch(e.target.value) {
      case 'rating':
        sortedDrivers.sort((a, b) => b.rating - a.rating);
        break;
      case 'price':
        sortedDrivers.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'experience':
        sortedDrivers.sort((a, b) => b.experience - a.experience);
        break;
      default:
        break;
    }
    setFilteredDrivers(sortedDrivers);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Professional Pilot
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse our selection of experienced and professional pilots ready to provide you with a safe and comfortable journey.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search pilots by name or vehicle type..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filter controls */}
              {/* Add your filter controls here */}
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrivers.map((driver, index) => (
              <motion.div
                key={driver._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/pilot/${driver._id}`} className="block">
                  <PilotCard pilot={driver} />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {filteredDrivers.length === 0 && !loading && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500">No pilots found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers;