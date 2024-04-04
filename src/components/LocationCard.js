import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LocationCard = ({ location }) => {
  return (
    <Col md={4} style={{ marginBottom: '2rem' }}>
      <Link to={`/locations/${location.id}`} style={{ textDecoration: 'none' }}>
        <Card>
          <Card.Img variant="top" src={location.image} alt={`Image of ${location.title}`} />
          <Card.Body>
            <Card.Title>{location.title}</Card.Title>
            {/* Additional content */}
          </Card.Body>
          <Card.Footer>
            {location.city}
          </Card.Footer>
        </Card>
      </Link>
    </Col>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default LocationCard;
