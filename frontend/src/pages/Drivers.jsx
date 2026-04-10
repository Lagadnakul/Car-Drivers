// frontend/src/pages/Drivers.jsx
import { useEffect, useState } from 'react';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import ErrorAlert from '../components/ErrorAlert';
import FilterPanel from '../components/FilterPanel';
import LoadingSpinner from '../components/LoadingSpinner';
import PilotCard from '../components/PilotCard';
import driverService from '../services/driverService';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    vehicleType: '',
    minRating: 0,
    maxPrice: '',
    availability: false
  });

  // Fetch available drivers on component mount
  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  const fetchAvailableDrivers = async () => {
    try {
      setLoading(true);
      setError(null);
      const driversData = await driverService.getAvailableDrivers();
      setDrivers(driversData);
      setFilteredDrivers(driversData);
    } catch (err) {
      console.error('Error fetching available drivers:', err);
      setError('Failed to load available pilots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters when search term or filters change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters, drivers]);

  const applyFilters = () => {
    let results = [...drivers];
    
    // Search filter
    if (searchTerm) {
      results = results.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicleTypes.some(type => 
          type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Vehicle type filter
    if (filters.vehicleType) {
      results = results.filter(driver => 
        driver.vehicleTypes.some(type => 
          type.toLowerCase() === filters.vehicleType.toLowerCase()
        )
      );
    }
    
    // Rating filter
    if (filters.minRating > 0) {
      results = results.filter(driver => driver.rating >= filters.minRating);
    }
    
    // Price filter
    if (filters.maxPrice) {
      results = results.filter(driver => driver.hourlyRate <= parseFloat(filters.maxPrice));
    }
    
    // Availability filter
    if (filters.availability) {
      results = results.filter(driver => driver.isAvailable);
    }
    
    setFilteredDrivers(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pilots by name or vehicle type..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Filter Panel */}
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Error Message */}
      {error && <ErrorAlert message={error} />}

      {/* Results Count */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {filteredDrivers.length} Pilots Available
        </h2>
      </div>

      {/* Drivers Grid */}
   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredDrivers.map((driver) => (
    <PilotCard key={driver._id} pilot={driver} />
  ))}
</div>

      {/* No Results Message */}
      {filteredDrivers.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl text-gray-600">
            No pilots found matching your criteria.
          </h3>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                vehicleType: '',
                minRating: 0,
                maxPrice: '',
                availability: false
              });
            }}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Drivers;