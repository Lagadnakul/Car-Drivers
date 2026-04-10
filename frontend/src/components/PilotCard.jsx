// src/components/PilotCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCar, FaLanguage, FaShieldAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const defaultPilotImage = "https://ui-avatars.com/api/?name=Default+Pilot&background=random";

const PilotCard = ({ pilot }) => {
  const imageUrl = pilot.profilePhoto || defaultPilotImage;

  const handleImageError = (e) => {
    e.target.src = defaultPilotImage;
    e.target.onerror = null;
  };


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="relative aspect-w-16 aspect-h-9">
        <img
          src={imageUrl}
          alt={pilot.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1.5" />
            <span className="font-semibold">{pilot.rating || '4.5'}</span>
          </div>
        </div>

        {/* Availability Badge */}
        {pilot.isAvailable && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Available Now
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Pilot Name */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {pilot.name}
        </h3>

        {/* Pilot Details */}
        <div className="space-y-3 mb-4">
          {/* Experience */}
          <p className="text-gray-600 flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            <span className="font-medium">{pilot.experience}</span> years experience
          </p>

          {/* Vehicle Types */}
          {pilot.vehicleTypes?.length > 0 && (
            <p className="text-gray-600 flex items-center">
              <FaCar className="mr-2 text-primary" />
              <span>{pilot.vehicleTypes.join(', ')}</span>
            </p>
          )}

          {/* Languages */}
          {pilot.languages?.length > 0 && (
            <p className="text-gray-600 flex items-center">
              <FaLanguage className="mr-2 text-primary" />
              <span>{pilot.languages.join(', ')}</span>
            </p>
          )}

          {/* Certifications */}
          {pilot.certifications?.length > 0 && (
            <div className="flex items-center text-gray-600">
              <FaShieldAlt className="mr-2 text-primary" />
              <span className="text-sm">
                {pilot.certifications[0]}
                {pilot.certifications.length > 1 && (
                  <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    +{pilot.certifications.length - 1} more
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          {/* Hourly Rate */}
          <div>
            <span className="text-2xl font-bold text-primary">
              ${pilot.hourlyRate}
            </span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>

          {/* View Profile Link */}
          <Link
            to={`/pilot/${pilot._id}`}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors flex items-center group-hover:translate-x-1 duration-300"
          >
            View Profile
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

PilotCard.propTypes = {
  pilot: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profilePhoto: PropTypes.string,
    rating: PropTypes.number,
    isAvailable: PropTypes.bool,
    experience: PropTypes.number,
    vehicleTypes: PropTypes.arrayOf(PropTypes.string),
    languages: PropTypes.arrayOf(PropTypes.string),
    certifications: PropTypes.arrayOf(PropTypes.string),
    hourlyRate: PropTypes.number.isRequired
  }).isRequired
};

export default PilotCard;