import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMapPin, FiClock, FiUser, FiDollarSign, FiCalendar } from 'react-icons/fi';
import '../styles/BookingSuccess.css';

const BookingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const booking = location.state?.booking;
  const driver = location.state?.driver;

  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);

  if (!booking || !driver) {
    return null;
  }

  const startDate = new Date(booking.startTime);
  const endDate = new Date(booking.endTime);
  const duration = Math.round((endDate - startDate) / (1000 * 60 * 60) * 10) / 10;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  const slideInVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="booking-success-container">
      {/* Animated background gradient */}
      <div className="animated-bg"></div>

      <motion.div
        className="success-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main checkmark circle */}
        <motion.div
          className="checkmark-circle"
          variants={checkmarkVariants}
          onAnimationComplete={() => setAnimationComplete(true)}
        >
          <motion.div
            className="checkmark-icon"
            variants={pulseVariants}
            animate="pulse"
          >
            <FiCheckCircle size={80} />
          </motion.div>
        </motion.div>

        {/* Success message */}
        <motion.h1 className="success-title" variants={itemVariants}>
          🎉 Booking Confirmed!
        </motion.h1>

        <motion.p className="success-subtitle" variants={itemVariants}>
          Your ride is confirmed and your driver is on the way
        </motion.p>

        {/* Booking ID */}
        <motion.div className="booking-id-box" variants={itemVariants}>
          <p>Booking ID</p>
          <h3>{booking._id?.toString().slice(0, 12).toUpperCase()}</h3>
        </motion.div>

        {/* Driver info card */}
        <motion.div className="driver-card" variants={itemVariants}>
          <div className="driver-header">
            <motion.img
              src={driver.profilePhoto || 'https://via.placeholder.com/80'}
              alt={driver.name}
              className="driver-photo"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <div className="driver-info">
              <h3>{driver.name}</h3>
              <div className="rating">
                {'⭐'.repeat(Math.round(driver.rating || 4.5))}
                <span> ({driver.rating || 4.5}/5)</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking details toggle button */}
        <motion.button
          className="details-toggle"
          variants={itemVariants}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? '▼' : '▶'} Booking Details
        </motion.button>

        {/* Expandable booking details */}
        <motion.div
          className="booking-details"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showDetails ? 'auto' : 0,
            opacity: showDetails ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="detail-item"
            variants={slideInVariants}
            initial="hidden"
            animate={showDetails ? 'visible' : 'hidden'}
          >
            <FiCalendar className="detail-icon" />
            <div>
              <p className="label">Date & Time</p>
              <p className="value">{startDate.toLocaleString()}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-item"
            variants={slideInVariants}
            initial="hidden"
            animate={showDetails ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
          >
            <FiClock className="detail-icon" />
            <div>
              <p className="label">Duration</p>
              <p className="value">{duration} hours</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-item"
            variants={slideInVariants}
            initial="hidden"
            animate={showDetails ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            <FiMapPin className="detail-icon" />
            <div>
              <p className="label">Pickup Location</p>
              <p className="value">{booking.pickupLocation}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-item"
            variants={slideInVariants}
            initial="hidden"
            animate={showDetails ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
          >
            <FiMapPin className="detail-icon" />
            <div>
              <p className="label">Drop Location</p>
              <p className="value">{booking.dropLocation}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-item"
            variants={slideInVariants}
            initial="hidden"
            animate={showDetails ? 'visible' : 'hidden'}
            transition={{ delay: 0.4 }}
          >
            <FiDollarSign className="detail-icon" />
            <div>
              <p className="label">Total Amount</p>
              <p className="value">${booking.totalAmount.toFixed(2)}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div className="action-buttons" variants={itemVariants}>
          <motion.button
            className="btn btn-primary"
            onClick={() => navigate('/my-bookings')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Bookings
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            onClick={() => navigate('/drivers')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Another Ride
          </motion.button>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="status-badge"
          variants={itemVariants}
          animate={animationComplete ? { scale: [1, 1.05, 1] } : {}}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          <span className="status-dot"></span>
          Status: {booking.status?.toUpperCase() || 'CONFIRMED'}
        </motion.div>
      </motion.div>

      {/* Confetti effect simulation */}
      {animationComplete && <Confetti />}
    </div>
  );
};

// Confetti component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 });

  return (
    <div className="confetti-container">
      {confettiPieces.map((_, i) => (
        <motion.div
          key={i}
          className="confetti"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: Math.random() * 360,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            rotate: Math.random() * 720,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            delay: Math.random() * 0.5,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
};

export default BookingSuccess;