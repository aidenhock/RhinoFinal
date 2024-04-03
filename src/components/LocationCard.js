import React from 'react';
import { Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Functional component for an individual location card
const LocationCard = ({ location }) => {
  return (
    <Col md={4} style={{ marginBottom: '2rem' }}>
      <Card>
        <Card.Header>{location.title}</Card.Header>
        <Card.Img variant="top" src={location.image} alt={`Image of ${location.title}`} />
        <Card.Body>
          {/* Additional card content like a description could go here */}
        </Card.Body>
        <Card.Footer>
          {location.city}
        </Card.Footer>
      </Card>
    </Col>
  );
};

// Prop types validation
LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default LocationCard;
