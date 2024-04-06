import React, { useState, useEffect } from 'react';
import SearchBarComponent from '../components/SearchBarComponent';
import LocationsList from '../components/LocationsList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

const HomePage = ({ onSearch }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const querySnapshot = await getDocs(collection(db, 'listings'));
      const locationData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure the property names match those expected by LocationCard and LocationsList
        image: doc.data().pictures[0] || "https://via.placeholder.com/150",
        city: doc.data().cityState, // Assuming cityState is the property in your firestore
        title: doc.data().title,
      }));
      setLocations(locationData);
    };

    fetchListings();
  }, []);

  return (
    <>
      <SearchBarComponent onSearch={onSearch} />
      <LocationsList locations={locations} />
    </>
  );
};

export default HomePage;
