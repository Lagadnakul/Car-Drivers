import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaPlane, FaBriefcase, FaGlassCheers } from 'react-icons/fa';
//eslint-disable-next-line
import { motion } from 'framer-motion';

// Local image imports
import cityImage from '@assets/images/services/Home-a.png';
import corporateImage from '@assets/images/services/Home-b.jpg';
import airportImage from '@assets/images/services/Home-c.jpg';
import eventsImage from '@assets/images/services/Home-d.jpg';

const ServiceCard = ({ icon, title, description, link, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
          opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center
              group-hover:bg-primary transition-all duration-500">
              {icon}
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-white/90 text-sm mb-4 opacity-0 transform translate-y-4 
            group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {description}
          </p>
          <Link 
            to={link}
            className="inline-flex items-center text-sm font-medium text-white/90 hover:text-primary 
              transition-colors duration-300"
          >
            <span className="border-b border-transparent group-hover:border-primary">
              Explore Service
            </span>
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <FaCar className="w-6 h-6 text-white group-hover:text-primary" />,
      title: "City Transfers",
      description: "Comfortable and reliable transportation within the city for any occasion.",
      link: "/services/city-transfers",
      image: cityImage
    },
    {
      icon: <FaBriefcase className="w-6 h-6 text-white group-hover:text-primary" />,
      title: "Corporate Travel",
      description: "Professional transportation for business meetings, conferences, and corporate events.",
      link: "/services/corporate-travel",
      image: corporateImage
    },
    {
      icon: <FaPlane className="w-6 h-6 text-white group-hover:text-primary" />,
      title: "Airport Transfers",
      description: "Reliable and punctual airport pickup and drop-off services with flight tracking.",
      link: "/services/airport-transfers",
      image: airportImage
    },
    {
      icon: <FaGlassCheers className="w-6 h-6 text-white group-hover:text-primary" />,
      title: "Special Events",
      description: "Luxury transportation for weddings, ceremonies and special occasions.",
      link: "/services/events",
      image: eventsImage
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Premium Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Exceptional Transportation Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Experience luxury and reliability with our comprehensive range of professional driver services
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;