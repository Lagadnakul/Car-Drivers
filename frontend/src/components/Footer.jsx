import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="https://ik.imagekit.io/bxi3adntf/GoPilot-logo.png" alt="Go Pilot Logo" className="h-10 w-auto mr-3" />
              <h3 className="text-xl font-bold">Go Pilot</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Experience luxury travel with our professional pilots. Safe, reliable, and comfortable journeys guaranteed.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/pilots" className="text-gray-400 hover:text-primary transition-colors">Find Pilots</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/airport-transfers" className="text-gray-400 hover:text-primary transition-colors">Airport Transfers</Link>
              </li>
              <li>
                <Link to="/services/business-travel" className="text-gray-400 hover:text-primary transition-colors">Business Travel</Link>
              </li>
              <li>
                <Link to="/services/city-tours" className="text-gray-400 hover:text-primary transition-colors">City Tours</Link>
              </li>
              <li>
                <Link to="/services/events" className="text-gray-400 hover:text-primary transition-colors">Events & Ceremonies</Link>
              </li>
              <li>
                <Link to="/services/long-distance" className="text-gray-400 hover:text-primary transition-colors">Long Distance Travel</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1 mr-3" />
                <span className="text-gray-400">
                  123 Pilot Street, <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="h-5 w-5 text-primary mr-3" />
                <a href="tel:+12345678900" className="text-gray-400 hover:text-primary transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-5 w-5 text-primary mr-3" />
                <a href="mailto:info@gopilot.com" className="text-gray-400 hover:text-primary transition-colors">
                  info@gopilot.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Go Pilot. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;