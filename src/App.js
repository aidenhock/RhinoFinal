import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';
import ManageListingsPage from './pages/ManageListingsPage';
import EditListingPage from './pages/EditListingPage';
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
        <Route path="/manage" element={<ManageListingsPage />} />
        <Route path="/manage/edit/:id" element={<EditListingPage />} />
      </Routes>
    </Router>
  );
};

export default App;

