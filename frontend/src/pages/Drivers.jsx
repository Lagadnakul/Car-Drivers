import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import PilotCard from '../components/PilotCard';

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

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // const response = await axios.get('/api/pilots');
        // setDrivers(response.data);
        
        // For demo, we'll use mock data
        setTimeout(() => {
          const mockDrivers = [
            {
              id: 1,
              name: "David Johnson",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot1.jpg",
              rating: 4.9,
              reviews: 124,
              experience: 6,
              hourlyRate: 45,
              isAvailable: true,
              languages: ['English', 'Spanish'],
              vehicleTypes: ['Sedan', 'SUV']
            },
            {
              id: 2,
              name: "Sarah Williams",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot2.jpg",
              rating: 4.7,
              reviews: 98,
              experience: 4,
              hourlyRate: 40,
              isAvailable: true,
              languages: ['English', 'French'],
              vehicleTypes: ['Luxury', 'Sedan']
            },
            {
              id: 3,
              name: "Michael Chen",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot3.jpg",
              rating: 4.8,
              reviews: 112,
              experience: 5,
              hourlyRate: 42,
              isAvailable: false,
              languages: ['English', 'Mandarin'],
              vehicleTypes: ['SUV', 'Van']
            },
            {
              id: 4,
              name: "Emily Rodriguez",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot4.jpg",
              rating: 4.6,
              reviews: 87,
              experience: 3,
              hourlyRate: 38,
              isAvailable: true,
              languages: ['English', 'Spanish'],
              vehicleTypes: ['Sedan', 'Compact']
            },
            {
              id: 5,
              name: "James Wilson",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot5.jpg",
              rating: 5.0,
              reviews: 156,
              experience: 8,
              hourlyRate: 55,
              isAvailable: true,
              languages: ['English'],
              vehicleTypes: ['Luxury', 'Executive']
            },
            {
              id: 6,
              name: "Sophia Lee",
              profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot6.jpg",
              rating: 4.9,
              reviews: 143,
              experience: 7,
              hourlyRate: 50,
              isAvailable: false,
              languages: ['English', 'Korean'],
              vehicleTypes: ['Sedan', 'Luxury']
            }
          ];
          
          setDrivers(mockDrivers);
          setFilteredDrivers(mockDrivers);
          setLoading(false);
        }, 800);
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

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Professional Pilot</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Browse our selection of experienced and professional pilots ready to provide you with a safe and comfortable journey.
          </p>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search pilots by name or vehicle type..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center">
              <button 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg flex items-center transition-colors"
                onClick={() => document.getElementById('filterModal').classList.toggle('hidden')}
              >
                <FaFilter className="mr-2" />
                Filters
              </button>
              
              {(filters.vehicleType || filters.minRating > 0 || filters.maxPrice || filters.availability) && (
                <button 
                  className="ml-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          {/* Filter Modal */}
          <div id="filterModal" className="hidden mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <select 
                  name="vehicleType"
                  value={filters.vehicleType}
                  onChange={handleFilterChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="van">Van</option>
                  <option value="compact">Compact</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                <div className="flex items-center space-x-2">
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
                      <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                        parseFloat(filters.minRating) === rating 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}>
                        {rating > 0 ? (
                          <>
                            <FaStar className="mr-1" /> {rating}+
                          </>
                        ) : 'Any'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price ($/hr)</label>
                <input
                  type="number"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Any price"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={filters.availability}
                    onChange={handleFilterChange}
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <span className="ml-2">Available Now</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary border-solid"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No pilots found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">{filteredDrivers.length} {filteredDrivers.length === 1 ? 'pilot' : 'pilots'} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDrivers.map(driver => (
                <PilotCard key={driver.id} pilot={driver} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Drivers;