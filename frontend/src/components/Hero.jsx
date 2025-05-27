// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Professional <span className="text-primary">Pilot</span> Awaits
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Experience luxury travel with our professional pilots. Safe, reliable, and comfortable journeys guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/pilots" 
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
              >
                Find a Pilot
              </Link>
              <Link 
                to="/about" 
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="hidden lg:flex justify-end items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-sm mx-auto"> {/* Changed from max-w-md to max-w-sm */}
              <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
              <img 
                src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Home%202.png?updatedAt=1744652487811" 
                alt="Luxury car service"
                className="relative z-10 w-full h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;