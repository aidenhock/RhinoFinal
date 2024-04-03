
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCPV4Ab6FBu-5UCJiFbNXsAeGC0YdLXxDc",
//   authDomain: "rhino4fun-91db0.firebaseapp.com",
//   projectId: "rhino4fun-91db0",
//   storageBucket: "rhino4fun-91db0.appspot.com",
//   messagingSenderId: "1093431620967",
//   appId: "1:1093431620967:web:e6742b436279bbf107ebc2",
//   measurementId: "G-1C78KFH4GP"
// };
import React from 'react';
import { Container, Row, Col, Card, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const locations = [
    // Placeholder data for locations
    { id: 1, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 6, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
    { id: 7, title: "Location Title", city: "City, CA", image: "https://via.placeholder.com/150" },
      
    // ... additional locations
  ];

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">RHINOS LOCATION</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#locations">Locations</Nav.Link>
              <Nav.Link href="#about">About Me</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search bar below the navigation bar */}
      <Container style={{ marginTop: '1rem' }}>
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>

      <Container style={{ marginTop: '2rem' }}>
        <Row>
          {locations.map((location) => (
            <Col md={4} key={location.id} style={{ marginBottom: '2rem' }}>
              <Card>
                <Card.Header>{location.title}</Card.Header>
                <Card.Img variant="top" src={location.image} />
                <Card.Footer>
                  {location.city}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
