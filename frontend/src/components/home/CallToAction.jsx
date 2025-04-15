// frontend/src/components/CallToAction.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaShieldAlt, FaClock } from 'react-icons/fa';

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-primary">
      <div className="p-3 bg-primary/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const CallToAction = () => {
  const features = [
    {
      icon: <FaCar className="h-8 w-8 text-primary" />,
      title: "Professional Drivers",
      description: "Experienced and well-trained professionals to drive your vehicle safely"
    },
    {
      icon: <FaShieldAlt className="h-8 w-8 text-primary" />,
      title: "Fully Insured",
      description: "Your journey is protected with comprehensive insurance coverage"
    },
    {
      icon: <FaClock className="h-8 w-8 text-primary" />,
      title: "24/7 Availability",
      description: "Round-the-clock service to meet your transportation needs anytime"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Premium Service</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Why Choose Our Pilots?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the safest and most comfortable journeys with our professional drivers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>

        <div className="bg-primary rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to book your driver?</h3>
              <p className="text-white/90 mb-8 text-lg">
                Start your journey with our professional pilots today. Easy booking, reliable service, and peace of mind guaranteed.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/booking" 
                  className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                >
                  Book Now
                </Link>
                <Link 
                  to="/contact" 
                  className="px-8 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white/10 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/call-to-action.jpg" 
                alt="Professional driver" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;