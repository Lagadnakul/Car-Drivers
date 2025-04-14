// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-black">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
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
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Car.3.jpg/hero-car.jpg" 
              alt="Luxury car service"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;