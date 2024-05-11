import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './components/SearchBarComponent.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';
import ManageRoutingPage from './pages/ManageRoutingPage';
import ManageListingsPage from './pages/ManageListingsPage';
import ManageAboutPage from './pages/ManageAboutPage';
import EditListingPage from './pages/EditListingPage';
import FirebaseSecurityPage from './security/FirebaseSecurityPage'; // Ensure correct path
import { auth } from './firebase'; // Firebase auth import
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set authenticated state based on user presence
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <FirebaseSecurityPage />;
  }

  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/manage" element={<ManageRoutingPage />} />
        <Route path="/ManageAbout" element={<ManageAboutPage />} />
        <Route path="/ManageListings" element={<ManageListingsPage />} />
        <Route path="/manage/edit/:id" element={<EditListingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
