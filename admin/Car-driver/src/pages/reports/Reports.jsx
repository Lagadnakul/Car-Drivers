import React, { useState, useEffect, useCallback } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of current month
    endDate: new Date().toISOString().split('T')[0], // Today
  });
  const [reportData, setReportData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [exporting, setExporting] = useState(false);

  const getDaysArray = (start, end) => {
    const arr = [];
    let dt = new Date(start);
    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };

  const getReportTypeLabel = () => {
    switch (reportType) {
      case 'revenue':
        return 'Daily Revenue ($)';
      case 'bookings':
        return 'Daily Bookings';
      case 'users':
        return 'New Users';
      case 'drivers':
        return 'New Drivers';
      default:
        return 'Values';
    }
  };

  const getChartColor = () => {
    switch (reportType) {
      case 'revenue':
        return 'rgba(75, 192, 192, 0.6)';
      case 'bookings':
        return 'rgba(54, 162, 235, 0.6)';
      case 'users':
        return 'rgba(153, 102, 255, 0.6)';
      case 'drivers':
        return 'rgba(255, 159, 64, 0.6)';
      default:
        return 'rgba(75, 192, 192, 0.6)';
    }
  };

  // Use useCallback to memoize the loadReportData function
  const loadReportData = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from API
      // const response = await api.get(`/reports/${reportType}`, {
      //   params: { startDate: dateRange.startDate, endDate: dateRange.endDate }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate random data based on report type
      const days = getDaysArray(new Date(dateRange.startDate), new Date(dateRange.endDate));
      const daysLabels = days.map(date => date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      let data;
      let summary;
      
      switch (reportType) {
        case 'revenue':
          data = days.map(() => Math.floor(Math.random() * 500) + 100);
          summary = {
            total: data.reduce((sum, value) => sum + value, 0),
            average: Math.round(data.reduce((sum, value) => sum + value, 0) / data.length),
            highest: Math.max(...data),
            lowest: Math.min(...data),
          };
          break;
        case 'bookings':
          data = days.map(() => Math.floor(Math.random() * 20) + 5);
          summary = {
            total: data.reduce((sum, value) => sum + value, 0),
            average: Math.round(data.reduce((sum, value) => sum + value, 0) / data.length * 10) / 10,
            completed: Math.floor(data.reduce((sum, value) => sum + value, 0) * 0.8),
            cancelled: Math.floor(data.reduce((sum, value) => sum + value, 0) * 0.15),
          };
          break;
        case 'users':
          data = days.map(() => Math.floor(Math.random() * 10) + 1);
          summary = {
            total: data.reduce((sum, value) => sum + value, 0),
            activeUsers: 230 + Math.floor(Math.random() * 50),
            conversionRate: (Math.random() * 10 + 20).toFixed(1) + '%',
            retentionRate: (Math.random() * 15 + 75).toFixed(1) + '%',
          };
          break;
        case 'drivers':
          data = days.map(() => Math.floor(Math.random() * 5) + 1);
          summary = {
            total: data.reduce((sum, value) => sum + value, 0),
            activeDrivers: 45 + Math.floor(Math.random() * 20),
            averageRating: (Math.random() * 1 + 4).toFixed(1),
            completionRate: (Math.random() * 15 + 80).toFixed(1) + '%',
          };
          break;
        default:
          data = days.map(() => Math.floor(Math.random() * 100));
          summary = {
            total: data.reduce((sum, value) => sum + value, 0),
          };
      }
      
      setReportData({
        labels: daysLabels,
        values: data,
        summary,
      });
      
      setChartData({
        labels: daysLabels,
        datasets: [
          {
            label: getReportTypeLabel(),
            data: data,
            backgroundColor: getChartColor(),
          },
        ],
      });
    } catch (error) {
      console.error('Error loading report data:', error);
    } finally {
      setLoading(false);
    }
  }, [reportType, dateRange]); // Include dependencies here

  // Now use the memoized function in useEffect
  useEffect(() => {
    loadReportData();
  }, [loadReportData]); // Only depends on the memoized function

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleExportReport = async () => {
    setExporting(true);
    try {
      // In a real app, this would call an API endpoint that returns a file
      // const response = await api.get(`/reports/${reportType}/export`, {
      //   params: { startDate: dateRange.startDate, endDate: dateRange.endDate }
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate download completion
      alert('Report downloaded successfully!');
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setExporting(false);
    }
  };

  const renderSummaryCards = () => {
    if (!reportData) return null;
    
    let cards = [];
    
    switch (reportType) {
      case 'revenue':
        cards = [
          { title: 'Total Revenue', value: `$${reportData.summary.total.toFixed(2)}` },
          { title: 'Average Daily', value: `$${reportData.summary.average.toFixed(2)}` },
          { title: 'Highest Day', value: `$${reportData.summary.highest.toFixed(2)}` },
          { title: 'Lowest Day', value: `$${reportData.summary.lowest.toFixed(2)}` },
        ];
        break;
      case 'bookings':
        cards = [
          { title: 'Total Bookings', value: reportData.summary.total },
          { title: 'Average Daily', value: reportData.summary.average },
          { title: 'Completed', value: reportData.summary.completed },
          { title: 'Cancelled', value: reportData.summary.cancelled },
        ];
        break;
      case 'users':
        cards = [
          { title: 'New Signups', value: reportData.summary.total },
          { title: 'Active Users', value: reportData.summary.activeUsers },
          { title: 'Conversion Rate', value: reportData.summary.conversionRate },
          { title: 'Retention Rate', value: reportData.summary.retentionRate },
        ];
        break;
      case 'drivers':
        cards = [
          { title: 'New Drivers', value: reportData.summary.total },
          { title: 'Active Drivers', value: reportData.summary.activeDrivers },
          { title: 'Average Rating', value: reportData.summary.averageRating },
          { title: 'Completion Rate', value: reportData.summary.completionRate },
        ];
        break;
      default:
        cards = [
          { title: 'Total', value: reportData.summary.total },
        ];
    }
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and analyze system performance
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="revenue">Revenue Report</option>
                <option value="bookings">Booking Report</option>
                <option value="users">User Acquisition</option>
                <option value="drivers">Driver Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <Input 
                type="date" 
                name="startDate" 
                value={dateRange.startDate} 
                onChange={handleDateRangeChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <Input 
                type="date" 
                name="endDate" 
                value={dateRange.endDate} 
                onChange={handleDateRangeChange}
              />
            </div>
          </div>
          <div>
            <Button
              onClick={handleExportReport}
              disabled={loading || exporting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {exporting ? 'Exporting...' : 'Export Report'}
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              {renderSummaryCards()}
              
              <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">{getReportTypeLabel()} - {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}</h3>
                {chartData && (
                  <div className="h-80">
                    <Bar 
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Raw Data</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {getReportTypeLabel()}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData?.labels.map((label, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {label}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {reportType === 'revenue' ? `$${reportData.values[index].toFixed(2)}` : reportData.values[index]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Reports;