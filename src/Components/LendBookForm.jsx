// LendBookForm.jsx
import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

const LendBookForm = ({ onLend, onClose, book }) => {
  const [clientName, setClientName] = useState('');
  const [clientSurname, setClientSurname] = useState('');
  const [clientPhoneNumber, setClientPhoneNumber] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    clientName: '',
    clientSurname: '',
    clientPhoneNumber: '',
  });

  const handleLend = () => {
    // Validate input fields
    console.log(clientName);
    const errors = {};
    if (!clientName) {
      errors.clientName = 'Client\'s Name is required.';
    }
    if (!clientSurname) {
      errors.clientSurname = 'Client\'s Surname is required.';
    }
    if (!clientPhoneNumber) {
      errors.clientPhoneNumber = 'Client\'s Phone Number is required.';
    }
    // If there are validation errors, update the state and return
    //  if (Object.values(errors).some(error => error !== '')) {
    //    setValidationErrors(errors);
    //   return;
    // }

    // Call the onLend function with the client information
    onLend({
      clientName,
      clientSurname,
      clientPhoneNumber,
    });

    // Reset the form fields and error messages
    setClientName('');
    setClientSurname('');
    setClientPhoneNumber('');
    setValidationErrors({});

    // Close the modal
    onClose();
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    // Clear validation error when any input field changes
    setValidationErrors({});
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lend Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="clientName">
            <Form.Label>Client's Name:</Form.Label>
            <Form.Control
              type="text"
              value={clientName}
              onChange={(e) => handleInputChange(e, setClientName)}
            />
            {/* Display validation error message for clientName */}
            {validationErrors.clientName && <Alert variant="danger">{validationErrors.clientName}</Alert>}
          </Form.Group>
          <Form.Group controlId="clientSurname">
            <Form.Label>Client's Surname:</Form.Label>
            <Form.Control
              type="text"
              value={clientSurname}
              onChange={(e) => handleInputChange(e, setClientSurname)}
            />
            {/* Display validation error message for clientSurname */}
            {validationErrors.clientSurname && <Alert variant="danger">{validationErrors.clientSurname}</Alert>}
          </Form.Group>
          <Form.Group controlId="clientPhoneNumber">
            <Form.Label>Client's Phone Number:</Form.Label>
            <Form.Control
              type="text"
              value={clientPhoneNumber}
              onChange={(e) => handleInputChange(e, setClientPhoneNumber)}
            />
            {/* Display validation error message for clientPhoneNumber */}
            {validationErrors.clientPhoneNumber && <Alert variant="danger">{validationErrors.clientPhoneNumber}</Alert>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLend}>
          Lend
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LendBookForm;
