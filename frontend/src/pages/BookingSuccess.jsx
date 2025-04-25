import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccess = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Booking Successful!</h2>
        <p className="mt-2 text-gray-600">Your ride has been booked successfully.</p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
          >
            View Booking Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;