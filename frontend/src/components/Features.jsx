import React from 'react';
import { FaShieldAlt, FaClock, FaStar, FaUserTie } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaShieldAlt className="h-6 w-6" />,
      title: "Verified Pilots",
      description: "All our pilots undergo rigorous background checks and verification"
    },
    {
      icon: <FaClock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Book your pilot any time of the day or night"
    },
    {
      icon: <FaStar className="h-6 w-6" />,
      title: "Top Rated Service",
      description: "Consistently high-rated pilots and excellent service"
    },
    {
      icon: <FaUserTie className="h-6 w-6" />,
      title: "Professional Experience",
      description: "Experienced and professionally trained pilots"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Go Pilot</h2>
          <p className="mt-4 text-lg text-gray-600">Experience the difference with our premium pilot service</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;