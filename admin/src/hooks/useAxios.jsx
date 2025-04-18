import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook for making API requests
 * @param {Object} options - Configuration options
 * @param {string} options.url - The API endpoint URL
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} options.body - Request body data
 * @param {boolean} options.immediate - Whether to make the request immediately
 * @returns {Object} The API response, loading state, error state, and refetch function
 */
const useAxios = ({ url, method = 'get', body = null, immediate = true }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (overrideBody = null) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      const requestBody = overrideBody || body;

      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url);
          break;
        case 'post':
          response = await api.post(url, requestBody);
          break;
        case 'put':
          response = await api.put(url, requestBody);
          break;
        case 'delete':
          response = await api.delete(url);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxios;