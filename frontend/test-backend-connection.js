// Simple connection test for the backend
const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    
    const response = await fetch('http://localhost:4000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend connected successfully:', data);
      
      // Test auth endpoint
      const authTest = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'user@example.com',
          password: 'password123'
        }),
      });
      
      if (authTest.ok) {
        const authData = await authTest.json();
        console.log('✅ Authentication working:', authData);
        return true;
      } else {
        console.log('⚠️ Auth endpoint status:', authTest.status);
        return false;
      }
    } else {
      console.log('❌ Backend connection failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Connection error:', error.message);
    return false;
  }
};

// Run the test
testBackendConnection();

export default testBackendConnection;
