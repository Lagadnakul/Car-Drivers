// frontend/src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserTie, FaClock, FaTrophy, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const stats = [
    { value: '15,000+', label: 'Happy Customers' },
    { value: '250+', label: 'Professional Pilots' },
    { value: '1M+', label: 'Miles Driven' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];
  
  const testimonials = [
    {
      quote: "Using Go Pilot for our corporate transportation needs has transformed how our executives travel. The service is impeccable.",
      author: "James Wilson",
      position: "CFO, TechCorp Inc."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/about-hero-pattern.png')] bg-repeat opacity-10"></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6 text-center"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="text-primary">Go Pilot</span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 max-w-3xl mx-auto text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're on a mission to transform the private driver industry with unmatched professionalism, safety, and comfort.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={fadeIn}
            >
              <img 
                src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/about-image.jpg" 
                alt="Go Pilot Team" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center space-x-2 font-semibold text-gray-900">
                  <span className="text-3xl text-primary">5</span>
                  <div>
                    <p className="text-sm">Years of</p>
                    <p>Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="lg:w-1/2 mt-12 lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              variants={fadeIn}
            >
              <div className="bg-primary/10 px-4 py-2 rounded-full w-max mb-4">
                <span className="text-primary font-medium">Our Journey</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story of <span className="text-primary">Excellence</span></h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded in 2018, Go Pilot was born from a simple idea: to create a transportation service that prioritizes professionalism, safety, and customer comfort above all else.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our founder, Michael Carter, experienced firsthand the frustrations of unreliable transportation services. After a particularly disappointing experience that caused him to miss an important meeting, he decided to create the solution he wished existed.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Today, Go Pilot has grown into a trusted name in professional driving services, with a fleet of luxury vehicles and a team of highly trained pilots ready to provide exceptional service for any occasion.
              </p>
              
              <Link 
                to="/contact" 
                className="flex items-center w-max group text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Get in touch with us
                <FaChevronRight className="ml-2 group-hover:ml-3 transition-all" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/stats-pattern.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="bg-primary/10 px-4 py-2 rounded-full w-max mx-auto mb-4">
              <span className="text-primary font-medium">What Drives Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At Go Pilot, everything we do is guided by our commitment to these fundamental principles
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaShieldAlt className="h-8 w-8" />,
                title: "Safety First",
                description: "We prioritize the safety of our customers with thorough background checks, regular vehicle maintenance, and ongoing driver training."
              },
              {
                icon: <FaUserTie className="h-8 w-8" />,
                title: "Professionalism",
                description: "Our pilots are trained to deliver a seamless, professional experience from start to finish, ensuring you arrive in style."
              },
              {
                icon: <FaClock className="h-8 w-8" />,
                title: "Reliability",
                description: "We understand the importance of punctuality and commit to being there when you need us, every time."
              },
              {
                icon: <FaTrophy className="h-8 w-8" />,
                title: "Excellence",
                description: "We're dedicated to exceeding expectations and delivering a premium experience that's second to none."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-gray-50 p-8 rounded-xl shadow-sm group-hover:shadow-md transition duration-300 h-full border-t-4 border-transparent group-hover:border-primary">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <FaQuoteRight className="text-5xl text-primary/20 mb-6" />
                <p className="text-xl text-gray-700 italic mb-8">
                  "{testimonials[0].quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonials[0].author}</p>
                  <p className="text-gray-500">{testimonials[0].position}</p>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/testimonial-corporate.jpg" 
                  alt="Corporate client testimonial" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <div className="bg-primary/10 px-4 py-2 rounded-full w-max mx-auto mb-4">
              <span className="text-primary font-medium">Our Leadership</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate professionals driving our mission forward
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/team-1.jpg",
                name: "Michael Carter",
                role: "Founder & CEO",
                bio: "With over 15 years in the transportation industry, Michael leads our company with a passion for exceptional service."
              },
              {
                image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/team-2.jpg",
                name: "Sarah Johnson",
                role: "Chief Operations Officer",
                bio: "Sarah ensures our day-to-day operations run smoothly and maintains our high standards of service excellence."
              },
              {
                image: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/team-3.jpg",
                name: "David Rodriguez",
                role: "Fleet Manager",
                bio: "David oversees our vehicle fleet, ensuring all cars meet our strict safety and luxury standards."
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-sm overflow-hidden group-hover:shadow-md transition duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-72 object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 relative">
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/cta-pattern.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Experience Premium Transportation</h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Go Pilot for their transportation needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/pilots" 
                className="px-8 py-4 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Find Your Pilot
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;