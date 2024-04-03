
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCPV4Ab6FBu-5UCJiFbNXsAeGC0YdLXxDc",
//   authDomain: "rhino4fun-91db0.firebaseapp.com",
//   projectId: "rhino4fun-91db0",
//   storageBucket: "rhino4fun-91db0.appspot.com",
//   messagingSenderId: "1093431620967",
//   appId: "1:1093431620967:web:e6742b436279bbf107ebc2",
//   measurementId: "G-1C78KFH4GP"
// };
import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import SearchBarComponent from './components/SearchBarComponent';
import LocationsList from './components/LocationsList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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

  // Dummy function for handling search, replace with your actual search handling logic
  const handleSearch = searchTerm => {
    console.log(`Search for: ${searchTerm}`);
    // Implement search functionality here
  };

  return (
    <>
      <NavbarComponent />
      <SearchBarComponent onSearch={handleSearch} />
      <LocationsList locations={locations} />
    </>
  );
}

export default App;
