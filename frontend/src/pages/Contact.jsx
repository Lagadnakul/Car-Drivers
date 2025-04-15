// frontend/src/pages/Contact.jsx
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheck, 
         FaExclamationCircle, FaQuestionCircle, FaCalendarAlt, 
         FaShieldAlt, FaBuilding } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact info items
  const contactInfoItems = [
    {
      icon: <FaMapMarkerAlt className="h-6 w-6" />,
      title: "Our Location",
      content: (
        <p className="text-gray-600">
          123 Pilot Street<br />
          New York, NY 10001
        </p>
      )
    },
    {
      icon: <FaPhoneAlt className="h-5 w-5" />,
      title: "Phone Number",
      content: (
        <>
          <p className="text-gray-600">
            <a href="tel:+12345678900" className="hover:text-primary transition-colors">+1 (234) 567-8900</a>
          </p>
          <p className="text-gray-600 mt-1">
            <a href="tel:+18005551234" className="hover:text-primary transition-colors">+1 (800) 555-1234</a>
          </p>
        </>
      )
    },
    {
      icon: <FaEnvelope className="h-5 w-5" />,
      title: "Email Address",
      content: (
        <>
          <p className="text-gray-600">
            <a href="mailto:info@gopilot.com" className="hover:text-primary transition-colors">info@gopilot.com</a>
          </p>
          <p className="text-gray-600 mt-1">
            <a href="mailto:support@gopilot.com" className="hover:text-primary transition-colors">support@gopilot.com</a>
          </p>
        </>
      )
    },
    {
      icon: <FaClock className="h-5 w-5" />,
      title: "Working Hours",
      content: (
        <>
          <p className="text-gray-600">
            Monday - Friday:<br />8:00 AM - 8:00 PM
          </p>
          <p className="text-gray-600 mt-1">
            Weekends:<br />9:00 AM - 5:00 PM
          </p>
        </>
      )
    }
  ];

  // FAQ items
  const faqItems = [
    {
      icon: <FaCalendarAlt />,
      title: "How do I book a driver?",
      content: "You can book a driver through our website by browsing available pilots, selecting your preferred driver, and following the booking process. Alternatively, you can contact our support team for assistance."
    },
    {
      icon: <FaClock />,
      title: "What is your cancellation policy?",
      content: "Bookings can be canceled up to 24 hours before the scheduled time for a full refund. Cancellations made less than 24 hours in advance may incur a cancellation fee."
    },
    {
      icon: <FaShieldAlt />,
      title: "Are your drivers insured?",
      content: "Yes, all Go Pilot drivers are fully licensed, insured, and have undergone thorough background checks to ensure your safety and peace of mind."
    },
    {
      icon: <FaBuilding />,
      title: "Do you offer corporate accounts?",
      content: "Yes, we provide corporate accounts with special rates, dedicated support, and customized billing options. Please contact our business team for more information."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help!
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfoItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                {item.content}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {submitSuccess && (
                <motion.div 
                  className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Your message has been sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition duration-300 flex justify-center items-center shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Map */}
            <motion.div 
              className="h-full min-h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304903!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1652989490013!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Go Pilot Location"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Support</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4">
                    <span className="text-primary h-5 w-5">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-600 mb-6">Still have questions? Our support team is ready to help!</p>
            <a 
              href="mailto:support@gopilot.com" 
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition duration-300 font-medium shadow-md"
            >
              <FaEnvelope className="mr-2" />
              Contact Support
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/call-to-action.jpg')] bg-cover bg-center opacity-20"></div>
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Premium Transportation?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl">
              Book a professional pilot today and enjoy a comfortable, safe, and luxurious journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/pilots" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg flex items-center justify-center"
              >
                Find a Pilot
              </a>
              <a 
                href="tel:+18005551234" 
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium transition duration-300 backdrop-blur-sm flex items-center justify-center"
              >
                <FaPhoneAlt className="mr-2 inline-block" />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;