// frontend/src/components/home/Testimonials.jsx
import React, { useState } from 'react';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Anderson",
      position: "Business Executive",
      avatar: "https://ik.imagekit.io/bxi3adntf/testimonials/testimonial1.jpg",
      content: "Go Pilot has transformed my business travel experience. The drivers are exceptionally professional and punctual. I've been using their services for over a year now and I'm extremely satisfied with their consistency and attention to detail.",
      rating: 5
    },
    {
      id: 2,
      name: "Robert Williams",
      position: "Travel Blogger",
      avatar: "https://ik.imagekit.io/bxi3adntf/testimonials/testimonial2.jpg",
      content: "As someone who travels frequently, I can confidently say that Go Pilot offers the best chauffeur service I've experienced. Their drivers are knowledgeable about the city and make great recommendations for tourists. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Sophia Martinez",
      position: "Event Planner",
      avatar: "https://ik.imagekit.io/bxi3adntf/testimonials/testimonial3.jpg",
      content: "I organized a corporate event for 50+ people and hired Go Pilot for transportation. Their service was flawless - from the booking process to the execution. All guests arrived on time and had nothing but praise for the drivers.",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience with our pilots
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute -left-4 -right-4 top-1/2 transform -translate-y-1/2 flex justify-between z-10">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg">
                    <div className="flex items-center space-x-3 mb-6">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} w-5 h-5`}
                        />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <FaQuoteRight className="absolute -top-4 -left-2 text-primary/10 w-16 h-16" />
                      <p className="text-gray-700 text-lg relative z-10">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-white/30'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;