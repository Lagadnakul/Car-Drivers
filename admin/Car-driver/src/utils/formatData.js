/**
 * Format currency values
 * @param {number} value - The value to format
 * @param {string} currency - Currency code (USD, EUR, etc.)
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };
  
  /**
   * Format date values
   * @param {string|Date} date - The date to format
   * @param {object} options - Intl.DateTimeFormat options
   * @returns {string} - Formatted date string
   */
  export const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    return new Intl.DateTimeFormat('en-US', {
      ...defaultOptions,
      ...options,
    }).format(new Date(date));
  };
  
  /**
   * Format time values
   * @param {string|Date} time - The time to format
   * @returns {string} - Formatted time string (12-hour format)
   */
  export const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(time));
  };
  
  /**
   * Format phone numbers
   * @param {string} phone - The phone number to format
   * @returns {string} - Formatted phone number
   */
  export const formatPhone = (phone) => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const cleaned = ('' + phone).replace(/\D/g, '');
    
    // Format according to length
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone; // Return original if we can't format it
  };
  
  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} - Truncated text
   */
  export const truncateText = (text, length = 50) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return `${text.slice(0, length)}...`;
  };
  
  /**
   * Generate initials from name
   * @param {string} name - Full name
   * @returns {string} - Initials (up to 2 characters)
   */
  export const getInitials = (name) => {
    if (!name) return '';
    
    const names = name.split(' ').filter(n => n.length > 0);
    if (names.length === 0) return '';
    if (names.length === 1) return names[0][0].toUpperCase();
    
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  
  /**
   * Format a datetime range
   * @param {Date|string} start - Start datetime
   * @param {Date|string} end - End datetime
   * @returns {string} Formatted range string
   */
  export const formatDateTimeRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const sameDay = startDate.toDateString() === endDate.toDateString();
    
    if (sameDay) {
      return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatTime(endDate)}`;
    } else {
      return `${formatDate(startDate)}, ${formatTime(startDate)} - ${formatDate(endDate)}, ${formatTime(endDate)}`;
    }
  };
  
  /**
   * Calculate time difference in hours
   * @param {Date|string} start - Start time
   * @param {Date|string} end - End time
   * @returns {number} - Difference in hours
   */
  export const getHoursDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate - startDate;
    return diffMs / (1000 * 60 * 60);
  };