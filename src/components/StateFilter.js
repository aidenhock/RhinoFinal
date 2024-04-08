// StateFilter.js
import React from 'react';
import { Form } from 'react-bootstrap';

const StateFilter = ({ availableStates, selectedStates, onStateChange }) => {
  const handleStateSelectionChange = (state, isChecked) => {
    const newSelectedStates = isChecked 
      ? [...selectedStates, state] 
      : selectedStates.filter(selectedState => selectedState !== state);
    onStateChange(newSelectedStates);
  };

  return (
    <div>
      <h5>Select State(s):</h5>
      {availableStates.map((state) => (
        <Form.Check
          key={state}
          type="checkbox"
          label={state}
          checked={selectedStates.includes(state)}
          onChange={(e) => handleStateSelectionChange(state, e.target.checked)}
        />
      ))}
    </div>
  );
};

export default StateFilter;
