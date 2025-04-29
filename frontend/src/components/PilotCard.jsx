// src/components/PilotCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCar, FaLanguage, FaShieldAlt } from 'react-icons/fa';

const PilotCard = ({ pilot }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={pilot.profilePhoto}
          alt={pilot.name}
          className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1.5" />
            <span className="font-semibold">{pilot.rating}</span>
          </div>
        </div>
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
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {pilot.name}
        </h3>
        <div className="space-y-3 mb-4">
          <p className="text-gray-600 flex items-center">
            <span className="mr-2 text-green-500">✓</span>
            <span className="font-medium">{pilot.experience}</span> years experience
          </p>
          <p className="text-gray-600 flex items-center">
            <FaCar className="mr-2 text-primary" />
            <span>{pilot.vehicleTypes.join(', ')}</span>
          </p>
          <p className="text-gray-600 flex items-center">
            <FaLanguage className="mr-2 text-primary" />
            <span>{pilot.languages.join(', ')}</span>
          </p>
          {pilot.certifications && (
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

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${pilot.hourlyRate}
            </span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>
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

export default PilotCard;