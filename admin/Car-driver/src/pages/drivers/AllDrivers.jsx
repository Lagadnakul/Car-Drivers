import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useData } from '../../contexts/DataContext';

const AllDrivers = () => {
  const navigate = useNavigate();
  const { drivers, setDrivers } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // If we don't have any drivers in context, fetch placeholder data
        if (drivers.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Placeholder data
          setDrivers([
            {
              _id: '1',
              user: { name: 'John Smith', email: 'john@example.com', phone: '555-1234' },
              experience: 5,
              licenseNumber: 'DL12345',
              hourlyRate: 25,
              rating: 4.7,
              isAvailable: true,
              vehicleTypes: ['sedan', 'suv']
            },
            {
              _id: '2',
              user: { name: 'Sarah Davis', email: 'sarah@example.com', phone: '555-5678' },
              experience: 3,
              licenseNumber: 'DL67890',
              hourlyRate: 22,
              rating: 4.5,
              isAvailable: true,
              vehicleTypes: ['sedan', 'luxury']
            },
            {
              _id: '3',
              user: { name: 'Mike Johnson', email: 'mike@example.com', phone: '555-9012' },
              experience: 7,
              licenseNumber: 'DL54321',
              hourlyRate: 30,
              rating: 4.9,
              isAvailable: false,
              vehicleTypes: ['suv', 'van']
            }
          ]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load drivers');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDrivers();
  }, [drivers.length, setDrivers]);
  
  const columns = [
    { key: 'name', title: 'Name', render: (driver) => driver.user.name },
    { key: 'email', title: 'Email', render: (driver) => driver.user.email },
    { key: 'phone', title: 'Phone', render: (driver) => driver.user.phone },
    { key: 'experience', title: 'Experience', render: (driver) => `${driver.experience} years` },
    { key: 'hourlyRate', title: 'Hourly Rate', render: (driver) => `$${driver.hourlyRate}/hr` },
    { key: 'rating', title: 'Rating', render: (driver) => (
      <div className="flex items-center">
        <span>{driver.rating}</span>
        <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      </div>
    )},
    { key: 'status', title: 'Status', render: (driver) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${driver.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {driver.isAvailable ? 'Available' : 'Unavailable'}
      </span>
    )},
    { key: 'actions', title: 'Actions', render: (driver) => (
      <Link to={`/drivers/${driver._id}`} className="text-blue-600 hover:text-blue-900">
        View Details
      </Link>
    )}
  ];
  
  const filteredDrivers = drivers.filter(driver => {
    if (!driver.user) return false;
    return (
      driver.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (driver.user.phone && driver.user.phone.includes(searchTerm))
    );
  });
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10 text-red-600">{error}</div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all registered drivers
          </p>
        </div>
        <Button
          onClick={() => navigate('/drivers/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Add New Driver
        </Button>
      </div>
      
      <Card>
        <div className="mb-4">
          <Input
            type="search"
            placeholder="Search drivers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Table 
          columns={columns} 
          data={filteredDrivers} 
          onRowClick={(driver) => navigate(`/drivers/${driver._id}`)}
        />
      </Card>
    </div>
  );
};

export default AllDrivers;