// frontend/src/components/home/TestimonialCarousel.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Business Executive",
    image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/testimonials/testimonial-1.jpg",
    comment: "The driver was punctual, professional, and made my business trip stress-free. Will definitely use this service again!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Corporate Traveler",
    image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/testimonials/testimonial-2.jpg",
    comment: "Excellent service! My driver was knowledgeable about the city and got me to all my meetings on time.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Event Planner",
    image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/testimonials/testimonial-3.jpg",
    comment: "We hired multiple drivers for our corporate event. The service was impeccable and our guests were impressed!",
    rating: 4.5
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <FaStar className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <FaStar className="text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of our satisfied customers
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
                <div className="absolute top-8 left-8 text-primary/10">
                  <FaQuoteLeft size={60} />
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-2">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                      "{testimonials[currentIndex].comment}"
                    </p>
                    <h4 className="text-xl font-semibold text-gray-900">{testimonials[currentIndex].name}</h4>
                    <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;