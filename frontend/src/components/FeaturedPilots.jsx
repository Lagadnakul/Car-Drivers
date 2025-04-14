// src/components/FeaturedPilots.jsx
import React from 'react';
import PilotCard from './PilotCard';

const FeaturedPilots = () => {
  const pilots = [
    {
      id: 1,
      name: "John Smith",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Driver.3.jpg/pilots/pilot1.jpg",
      rating: 4.8,
      experience: 5,
      vehicleTypes: ["Luxury", "SUV"],
      hourlyRate: 45
    },
    {
      id: 2,
      name: "Jane Doe",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Driver.6.jpg/pilots/pilot2.jpg",
      rating: 4.9,
      experience: 7,
      vehicleTypes: ["Luxury", "Sedan"],
      hourlyRate: 50
    },
    {
      id: 3,
      name: "Mike Johnson",
      profilePhoto: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Driver.5.jpg/pilots/pilot3.jpg",
      rating: 4.7,
      experience: 4,
      vehicleTypes: ["Luxury", "SUV"],
      hourlyRate: 40
    },
    {
        id: 4,
        name: "Vitola Danson",
        profilePhoto: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Driver.1.jpg/pilots/pilot3.jpg",
        rating: 4.7,
        experience: 6,
        vehicleTypes: ["Luxury", "SUV"],
        hourlyRate: 40
      },
      {
        id: 5,
        name: "Senosta wason",
        profilePhoto: "https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Driver.5.jpg/pilots/pilot3.jpg",
        rating: 4.0,
        experience: 3,
        vehicleTypes: ["Luxury", "SUV"],
        hourlyRate: 40
      }

  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Pilots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pilots.map(pilot => (
            <PilotCard key={pilot.id} pilot={pilot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPilots;