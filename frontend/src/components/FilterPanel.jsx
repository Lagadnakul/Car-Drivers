import React from 'react';
import PropTypes from 'prop-types';
import { FaFilter } from 'react-icons/fa';

const FilterPanel = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const vehicleTypes = [
    'All',
    'Sedan',
    'SUV',
    'Luxury',
    'Van',
    'Premium'
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Vehicle Type Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          name="vehicleType"
          value={filters.vehicleType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Vehicle Types</option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="flex-1 min-w-[200px]">
        <select
          name="minRating"
          value={filters.minRating}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="0">Any Rating</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
          <option value="4.8">4.8+ Stars</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="number"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleChange}
          placeholder="Max Price/hr"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Availability Filter */}
      <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="availability"
            checked={filters.availability}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span className="ms-3 text-sm font-medium text-gray-700">Available Now</span>
        </label>
      </div>

      {/* Filter Icon */}
      <div className="flex items-center text-gray-500">
        <FaFilter className="w-5 h-5" />
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    vehicleType: PropTypes.string,
    minRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    availability: PropTypes.bool
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterPanel;