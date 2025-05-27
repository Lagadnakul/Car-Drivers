// frontend/src/components/home/HowItWorks.jsx
import React from 'react';
import { FaSearch, FaUserCheck, FaCar, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Step = ({ number, icon, title, description, isLast }) => {
  return (
    <div className="flex items-start">
      <div className="relative">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg">
          {number}
        </div>
        
        {!isLast && (
          <div className="absolute top-12 left-1/2 w-0.5 h-full -ml-0.5 bg-primary/20"></div>
        )}
      </div>
      
      <div className="ml-6 pb-12">
        <div className="flex items-center mb-2">
          <div className="p-2 bg-primary/10 rounded-lg text-primary mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <FaSearch className="w-5 h-5" />,
      title: "Search For a Pilot",
      description: "Enter your location, date, and time to search for available professional drivers in your area."
    },
    {
      number: 2,
      icon: <FaUserCheck className="w-5 h-5" />,
      title: "Choose Your Pilot",
      description: "Browse through profiles, check ratings, reviews, and experience to select the perfect driver for your journey."
    },
    {
      number: 3,
      icon: <FaCar className="w-5 h-5" />,
      title: "Confirm Your Booking",
      description: "Complete your booking by providing journey details and making the payment securely through our platform."
    },
    {
      number: 4,
      icon: <FaStar className="w-5 h-5" />,
      title: "Enjoy Your Ride",
      description: "Sit back, relax, and enjoy a comfortable ride with your professional pilot. Don't forget to leave a review!"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Book your professional driver in just a few simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-0">
            {steps.map((step, index) => (
              <Step 
                key={index}
                {...step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full h-full max-w-md mx-auto">
              {/* Decorative elements for better visual appeal */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
              
              {/* Image container with proper alignment */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-[520px] flex items-center">
                <img 
                  src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Home%20Image.png?updatedAt=1744650669954" 
                  alt="Booking process" 
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Overlay with gradient and CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Book?</h3>
                  <p className="text-white/80 mb-4">Experience premium transportation with our professional pilots</p>
                  <Link 
                    to="/pilots"
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors w-max flex items-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;