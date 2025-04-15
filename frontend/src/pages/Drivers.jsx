// frontend/src/pages/Drivers.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaCheck } from 'react-icons/fa';
import PilotCard from '../components/PilotCard';
import { driverService } from '../services/driverService';

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
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        
        // Use the API service instead of mock data
        const driversData = await driverService.getAllDrivers();
        setDrivers(driversData);
        setFilteredDrivers(driversData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching drivers:', err);
        setError('Failed to load pilots. Please try again.');
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...drivers];
    
    // Apply search term
    if (searchTerm) {
      results = results.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicleTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply filters
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
  }, [searchTerm, filters, drivers]);

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

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Advanced filtering with backend
  const applyAdvancedFilters = async () => {
    try {
      setLoading(true);
      const apiFilters = {
        vehicleType: filters.vehicleType || undefined,
        available: filters.availability || undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        maxPrice: filters.maxPrice || undefined
      };
      
      const filteredData = await driverService.getAllDrivers(apiFilters);
      setDrivers(filteredData);
      setFilteredDrivers(filteredData);
      setLoading(false);
    } catch (err) {
      console.error('Error applying filters:', err);
      setError('Failed to apply filters. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Find Your Professional Pilot</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse our selection of experienced and professional pilots ready to provide you with a safe and comfortable journey.
          </p>
        </motion.div>
        
        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search pilots by name or vehicle type..."
                className="pl-12 pr-4 py-3.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                className={`${showFilters ? 'bg-primary/90' : 'bg-primary'} hover:bg-primary/80 text-white px-6 py-3.5 rounded-lg flex items-center transition-colors shadow-md`}
                onClick={toggleFilters}
              >
                <FaFilter className="mr-2" />
                Filters
              </button>
              
              {(filters.vehicleType || filters.minRating > 0 || filters.maxPrice || filters.availability) && (
                <button 
                  className="px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                  onClick={clearFilters}
                >
                  <span className="mr-1">Clear</span>
                  <span className="flex h-5 w-5 items-center justify-center bg-primary text-white rounded-full text-xs">{
                    (!!filters.vehicleType) + (filters.minRating > 0) + (!!filters.maxPrice) + (!!filters.availability)
                  }</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Panel - Animated */}
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                  <select 
                    name="vehicleType"
                    value={filters.vehicleType}
                    onChange={handleFilterChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  >
                    <option value="">All Vehicle Types</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="van">Van</option>
                    <option value="compact">Compact</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                  <div className="flex flex-wrap gap-2">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="minRating"
                          value={rating}
                          checked={parseFloat(filters.minRating) === rating}
                          onChange={handleFilterChange}
                          className="sr-only"
                        />
                        <div className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                          parseFloat(filters.minRating) === rating 
                            ? 'bg-primary text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {rating > 0 ? (
                            <>
                              <FaStar className="mr-1.5" /> {rating}+
                            </>
                          ) : 'Any'}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price ($/hr)</label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Enter maximum price"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                  />
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer bg-gray-50 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-sm w-full">
                    <input
                      type="checkbox"
                      name="availability"
                      checked={filters.availability}
                      onChange={handleFilterChange}
                      className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">Available Now</span>
                      <p className="text-sm text-gray-500">Show only pilots who are currently available</p>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={applyAdvancedFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl shadow-md"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FaCheck className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-red-800">{error}</p>
                <p className="text-red-700 mt-2">Please try refreshing the page or try again later.</p>
              </div>
            </div>
          </motion.div>
        ) : filteredDrivers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-md p-12"
          >
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-6">
              <FaSearch className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Pilots Found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">We couldn't find any pilots matching your criteria. Please try adjusting your search filters.</p>
            <button 
              onClick={clearFilters}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-700 font-medium">
                  {filteredDrivers.length} {filteredDrivers.length === 1 ? 'pilot' : 'pilots'} found
                </p>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Sort by:</span>
                  <select 
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
                    onChange={(e) => {
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
                    }}
                  >
                    <option value="rating">Rating (Highest first)</option>
                    <option value="price">Price (Lowest first)</option>
                    <option value="experience">Experience (Most first)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDrivers.map((driver, index) => (
                  <motion.div
                    key={driver._id} // Changed from driver.id to driver._id to match MongoDB IDs
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <PilotCard pilot={driver} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default Drivers;