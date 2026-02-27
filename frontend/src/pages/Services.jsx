import { motion } from 'framer-motion';
import { FaCar, FaClock, FaMapMarkerAlt, FaShieldAlt, FaStar, FaUsers } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Personal Driver",
      description: "Professional drivers for your daily commute, shopping trips, or personal errands.",
      icon: <FaCar className="text-4xl text-blue-600" />,
      features: [
        "Experienced drivers",
        "Flexible scheduling",
        "Safe and reliable",
        "Competitive rates"
      ],
      price: "Starting from $25/hour"
    },
    {
      id: 2,
      title: "Airport Transfer",
      description: "Comfortable and punctual airport pickup and drop-off services.",
      icon: <FaMapMarkerAlt className="text-4xl text-green-600" />,
      features: [
        "Flight tracking",
        "Meet & greet service",
        "Luggage assistance",
        "24/7 availability"
      ],
      price: "Starting from $45"
    },
    {
      id: 3,
      title: "Event Transportation",
      description: "Special occasion transportation for weddings, parties, and corporate events.",
      icon: <FaStar className="text-4xl text-purple-600" />,
      features: [
        "Luxury vehicles",
        "Professional attire",
        "Event coordination",
        "Group bookings"
      ],
      price: "Starting from $60/hour"
    },
    {
      id: 4,
      title: "Hourly Service",
      description: "Book a driver for multiple stops and extended periods throughout the day.",
      icon: <FaClock className="text-4xl text-orange-600" />,
      features: [
        "Multiple destinations",
        "Wait time included",
        "Flexible itinerary",
        "Cost-effective"
      ],
      price: "Starting from $35/hour"
    },
    {
      id: 5,
      title: "Corporate Services",
      description: "Business transportation solutions for executives and corporate teams.",
      icon: <FaUsers className="text-4xl text-red-600" />,
      features: [
        "Executive vehicles",
        "Corporate accounts",
        "Bulk bookings",
        "Priority support"
      ],
      price: "Contact for pricing"
    },
    {
      id: 6,
      title: "Safety First",
      description: "All our drivers are thoroughly vetted and trained for maximum safety.",
      icon: <FaShieldAlt className="text-4xl text-indigo-600" />,
      features: [
        "Background checks",
        "Insurance coverage",
        "Safety training",
        "24/7 support"
      ],
      price: "Included in all services"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional driving services tailored to meet your every transportation need. 
            Safe, reliable, and convenient solutions for all occasions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-6">
                {service.icon}
                <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <div className="text-lg font-semibold text-blue-600">
                  {service.price}
                </div>
              </div>

              <div className="space-y-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                onClick={() => window.location.href = '/drivers'}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Our Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Drivers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden text-white relative"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="grid md:grid-cols-2 relative z-10">
            <div className="p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Book Your Driver?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Choose from our verified professional drivers and enjoy a safe, comfortable ride.
              </p>
              <div className="flex items-center mb-6">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Happy customer" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108755-2616b612b739?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Happy customer" />
                  <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Happy customer" />
                </div>
                <span className="ml-3 text-sm opacity-90">Trusted by 1000+ customers</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors w-max"
                onClick={() => window.location.href = '/drivers'}
              >
                Find Your Driver
              </motion.button>
            </div>
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Professional driver with luxury car" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-blue-600/30 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
