import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Executive",
      image: "https://ik.imagekit.io/bxi3adntf/testimonials/sarah.jpg",
      content: "The best pilot service I've ever used. Professional, punctual, and extremely courteous.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      image: "https://ik.imagekit.io/bxi3adntf/testimonials/michael.jpg",
      content: "Go Pilot has transformed how I travel. Their pilots are exceptional and service is outstanding.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Travel Blogger",
      image: "https://ik.imagekit.io/bxi3adntf/testimonials/emily.jpg",
      content: "Reliable, safe, and luxurious. Exactly what I need for my frequent travels.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600">Don't just take our word for it</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;