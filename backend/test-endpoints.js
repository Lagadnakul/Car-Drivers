#!/usr/bin/env node

/**
 * ============================================
 * BACKEND ENDPOINT TEST SUITE
 * ============================================
 * Tests all critical endpoints for timeout issues
 */

import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';
const TIMEOUT = 5000; // 5 second timeout

let testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

/**
 * Test helper with timeout
 */
async function testEndpoint(method, path, data = null) {
  const url = `${API_URL}${path}`;
  
  try {
    const options = {
      method,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    console.log(`\n🧪 Testing: ${method} ${path}`);
    const startTime = Date.now();
    
    const response = await fetch(url, options);
    const elapsed = Date.now() - startTime;
    
    const body = await response.text();
    let jsonData = null;
    
    try {
      jsonData = JSON.parse(body);
    } catch (e) {
      jsonData = body;
    }

    console.log(`   Status: ${response.status}`);
    console.log(`   Time: ${elapsed}ms`);
    console.log(`   Response: ${JSON.stringify(jsonData).substring(0, 100)}...`);

    if (elapsed < TIMEOUT) {
      console.log(`   ✅ PASSED`);
      testResults.passed++;
      return true;
    } else {
      console.log(`   ⚠️  SLOW (${elapsed}ms > ${TIMEOUT}ms)`);
      testResults.failed++;
      return false;
    }
  } catch (error) {
    console.log(`   ❌ FAILED: ${error.message}`);
    testResults.errors.push({
      endpoint: path,
      error: error.message
    });
    testResults.failed++;
    return false;
  }
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('═════════════════════════════════════════');
  console.log('🚀 BACKEND ENDPOINT TEST SUITE');
  console.log('═════════════════════════════════════════');
  console.log(`Target: ${API_URL}`);
  console.log(`Timeout: ${TIMEOUT}ms\n`);

  // Test 1: Health Check
  await testEndpoint('GET', '/health');

  // Test 2: Register
  await testEndpoint('POST', '/auth/register', {
    name: 'Test User',
    email: `test-${Date.now()}@example.com`,
    password: 'Password123',
    phone: '+1234567890'
  });

  // Test 3: Login
  await testEndpoint('POST', '/auth/login', {
    email: 'test@example.com',
    password: 'password123'
  });

  // Test 4: Get Drivers
  await testEndpoint('GET', '/drivers');

  // Test 5: Search Drivers
  await testEndpoint('GET', '/drivers/search?search=john');

  // Print Summary
  console.log('\n═════════════════════════════════════════');
  console.log('📊 TEST SUMMARY');
  console.log('═════════════════════════════════════════');
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`Total: ${testResults.passed + testResults.failed}`);

  if (testResults.errors.length > 0) {
    console.log('\n🔴 ERRORS:');
    testResults.errors.forEach(err => {
      console.log(`   - ${err.endpoint}: ${err.error}`);
    });
  }

  if (testResults.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED!');
    process.exit(0);
  } else {
    console.log('\n⚠️  SOME TESTS FAILED');
    process.exit(1);
  }
}

// Run tests after a short delay
setTimeout(runTests, 1000);
