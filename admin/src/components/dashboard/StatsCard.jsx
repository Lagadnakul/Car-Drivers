import React from 'react';

const StatsCard = ({ title, value, icon, trend, bgColor = "bg-white", subtitle, compareText }) => {
  const isGradient = bgColor.includes('gradient');
  
  return (
    <div className={`rounded-lg shadow-sm overflow-hidden ${isGradient ? '' : bgColor}`}>
      <div className={`p-6 ${isGradient ? bgColor + ' text-white' : ''}`}>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {isGradient ? (
              <div className="h-12 w-12 rounded-md bg-white bg-opacity-30 flex items-center justify-center">
                {getIcon(icon)}
              </div>
            ) : (
              <div className={`h-12 w-12 rounded-md flex items-center justify-center ${getIconBgColor(icon)}`}>
                {getIcon(icon)}
              </div>
            )}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className={`text-sm font-medium ${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'} truncate`}>
                {title}
              </dt>
              <dd>
                <div className={`text-2xl font-bold ${isGradient ? 'text-white' : 'text-gray-900'}`}>
                  {value}
                </div>
                {subtitle && (
                  <p className={`text-xs mt-1 ${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                    {subtitle}
                  </p>
                )}
              </dd>
            </dl>
          </div>
        </div>

        {trend && (
          <div className={`mt-4 flex items-center text-sm ${isGradient ? 'text-white text-opacity-90' : ''}`}>
            <span className={`flex items-center ${trend > 0 ? 'text-green-500' : 'text-red-500'} ${isGradient ? '!text-white' : ''}`}>
              {trend > 0 ? (
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              <span className="font-medium">{Math.abs(trend)}%</span>
            </span>
            <span className={`${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'} ml-2`}>
              {compareText || 'from previous period'}
            </span>
          </div>
        )}
        
        {/* Mini Sparkline Chart */}
        {icon === 'revenue' && (
          <div className="mt-4 h-10">
            <div className="flex items-end space-x-1 h-full">
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-3"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-5"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-4"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-6"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-3"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-7"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-6"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-8"></div>
              <div className="w-2 bg-white bg-opacity-30 rounded-sm h-9"></div>
              <div className="w-2 bg-white bg-opacity-70 rounded-sm h-10"></div>
            </div>
          </div>
        )}
        
        {/* Quick Action Button for some cards */}
        {(icon === 'users' || icon === 'drivers') && (
          <button className={`mt-4 w-full py-1.5 rounded text-xs font-medium ${
            isGradient ? 'bg-white bg-opacity-20 hover:bg-opacity-30' : 'bg-gray-100 hover:bg-gray-200'
          } transition-colors duration-200`}>
            View {icon === 'users' ? 'Customers' : 'Drivers'} →
          </button>
        )}
      </div>
      
      {/* Bottom Section (Conditional) */}
      {icon === 'bookings' && (
        <div className={`px-6 py-2 border-t ${isGradient ? 'border-white border-opacity-10 bg-black bg-opacity-10' : 'border-gray-100'}`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-medium ${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
              View all bookings
            </span>
            <svg className={`h-4 w-4 ${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}
      
      {/* Activity Indicators (for completed trips) */}
      {icon === 'completed' && (
        <div className={`px-6 py-2 ${isGradient ? 'bg-black bg-opacity-10' : 'bg-gray-50'} flex justify-between items-center`}>
          <div className="flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <span className={`text-xs ${isGradient ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
            Live tracking
          </span>
        </div>
      )}
    </div>
  );
};

const getIconBgColor = (icon) => {
  switch (icon) {
    case 'users': return 'bg-blue-100 text-blue-600';
    case 'drivers': return 'bg-green-100 text-green-600';
    case 'bookings': return 'bg-purple-100 text-purple-600';
    case 'completed': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-red-100 text-red-600';
  }
};

const getIcon = (icon) => {
  switch (icon) {
    case 'users':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'drivers':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      );
    case 'bookings':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'completed':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'revenue':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'analytics':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
};

export default StatsCard;