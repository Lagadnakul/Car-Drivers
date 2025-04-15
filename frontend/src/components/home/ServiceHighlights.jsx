// frontend/src/components/home/ServiceHighlights.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCar, FaPlane, FaBriefcase, FaGlassMartini } from 'react-icons/fa';

const ServiceCard = ({ icon, title, description, image, link }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative rounded-xl overflow-hidden"
    >
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </div>
      
      <div className="relative p-8 h-full flex flex-col justify-end min-h-[320px]">
        <div className="p-3 bg-primary rounded-full mb-4 w-max">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-6">{description}</p>
        <Link 
          to={link} 
          className="inline-flex items-center font-medium text-white border-b-2 border-primary pb-1 hover:border-white transition-colors"
        >
          Learn More
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const ServiceHighlights = () => {
  const services = [
    {
      icon: <FaCar className="h-6 w-6 text-white" />,
      title: "City Transfers",
      description: "Comfortable and reliable transportation within the city for any occasion",
      image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/services/city-transfer.jpg",
      link: "/services/city-transfers"
    },
    {
      icon: <FaPlane className="h-6 w-6 text-white" />,
      title: "Airport Pickups",
      description: "On-time airport transfers with flight monitoring and wait time included",
      image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/services/airport-pickup.jpg",
      link: "/services/airport-pickups"
    },
    {
      icon: <FaBriefcase className="h-6 w-6 text-white" />,
      title: "Corporate Travel",
      description: "Professional transportation solutions for business executives and teams",
      image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/services/corporate-travel.jpg",
      link: "/services/corporate-travel"
    },
    {
      icon: <FaGlassMartini className="h-6 w-6 text-white" />,
      title: "Special Events",
      description: "Luxury transportation for weddings, anniversaries and special occasions",
      image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/services/special-events.jpg",
      link: "/services/special-events"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Premium Transportation Solutions</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our range of professional driver services tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;