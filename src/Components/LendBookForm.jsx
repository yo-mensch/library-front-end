import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const LendBookForm = ({ show, onClose, book }) => {
  const [clientName, setClientName] = useState("");
  const [clientSurname, setClientSurname] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [dealineDate, setDeadlineDate] = useState("");

  const updateBook = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3004/book/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: book.name,
            author: book.author,
            ISBN: book.ISBN,
            status: "Paskolinta" 
          }),
        }
      );
      if (response.ok) {
        window.location.reload(false);
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createLending = async(e) => {
    
  }

  const handleLend = async(e) => {
    e.preventDefault();
    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);
    setDeadlineDate(oneMonthLater);
    updateBook();

    // Close the modal
    handleClose();
  };

  const handleClose = () => {
    setClientName("");
    setClientSurname("");
    setClientPhoneNumber("");

    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lend Book</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleLend}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Client's Nameaaaaa:</Form.Label>
            <Form.Control
              required
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Client's Surname:</Form.Label>
            <Form.Control
              required
              type="text"
              value={clientSurname}
              onChange={(e) => setClientSurname(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Client's Phone Number:</Form.Label>
            <Form.Control
              required
              type="text"
              value={clientPhoneNumber}
              onChange={(e) => setClientPhoneNumber(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Lend
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LendBookForm;
