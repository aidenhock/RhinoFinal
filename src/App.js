import 'bootstrap/dist/css/bootstrap.min.css';
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


import React, { useState, useEffect } from 'react';
git
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';
import SecurityPage from './security/SecurityPage';
import { isSessionValid } from './security/SessionManager';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(isSessionValid());

  useEffect(() => {
    setIsAuthenticated(isSessionValid());
  }, []);

  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <SecurityPage onAuthenticated={handleAuthenticationSuccess} />;
  }

  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;

