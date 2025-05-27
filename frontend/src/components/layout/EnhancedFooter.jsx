import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, 
         FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { images } from '@constants/images';

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-primary transition-colors">
      {children}
    </Link>
  </li>
);

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={images.logo} alt="Go Pilot" className="h-10" />
            </Link>
            <p className="text-gray-400 mb-6 max-w-xs">
              Go Pilot provides professional drivers for all your transportation needs, 
              ensuring safe, reliable, and comfortable journeys.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={<FaFacebookF className="text-white" />} />
              <SocialLink href="https://twitter.com" icon={<FaTwitter className="text-white" />} />
              <SocialLink href="https://instagram.com" icon={<FaInstagram className="text-white" />} />
              <SocialLink href="https://linkedin.com" icon={<FaLinkedinIn className="text-white" />} />
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Our Services
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary mt-2"></span>
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/services">Our Services</FooterLink>
              <FooterLink to="/pilots">Find a Pilot</FooterLink>
              <FooterLink to="/booking">Make a Booking</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary mt-2"></span>
            </h3>
            <ul className="space-y-4">
              <FooterLink to="/services/airport-transfers">
                <div className="flex items-center space-x-2">
                  <img src={images.services.airport} alt="Airport Transfer" className="w-6 h-6 object-cover rounded" />
                  <span>Airport Transfers</span>
                </div>
              </FooterLink>
              <FooterLink to="/services/corporate-travel">
                <div className="flex items-center space-x-2">
                  <img src={images.services.corporate} alt="Corporate Travel" className="w-6 h-6 object-cover rounded" />
                  <span>Corporate Travel</span>
                </div>
              </FooterLink>
              <FooterLink to="/services/city-transfers">
                <div className="flex items-center space-x-2">
                  <img src={images.services.city} alt="City Transfer" className="w-6 h-6 object-cover rounded" />
                  <span>City Transfers</span>
                </div>
              </FooterLink>
              <FooterLink to="/services/special-events">
                <div className="flex items-center space-x-2">
                  <img src={images.services.events} alt="Special Events" className="w-6 h-6 object-cover rounded" />
                  <span>Special Events</span>
                </div>
              </FooterLink>
              <FooterLink to="/services/hourly-hire">
                <div className="flex items-center space-x-2">
                  <FaClock className="w-5 h-5 text-primary" />
                  <span>Hourly Hire</span>
                </div>
              </FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary mt-2"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                <span>123 Driver Street, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-primary mr-3" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <a href="mailto:info@gopilot.com" className="hover:text-primary transition-colors">
                  info@gopilot.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3">Subscribe to our newsletter</h4>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full"
                />
                <button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Go Pilot. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/faq" className="text-gray-400 hover:text-white text-sm transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;