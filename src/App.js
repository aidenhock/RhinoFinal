
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
import LocationsList from './components/LocationsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/SearchBarComponent.css'; // Correct path to your custom CSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';



const App = () => {
  // Function for handling search will go here
  const handleSearch = searchTerm => {
    console.log(`Searching for: ${searchTerm}`);
    // Implement your search logic or update state with the search term
  };

  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
