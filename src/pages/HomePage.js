import React from 'react';
import SearchBarComponent from '../components/SearchBarComponent';
import LocationsList from '../components/LocationsList';

const HomePage = ({ onSearch }) => {
    const locations = [
        // Placeholder data for locations
        { id: 1, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 2, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 3, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 4, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 5, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 6, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
        { id: 7, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
          
        // ... additional locations
      ];

  return (
    <>
      <SearchBarComponent onSearch={onSearch} />
      <LocationsList locations={locations} />
    </>
  );
};

export default HomePage;
