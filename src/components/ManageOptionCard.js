// Implement modulirization by completing template for each card routing necessary for updating 

import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ManageOptionCard = ({ title, description, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <Card className="text-center" style={{ cursor: 'pointer' }} onClick={handleClick}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ManageOptionCard;
