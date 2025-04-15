// frontend/src/components/home/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaBriefcase, FaBuilding, FaGlassCheers, FaMapMarkedAlt } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-8">
        <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        
        <Link 
          to={link} 
          className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-2 transition-transform duration-300"
        >
          Learn More
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <FaPlane className="w-8 h-8" />,
      title: "Airport Transfers",
      description: "Reliable and punctual airport pickup and drop-off services with flight tracking and waiting time.",
      link: "/services/airport-transfers"
    },
    {
      icon: <FaBriefcase className="w-8 h-8" />,
      title: "Business Travel",
      description: "Professional transportation for business meetings, conferences, and corporate events.",
      link: "/services/business-travel"
    },
    {
      icon: <FaBuilding className="w-8 h-8" />,
      title: "City Tours",
      description: "Explore the city with knowledgeable drivers who know all the best spots and routes.",
      link: "/services/city-tours"
    },
    {
      icon: <FaGlassCheers className="w-8 h-8" />,
      title: "Events & Ceremonies",
      description: "Make your special occasion memorable with our luxury transportation services.",
      link: "/services/events"
    },
    {
      icon: <FaMapMarkedAlt className="w-8 h-8" />,
      title: "Long Distance Travel",
      description: "Comfortable and safe transportation for long distance journeys across the country.",
      link: "/services/long-distance"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">What We Offer</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Our Premium Services</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of professional driving services designed to meet all your transportation needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-base font-medium rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
          >
            View All Services
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

export default Services;