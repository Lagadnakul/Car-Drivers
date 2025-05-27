import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Go Pilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;