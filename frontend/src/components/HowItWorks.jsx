// src/components/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Choose Your Pilot",
      description: "Browse through our verified professional pilots and select the one that matches your needs.",
      icon: "🔍"
    },
    {
      title: "Book Your Trip",
      description: "Schedule your journey with easy booking and secure payment options.",
      icon: "📅"
    },
    {
      title: "Enjoy Your Ride",
      description: "Experience a comfortable and safe journey with your professional pilot.",
      icon: "🚗"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;