import React from 'react';
import { useParams } from 'react-router-dom';
import './LocationPage.css'; // Make sure to include the CSS file

const LocationPage = () => {
  let { id } = useParams(); // This hooks give us access to the URL parameters

  // Dummy data for the location
  const locationData = {
    id,
    name: "LOCATION NAME",
    description: `Here is a detailed description of location ${id}. More text goes here to elaborate on the location details.`,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400"
    ]
  };

  return (
    <div className="location-page">
      <div className="location-header">
        <h1 className="location-title">{locationData.name}</h1>
      </div>
      {locationData.images.map((image, index) => (
        <img key={index} src={image} alt={`Location ${locationData.id}`} className="location-image" />
      ))}
      <div className="location-content">
        <div className="location-description">{locationData.description}</div>
      </div>
    </div>
  );
};

export default LocationPage;