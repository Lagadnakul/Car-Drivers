// frontend/src/components/layout/EnhancedNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

const EnhancedNavbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    // Set isScrolled to true initially to show the background
    setIsScrolled(true);
    
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        // Keep the background visible even when scrolled to top
        setIsScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-2' 
          : 'bg-white/90 backdrop-blur-sm py-4' // Changed from transparent to semi-transparent white
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              className="h-12 w-auto" 
              src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Black_and_Green_Modern_Automotive_Logo-removebg-preview.png?updatedAt=1744453130929" 
              alt="Go Pilot" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/" isActive={isActive('/')} isScrolled={isScrolled}>
              Home
            </NavLink>
            <NavLink to="/pilots" isActive={isActive('/pilots')} isScrolled={isScrolled}>
              Find Pilots
            </NavLink>
            <NavLink to="/services" isActive={isActive('/services')} isScrolled={isScrolled}>
              Services
            </NavLink>
            <NavLink to="/about" isActive={isActive('/about')} isScrolled={isScrolled}>
              About Us
            </NavLink>
            <NavLink to="/contact" isActive={isActive('/contact')} isScrolled={isScrolled}>
              Contact
            </NavLink>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100"
                >
                  <FaUser className="text-primary" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-800" // Always dark text for better visibility
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" isActive={isActive('/')}>Home</MobileNavLink>
            <MobileNavLink to="/pilots" isActive={isActive('/pilots')}>Find Pilots</MobileNavLink>
            <MobileNavLink to="/services" isActive={isActive('/services')}>Services</MobileNavLink>
            <MobileNavLink to="/about" isActive={isActive('/about')}>About Us</MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive('/contact')}>Contact</MobileNavLink>
            
            <div className="pt-4 pb-2 border-t border-gray-200">
              {user ? (
                <div className="space-y-2">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                  >
                    <FaUser className="mr-2 text-primary" />
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-primary font-bold'
          : 'text-gray-800 hover:text-primary' // Always dark text for better visibility
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
      )}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-gray-800 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};

export default EnhancedNavbar;