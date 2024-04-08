// src/pages/EditListingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import './EditListingPage.css';

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIndices, setDeleteImageIndices] = useState(new Set());

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
      } else {
        alert('Listing does not exist');
        navigate('/manage');
      }
    };
    fetchListing();
  }, [id, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setListing(prevListing => ({
      ...prevListing,
      [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }));
  };

  const handleNewImageChange = (e) => {
    setNewImages(e.target.files);
  };

  const handleDeleteImage = async (imageIndex) => {
    const imageUrl = listing.pictures[imageIndex];
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    
    if (confirmDelete) {
      try {
        // Create a reference to the file to delete
        const imageRef = ref(storage, imageUrl);
  
        // Delete the file from Firebase Storage
        await deleteObject(imageRef);
  
        // Remove the image URL from the local state and Firestore
        const updatedPictures = listing.pictures.filter((_, idx) => idx !== imageIndex);
        await updateDoc(doc(db, 'listings', id), { pictures: updatedPictures });
  
        // Update local state
        setListing({ ...listing, pictures: updatedPictures });
  
        alert('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image: ', error);
      }
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (window.confirm("Update listing? Please confirm your changes.")) { // Confirmation dialog for update
      const newImageUrls = newImages.length ? await handleUploadImages() : [];
      const allImageUrls = [
        ...listing.pictures.filter((_, index) => !deleteImageIndices.has(index)),
        ...newImageUrls
      ];

      try {
        await updateDoc(doc(db, 'listings', id), {
          ...listing,
          pictures: allImageUrls
        });

        alert('Listing updated successfully');
        navigate('/manage');
      } catch (error) {
        console.error('Error updating listing: ', error);
      }
    }
  };

  const handleUploadImages = async () => {
    return Promise.all(Array.from(newImages).map(async (file) => {
      const imageRef = ref(storage, `listings/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      return getDownloadURL(snapshot.ref);
    }));
  };


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete listing? This will also delete all associated images.");
    
    if (confirmDelete) {
      try {
        // Delete all images from Firebase Storage
        const deletionPromises = listing.pictures.map((imageUrl) => {
          const imageRef = ref(storage, imageUrl);
          return deleteObject(imageRef);
        });
  
        await Promise.all(deletionPromises);
  
        // Delete the listing from Firestore
        await deleteDoc(doc(db, 'listings', id));
  
        alert('Listing and all associated images have been deleted successfully');
        navigate('/manage');
      } catch (error) {
        console.error('Error deleting listing: ', error);
      }
    }
  };
  


  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col className="text-center">
          <h2>Edit Listing</h2>
        </Col>
      </Row>      
      <Form onSubmit={handleSubmit}>
        
    <Form.Group className="form-group">
      <Form.Label className="form-label">Title</Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={listing.title}
        onChange={handleChange}
        className="form-control"
        required
      />
  </Form.Group>

  {/* City and State Field */}
  <Form.Group className="form-group">
      <Form.Label className="form-label">City & State</Form.Label>
      <Form.Control
        type="text"
        name="cityState"
        value={listing.cityState}
        onChange={handleChange}
        className="form-control"
        required
      />
  </Form.Group>

  <Form.Group className="form-group">
      <Form.Label className="form-label">Tags (comma-seperated)</Form.Label>
      <Form.Control
        type="text"
        name="tags"
        value={listing.tags}
        onChange={handleChange}
        className="form-control"
      />
  </Form.Group>


  <Form.Group className="form-group">
      <Form.Label className="form-label">Upload New Images</Form.Label>
      <Form.Control
        type="file"
        multiple
        onChange={handleNewImageChange}
      />
  </Form.Group>


  {/* Buttons */}
  <Row className="mt-4">
  <Button variant="primary" type="submit" className="custom-button my-3">Update Listing</Button>
  <Button variant="primary" onClick={handleDelete} className="custom-button my-3">Delete Listing</Button>   
      
  </Row>
</Form>


    </Container>
  );
};

export default EditListingPage;
