// src/pages/EditListingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ManageOptionCard from '../components/ManageOptionCard';
import ManageListingsPage from './ManageListingsPage';


const ManageRoutingPage = () => {
    return (
        <div className="manage-routing-page">
          <h1>Management Pages</h1>
          <div className="options-container">
            <ManageOptionCard
              title="Manage About Me"
              description="Update your personal information or change your bio."
              navigateTo= '/ManageAbout'
            />
            <ManageOptionCard
              title="Manage Locations"
              description="Update your personal information or change your bio."
              navigateTo= '/ManageListings'
            />
          </div>
        </div>
      );
    };

export default ManageRoutingPage;
