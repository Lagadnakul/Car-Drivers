import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg opacity-90">Join thousands of satisfied customers who trust Go Pilot</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/pilots" 
              className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Find Your Pilot
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-primary-dark text-white font-medium rounded-lg border-2 border-white hover:bg-primary-darker transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;