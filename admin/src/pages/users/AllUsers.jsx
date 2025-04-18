import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TableCard from '../../components/common/TableCard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useData } from '../../contexts/DataContext';

const AllUsers = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (users.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Placeholder data
          setUsers([
            {
              _id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              phone: '555-1234',
              role: 'user',
              createdAt: '2023-06-15T10:00:00Z',
            },
            {
              _id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              phone: '555-5678',
              role: 'user',
              createdAt: '2023-06-10T14:30:00Z',
            },
            {
              _id: '3',
              name: 'Robert Brown',
              email: 'robert@example.com',
              phone: '555-9012',
              role: 'user',
              createdAt: '2023-06-05T09:15:00Z',
            },
            {
              _id: '4',
              name: 'Emily Wilson',
              email: 'emily@example.com',
              phone: '555-3456',
              role: 'admin',
              createdAt: '2023-05-20T11:45:00Z',
            },
            {
              _id: '5',
              name: 'Michael Johnson',
              email: 'michael@example.com',
              phone: '555-7890',
              role: 'user',
              createdAt: '2023-06-01T16:20:00Z',
            }
          ]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [users.length, setUsers]);
  
  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { 
      key: 'role', 
      title: 'Role',
      render: (user) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          user.role === 'admin' 
            ? 'bg-purple-100 text-purple-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      )
    },
    { 
      key: 'createdAt', 
      title: 'Joined',
      render: (user) => new Date(user.createdAt).toLocaleDateString()
    },
    { 
      key: 'actions', 
      title: 'Actions',
      render: (user) => (
        <div className="flex space-x-2">
          <Link 
            to={`/users/${user._id}`}
            className="text-blue-600 hover:text-blue-900"
          >
            View
          </Link>
          <button 
            className="text-red-600 hover:text-red-900"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(user._id);
            }}
          >
            Delete
          </button>
        </div>
      )
    }
  ];
  
  const handleDeleteUser = (id) => {
    // For now, just filter out the user from local state
    setUsers(users.filter(user => user._id !== id));
  };
  
  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
    );
  });
  
  const searchFilter = (
    <Input
      type="search"
      placeholder="Search users by name, email or phone..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
  
  const actionButton = (
    <Button 
      variant="primary" 
      size="sm"
      className="bg-blue-600 text-white hover:bg-blue-700"
      onClick={() => navigate('/users/add')}
    >
      Add New User
    </Button>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all system users
          </p>
        </div>
      </div>
      
      <TableCard 
        title="Users"
        columns={columns}
        data={filteredUsers}
        loading={loading}
        emptyMessage="No users found"
        onRowClick={(user) => navigate(`/users/${user._id}`)}
        filters={searchFilter}
        actionButton={actionButton}
      />
    </div>
  );
};

export default AllUsers;