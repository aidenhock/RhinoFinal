import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './NavbarComponent.css'; // Make sure to include this

<<<<<<< HEAD
const NavbarComponent = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">RHINO LOCATIONS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About Me</Nav.Link>
          <Nav.Link as={Link} to="/manage">Manage</Nav.Link> 
          {/* You can add more Nav.Link here as needed */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
=======
const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" className="flex-column text-center">
      <Navbar.Brand href="/" className="justify-content-center mb-0 w-100">
         RHINO LOCATIONS
      </Navbar.Brand>
      <Nav className="justify-content-center w-100">
        <Nav.Link href="/">LOCATIONS</Nav.Link>
        <Nav.Link href="/about">ABOUT ME</Nav.Link>
      </Nav>
    </Navbar>
  );
}
>>>>>>> f751098d8ea973b665c990fd86aa4e84d8604964

export default NavbarComponent;
