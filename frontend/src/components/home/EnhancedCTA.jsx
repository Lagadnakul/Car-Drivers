// frontend/src/components/home/EnhancedCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaArrowRight, FaCar, FaUserTie, FaClock, FaShieldAlt, FaStar } from 'react-icons/fa';

const FeatureCard = ({ icon, title, description, delay, className = "", link = null }) => (
  <motion.div
    className={`bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
  >
    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
    {link && (
      <Link to={link.to} className="inline-flex items-center text-primary mt-4 group">
        {link.text}
        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    )}
  </motion.div>
);

const EnhancedCTA = () => {
  const features = [
    {
      icon: <FaCar className="text-primary w-6 h-6" />,
      title: "Premium Vehicles",
      description: "Experience comfort in luxury and well-maintained vehicles",
      delay: 0.3
    },
    {
      icon: <FaUserTie className="text-primary w-6 h-6" />,
      title: "Professional Pilots",
      description: "Trained and vetted drivers with years of experience",
      delay: 0.4
    },
    {
      icon: <FaClock className="text-primary w-6 h-6" />,
      title: "24/7 Service",
      description: "Available round the clock for all your transportation needs",
      delay: 0.5,
      link: {
        to: "/services",
        text: "Learn more about our services"
      }
    },
    {
      icon: <FaShieldAlt className="text-primary w-6 h-6" />,
      title: "Safety First",
      description: "Your security is our top priority with rigorous safety protocols",
      delay: 0.6
    },
    {
      icon: <FaStar className="text-primary w-6 h-6" />,
      title: "5-Star Experience",
      description: "Consistently top-rated service with premium customer care",
      delay: 0.7
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/grid-pattern.png')] bg-repeat"></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Premium Experience
              </motion.span>
              
              <motion.h2 
                className="mt-6 text-4xl md:text-5xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Your journey deserves <span className="text-primary relative">
                  professional hands
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-primary/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0,5 C50,0 150,0 200,5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </motion.h2>
              
              <motion.p 
                className="mt-6 text-lg text-gray-300 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Whether it's airport transfers, business meetings, or special occasions, our professional pilots ensure a safe and comfortable experience with unmatched reliability and attention to detail.
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link 
                  to="/booking" 
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-primary rounded-xl text-white font-medium transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -5 }}
                    className="flex items-center"
                  >
                    Book Your Pilot
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 700 }}
                    >
                      <FaArrowRight className="ml-2" />
                    </motion.span>
                  </motion.span>
                </Link>
                
                <Link 
                  to="/pilots" 
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/20 transition-all border border-white/10 hover:border-white/30"
                >
                  View All Pilots
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex items-center space-x-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 overflow-hidden">
                      <img 
                        src={`https://ik.imagekit.io/bxi3adntf/pilots/pilot${i}.jpg`} 
                        alt="Happy customer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">Trusted by 10,000+ customers</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column - Feature cards */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FeatureCard {...features[0]} />
              <FeatureCard {...features[1]} />
              
              <FeatureCard 
                {...features[2]} 
                className="md:col-span-2"
              />
              
              <div className="hidden md:flex md:col-span-2 md:space-x-4">
                <FeatureCard {...features[3]} className="flex-1" />
                <FeatureCard {...features[4]} className="flex-1" />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedCTA;