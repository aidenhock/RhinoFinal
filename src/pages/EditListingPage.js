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
        setListing({ ...docSnap.data(), id: docSnap.id });
      } else {
        alert('Listing does not exist');
        navigate('/manage');
      }
    };
    fetchListing();
  }, [id, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setListing((prevListing) => ({
      ...prevListing,
      [name]: name === 'tags' ? value.split(',').map((tag) => tag.trim()) : value,
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
        await updateDoc(doc(db, 'listings', id), { pictures: updatedPictures });
        setListing({ ...listing, pictures: updatedPictures });
        alert('Image deleted successfully');
      } catch (error) {
        console.error('Error deleting image: ', error);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmUpdate = window.confirm("Are you sure you want to update this listing?");
    if (confirmUpdate) {
      try {
        const newImageUrls = await handleUploadImages();
        const allImageUrls = [
          ...listing.pictures,
          ...newImageUrls
        ];
        const updatedListing = {
          ...listing,
          tags: listing.tags.split(',').map(tag => tag.trim()), // Ensure tags are an array
          pictures: allImageUrls
        };
        await updateDoc(doc(db, 'listings', id), updatedListing);
        alert('Listing updated successfully');
        navigate('/manage');
      } catch (error) {
        console.error('Error updating listing: ', error);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (confirmDelete) {
      try {
        const deletionPromises = listing.pictures.map((imageUrl) => {
          const imageRef = ref(storage, imageUrl);
          return deleteObject(imageRef);
        });
        await Promise.all(deletionPromises);
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
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={listing.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload New Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={handleNewImageChange}
          />
        </Form.Group>
        {listing.pictures.map((url, index) => (
          <Row className="mb-3" key={url}>
            <Col xs={12} md={6}>
              <img src={url} alt={`Listing ${index}`} className="img-fluid" />
            </Col>
            <Col xs={12} md={6}>
              <Button variant="danger" onClick={() => handleDeleteImage(index)}>
                Delete Image
              </Button>
            </Col>
          </Row>
        ))}
        <Button variant="primary" type="submit">Update Listing</Button>
        <Button variant="danger" onClick={handleDelete} className="ms-2">Delete Listing</Button>
      </Form>
    </Container>
  );
};

export default EditListingPage;
