// Test script to check backend connectivity
import axios from 'axios';

const API_URL = 'http://localhost:4000';

async function testBackendConnection() {
  try {
    console.log('Testing backend connection...');
    
    // Test basic connection
    const response = await axios.get(API_URL, { timeout: 5000 });
    console.log('✓ Backend is reachable');
    console.log('Response:', response.data);
    
    // Test API endpoint
    const apiResponse = await axios.get(`${API_URL}/api/drivers`, { timeout: 5000 });
    console.log('✓ API endpoints are working');
    console.log('Drivers response:', apiResponse.data);
    
  } catch (error) {
    console.error('✗ Backend connection failed:');
    
    if (error.code === 'ECONNREFUSED') {
      console.error('- Connection refused. Server is not running on port 4000');
      console.error('- Please start the backend server: cd backend && npm start');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('- Connection timeout. Server may be starting up');
    } else {
      console.error('- Error:', error.message);
      console.error('- Status:', error.response?.status);
      console.error('- Data:', error.response?.data);
    }
  }
}

testBackendConnection();
