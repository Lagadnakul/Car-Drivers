import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import StatsCard from '../../components/dashboard/StatsCard';
import BookingChart from '../../components/dashboard/BookingChart';
import RecentBookings from '../../components/dashboard/RecentBookings';
// Remove the unused api import or use it in your API calls
// import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    drivers: 0,
    activeBookings: 0,
    completedTrips: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('monthly');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // When you're ready to make real API calls, uncomment this and remove the simulation
        // const response = await api.get('/dashboard/stats');
        // setStats(response.data);
        
        // Simulate API calls with placeholder data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Placeholder data
        setStats({
          users: 284,
          drivers: 48,
          activeBookings: 23,
          completedTrips: 1892,
          revenue: 28654.75,
        });
        
        // Different chart data based on timeframe
        const monthlyData = [2800, 3200, 2950, 3800, 4200, 3950, 4800, 5100, 4700, 5900, 6300, 5800];
        const weeklyData = [1200, 980, 1100, 1350, 1250, 1500, 1800];
        
        setChartData(timeframe === 'monthly' ? monthlyData : weeklyData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <select 
              className="outline-none text-gray-700 text-sm font-medium" 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="weekly">Last 7 days</option>
              <option value="monthly">Last 30 days</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-150">
            Generate Report
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard 
          title="Total Customers" 
          value={stats.users} 
          icon="users" 
          trend={7.2} 
          bgColor="bg-gradient-to-r from-blue-500 to-blue-600"
          subtitle="Active users"
        />
        <StatsCard 
          title="Total Drivers" 
          value={stats.drivers} 
          icon="drivers" 
          trend={5.3} 
          bgColor="bg-gradient-to-r from-green-500 to-green-600"
          subtitle="Available drivers"
        />
        <StatsCard 
          title="Active Bookings" 
          value={stats.activeBookings} 
          icon="bookings" 
          trend={3.1} 
          bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
          subtitle="In progress"
        />
        <StatsCard 
          title="Completed Trips" 
          value={stats.completedTrips} 
          icon="completed" 
          trend={12.4} 
          bgColor="bg-gradient-to-r from-yellow-500 to-yellow-600"
          subtitle="Last 30 days"
        />
        <StatsCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon="revenue" 
          trend={8.5} 
          bgColor="bg-gradient-to-r from-red-500 to-red-600"
          subtitle="Last 30 days"
        />
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Revenue Overview">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{timeframe === 'monthly' ? 'Monthly' : 'Weekly'} Revenue</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeframe('weekly')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    timeframe === 'weekly' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Weekly
                </button>
                <button 
                  onClick={() => setTimeframe('monthly')}
                  className={`px-3 py-1 text-xs rounded-full ${
                    timeframe === 'monthly' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <BookingChart data={chartData} timeframe={timeframe} />
          </Card>
        </div>
        
        <div>
          <Card title="Performance Overview">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Customer Growth</span>
                  <span className="text-sm font-semibold text-gray-700">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Driver Growth</span>
                  <span className="text-sm font-semibold text-gray-700">63%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '63%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Booking Rate</span>
                  <span className="text-sm font-semibold text-gray-700">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Customer Satisfaction</span>
                  <span className="text-sm font-semibold text-gray-700">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              {/* Added this section for quick actions */}
              <div className="pt-4 mt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md flex items-center justify-between">
                    <span>View detailed analytics</span>
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-md flex items-center justify-between">
                    <span>Download reports</span>
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Recent Bookings */}
      <Card title="Recent Bookings">
        <RecentBookings />
      </Card>
    </div>
  );
};

export default Dashboard;