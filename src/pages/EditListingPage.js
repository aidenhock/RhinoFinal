import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const EditListingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: '',
    cityState: '',
    tags: [],
    description: '',
    pictures: [],
  });
  const [newImages, setNewImages] = useState([]);
  const [deleteImageIndices, setDeleteImageIndices] = useState(new Set());

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing({
          ...docSnap.data(),
          tags: docSnap.data().tags.join(', '), // Convert array of tags to string
        });
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
      [name]: value
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
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
        const updatedPictures = listing.pictures.filter((_, idx) => idx !== imageIndex);
        setListing({ ...listing, pictures: updatedPictures });
      } catch (error) {
        console.error('Error deleting image: ', error);
      }
    }
  };

  const handleUploadImages = async () => {
    const uploadPromises = Array.from(newImages).map(file => {
      const imageRef = ref(storage, `listings/${Date.now()}_${file.name}`);
      return uploadBytes(imageRef, file).then(snapshot => getDownloadURL(snapshot.ref));
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmUpdate = window.confirm("Update listing? Please confirm your changes.");
    if (confirmUpdate) {
      try {
        const newImageUrls = await handleUploadImages();
        const updatedPictures = [
          ...listing.pictures.filter((_, index) => !deleteImageIndices.has(index)),
          ...newImageUrls,
        ];

        await updateDoc(doc(db, 'listings', id), {
          ...listing,
          tags: listing.tags.split(',').map(tag => tag.trim()), // Convert string back to array
          pictures: updatedPictures,
          description: listing.description, // Ensure description is included in update
        });

        alert('Listing updated successfully');
        navigate('/manage');
      } catch (error) {
        console.error('Error updating listing: ', error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete listing? This will also delete all associated images.");
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'listings', id));
        alert('Listing deleted successfully');
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
        {/* Title */}
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
        {/* City and State */}
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
        {/* Tags */}
        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            value={listing.tags}
            onChange={handleChange}
          />
        </Form.Group>
        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={listing.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Upload New Images */}
        <Form.Group className="mb-3">
          <Form.Label>Upload New Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleNewImageChange}
          />
        </Form.Group>
        
        <Row className="mb-3">
          {listing.pictures.map((url, index) => (
            <Col xs={6} md={4} lg={3} key={index} className="mb-2">
              <div className="image-thumbnail">
                <img src={url} alt={`Listing ${index}`} className="img-fluid" />
                <Button variant="danger" onClick={() => handleDeleteImage(index)}>Delete</Button>
              </div>
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
