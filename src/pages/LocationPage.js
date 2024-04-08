import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct
import './LocationPage.css'; // Make sure to include the CSS file

const LocationPage = () => {
  let { id } = useParams(); // This hook gives us access to the URL parameters
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const docRef = doc(db, 'listings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Extract data and update state
          setLocationData({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting document:', error);
      }
    };

    fetchLocationData();
  }, [id]); // Re-run the effect if the URL parameter `id` changes

  // If data has not been fetched yet, you can show a loading spinner or a placeholder
  if (!locationData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="location-page">
      <div className="location-header">
        <h1 className="location-title">{locationData.title}</h1>
      </div>
      {locationData.pictures.map((image, index) => (
        <img key={index} src={image} alt={`${locationData.title}`} className="location-image" />
      ))}
      <div className="location-content">
        <p className="location-description">{locationData.description}</p>
        {/* Render tags as buttons */}
        <div className="location-tags">
          {locationData.tags.map((tag, index) => (
            <button key={index} className="tag-button">
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
