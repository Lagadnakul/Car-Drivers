import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchResults = () => {
  const location = useLocation();
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilots = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(location.search);
        const response = await fetch(`/api/pilots/search?${params}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPilots(data);
      } catch (error) {
        console.error('Error fetching pilots:', error.message);
        setError(`Failed to load available pilots: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPilots();
  }, [location.search]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Available Pilots</h1>
        <p className="text-gray-600 mt-2">
          Found {pilots.length} pilots matching your criteria
        </p>
      </div>

      {pilots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pilots.map(pilot => (
            <PilotCard key={pilot._id} pilot={pilot} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold">No Pilots Available</h3>
          <p className="text-gray-600 mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;