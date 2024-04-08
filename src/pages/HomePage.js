import React, { useState, useEffect } from 'react';
import SearchBarComponent from '../components/SearchBarComponent';
import LocationsList from '../components/LocationsList';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure this path is correct

const HomePage = () => {
  const [locations, setLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]); // Store all listings for search filtering

  useEffect(() => {
    const fetchAndUpdateListings = async () => {
      const querySnapshot = await getDocs(collection(db, 'listings'));
      const updates = []; // Keep track of update promises

      const locationData = querySnapshot.docs.map(docSnapshot => {
        const data = docSnapshot.data();
        const id = docSnapshot.id;

        // Check if featureList isn't already there, then prepare to update
        if (!data.featureList) {
          const featureList = [
            data.cityState, // cityState as a single element
            data.title, // title as a single element
            ...(data.tags || []), // Spread the tags if they exist
          ];
          updates.push(updateDoc(doc(db, 'listings', id), { featureList }));

          // Update the data object for immediate use
          data.featureList = featureList;
        }
        
        // Return the data for rendering, ensure cityState is correctly mapped
        return {
          id,
          ...data,
          image: data.pictures[0] || "https://via.placeholder.com/150",
          city: data.cityState, // Make sure this line correctly maps to your component's expectations
        };
      });

      // Wait for all Firestore updates to complete (if any)
      await Promise.all(updates);

      // Set both the filtered locations and all locations
      setLocations(locationData);
      setAllLocations(locationData);
    };

    fetchAndUpdateListings();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // Reset to show all locations if search is cleared
      setLocations(allLocations);
    } else {
      // Filter locations based on the search term
      const filteredLocations = allLocations.filter(location =>
        location.featureList && location.featureList.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setLocations(filteredLocations); // Update locations with filtered results
    }
  };

  return (
    <>
      <SearchBarComponent onSearch={handleSearch} />
      <LocationsList locations={locations} />
    </>
  );
};

export default HomePage;
