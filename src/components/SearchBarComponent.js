import React from 'react';
import { Container, Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Stateless functional component for search bar
const SearchBarComponent = ({ onSearch }) => {
  // Handler for search input, this would be passed from the parent component if needed
  const handleSearch = (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value.trim();
    onSearch(searchTerm);
  };

  return (
    <Container style={{ marginTop: '1rem' }}>
      <Form className="d-flex" onSubmit={handleSearch}>
        <FormControl
          type="text"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          name="search"
        />
        <Button variant="outline-success" type="submit">Search</Button>
      </Form>
    </Container>
  );
};

// Prop-Types can be used to enforce the type of props the component expects
SearchBarComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBarComponent;
