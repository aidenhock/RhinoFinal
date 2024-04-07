import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import './ManageListingPage.css';


const ManageListingsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState({
    title: '',
    cityState: '',
    tags: '',
    pictures: [],
  });
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();

  const fetchListings = async () => {
    const querySnapshot = await getDocs(collection(db, 'listings'));
    setListings(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    fetchListings(); // Optionally refetch listings when the modal closes
  };

  const handleChange = ({ target: { name, value } }) => {
    setNewListing({ ...newListing, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleImageUpload = async () => {
    const uploadPromises = Array.from(imageFiles).map(file => {
      const fileRef = ref(storage, `listings/${Date.now()}_${file.name}`);
      return uploadBytes(fileRef, file).then(snapshot => getDownloadURL(snapshot.ref));
    });
    return Promise.all(uploadPromises);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrls = await handleImageUpload();
    try {
      await addDoc(collection(db, 'listings'), {
        ...newListing,
        tags: newListing.tags.split(',').map(tag => tag.trim()),
        pictures: imageUrls,
      });
      handleCloseModal();
      setNewListing({ title: '', cityState: '', tags: '', pictures: [] });
      setImageFiles([]);
    } catch (error) {
      console.error('Error adding listing: ', error);
    }
  };

  const handleListingClick = (id) => {
    navigate(`/manage/edit/${id}`);
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShowModal} className="custom-button my-3">
        + Add Listing
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col xs="auto">
              <Button type="button" className="custom-label-button">
                Title
              </Button>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="title"
                required
                value={newListing.title}
                onChange={handleChange}
                className="custom-form-input"
              />
            </Col>
          </Form.Group>
{/* Repeat for other Form.Group components */}

<Form.Group as={Row} className="mb-3 align-items-center">
            <Col xs="auto">
              <Button type="button" className="custom-label-button">
                City & State
              </Button>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="cityState"
                required
                value={newListing.cityState}
                onChange={handleChange}
                className="custom-form-input"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Col xs="auto">
              <Button type="button" className="custom-label-button">
                Tags (comma-seperated)
              </Button>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="tags"
                required
                value={newListing.tags}
                onChange={handleChange}
                className="custom-form-input"
              />
            </Col>
          </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="file-upload" className="custom-file-upload">
                Choose Files
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                id="file-upload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="custom-button">
                 Save Listing
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {listings.map(listing => (
          <Col key={listing.id} md={4} className="mb-3">
            <Card onClick={() => handleListingClick(listing.id)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={listing.pictures[0] || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                <Card.Text>{listing.cityState}</Card.Text>
                <Card.Text>{listing.tags.join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageListingsPage;
    