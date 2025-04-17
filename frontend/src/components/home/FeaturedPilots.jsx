import React from 'react';
import { Link } from 'react-router-dom';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { FaCar, FaStar, FaLanguage, FaShieldAlt, FaArrowRight } from 'react-icons/fa';

// Import local pilot images
import pilot1Image from '@/assets/images/pilots/pilot2.jpg';
import pilot2Image from '@/assets/images/pilots/pilot4.jpg';
import pilot3Image from '@/assets/images/pilots/pilot5.jpg';

const PilotCard = ({ pilot, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
  >
    <div className="relative h-64">
      <img
        src={pilot.profilePhoto}
        alt={pilot.name}
        className="w-full h-full object-cover"
      />
      {pilot.isAvailable && (
        <div className="absolute bottom-4 left-4">
          <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Available Now
          </span>
        </div>
      )}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-2 py-1">
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="font-bold">{pilot.rating}</span>
        </div>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
        {pilot.name}
      </h3>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <FaCar className="mr-2 text-primary" />
          <span>{pilot.vehicleTypes.join(', ')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaLanguage className="mr-2 text-primary" />
          <span>{pilot.languages.join(', ')}</span>
        </div>
        
        <div className="flex items-center text-gray-600">
          <FaShieldAlt className="mr-2 text-primary" />
          <span className="text-sm">{pilot.certifications[0]}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <span className="text-2xl font-bold text-primary">${pilot.hourlyRate}</span>
          <span className="text-sm text-gray-500">/hr</span>
        </div>
        
        <Link
          to={`/pilot/${pilot._id}`}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all group"
        >
          View Profile
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </motion.div>
);

const FeaturedPilots = () => {
  const featuredPilots = [
    {
      _id: "1",
      name: "David Johnson",
      profilePhoto: pilot1Image,
      rating: 4.9,
      vehicleTypes: ["Sedan", "SUV", "Luxury"],
      languages: ["English", "French"],
      certifications: ["Professional Driver's License", "Advanced Defensive Driving"],
      hourlyRate: 45,
      isAvailable: true,
      featured: true
    },
    {
      _id: "2",
      name: "Sarah Williams",
      profilePhoto: pilot2Image,
      rating: 4.8,
      vehicleTypes: ["Luxury", "Premium"],
      languages: ["English", "Spanish"],
      certifications: ["Professional Driver's License", "VIP Security Training"],
      hourlyRate: 50,
      isAvailable: true,
      featured: true
    },
    {
      _id: "3",
      name: "Michael Rodriguez",
      profilePhoto: pilot3Image,
      rating: 4.7,
      vehicleTypes: ["SUV", "Van"],
      languages: ["English", "Spanish", "Portuguese"],
      certifications: ["Professional Driver's License", "Passenger Safety Expert"],
      hourlyRate: 40,
      isAvailable: false,
      featured: true
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Featured Pilots
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Meet our top-rated professional drivers
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience luxury and reliability with our carefully selected professional pilots
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPilots.map((pilot, index) => (
            <PilotCard key={pilot._id} pilot={pilot} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            to="/pilots"
            className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all group"
          >
            View All Pilots
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedPilots;