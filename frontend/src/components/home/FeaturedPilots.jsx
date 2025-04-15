// frontend/src/components/home/FeaturedPilots.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaCar, FaLanguage } from 'react-icons/fa';

const PilotCard = ({ pilot }) => {
  return (
    <div className="bg-white rounded-xl shadow-card group hover:shadow-hover transition-all duration-300 overflow-hidden">
      <div className="relative h-64">
        <img 
          src={pilot.profilePhoto} 
          alt={pilot.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {pilot.isAvailable && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
              <span className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse"></span>
              Available Now
            </span>
          </div>
        )}

        {pilot.featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {pilot.name}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 font-medium">{pilot.rating}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-center">
            <FaCar className="mr-2 text-primary" />
            {pilot.vehicleTypes.join(', ')}
          </p>
          <p className="text-gray-600 flex items-center">
            <FaLanguage className="mr-2 text-primary" />
            {pilot.languages ? pilot.languages.join(', ') : 'English'}
          </p>
          
          {pilot.certifications && (
            <div className="flex flex-wrap gap-1 mt-2">
              {pilot.certifications.slice(0, 2).map((cert, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  <span className="text-green-500 mr-1">✓</span>
                  {cert}
                </span>
              ))}
              {pilot.certifications.length > 2 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  +{pilot.certifications.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-primary">${pilot.hourlyRate}</span>
            <span className="text-sm text-gray-500">/hr</span>
          </div>
          <Link
            to={`/pilot/${pilot.id}`}
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

const FeaturedPilots = () => {
  // This would come from your API in a real app
  const featuredPilots = [
    {
      id: 1,
      name: "David Johnson",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot1.jpg",
      rating: 4.9,
      vehicleTypes: ["Sedan", "SUV", "Luxury"],
      languages: ["English", "French"],
      certifications: ["Professional Driver's License", "Advanced Defensive Driving"],
      hourlyRate: 45,
      isAvailable: true,
      featured: true
    },
    {
      id: 2,
      name: "Sarah Williams",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot2.jpg",
      rating: 4.8,
      vehicleTypes: ["Luxury", "Premium"],
      languages: ["English", "Spanish"],
      certifications: ["Professional Driver's License", "VIP Security Training", "First Aid Certified"],
      hourlyRate: 50,
      isAvailable: true,
      featured: true
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/pilots/pilot3.jpg",
      rating: 4.7,
      vehicleTypes: ["SUV", "Van"],
      languages: ["English", "Spanish", "Portuguese"],
      certifications: ["Professional Driver's License", "Passenger Safety Expert"],
      hourlyRate: 40,
      isAvailable: false,
      featured: true
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Featured Pilots</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated professional drivers who provide exceptional service
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPilots.map(pilot => (
            <PilotCard key={pilot.id} pilot={pilot} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/pilots"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full bg-secondary text-white hover:bg-secondary/90 transition-colors"
          >
            View All Pilots
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round"  
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPilots;