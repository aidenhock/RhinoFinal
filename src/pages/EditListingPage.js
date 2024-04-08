// src/pages/EditListingPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';

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
      <h2>Edit Listing</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={listing.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City and State</Form.Label>
          <Form.Control
            type="text"
            name="cityState"
            value={listing.cityState}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={listing.tags.join(',')}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload New Images</Form.Label>
          <Form.Control type="file" multiple onChange={handleNewImageChange} />
        </Form.Group>
        <Row className="mb-3">
          {listing.pictures.map((url, index) => (
            <Col xs={6} md={4} lg={3} key={index} className="mb-2">
              {!deleteImageIndices.has(index) && (
                <div className="image-thumbnail">
                  <img src={url} alt={`Listing ${index}`} style={{ width: '100%', height: 'auto' }} />
                  <Button variant="danger" onClick={() => handleDeleteImage(index)}>Delete</Button>
                </div>
              )}
            </Col>
          ))}
        </Row>
        <Button variant="primary" type="submit">Update Listing</Button>
        <Button variant="danger" onClick={handleDelete} className="ms-2">Delete Listing</Button>
      </Form>
    </Container>
  );
};

export default EditListingPage;
