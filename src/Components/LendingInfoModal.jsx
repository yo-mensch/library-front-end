import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";

const LendingInfoModal = ( {show, onClose, book, updateBook, lending} ) => {
  const [formReturnDate, setFormReturnDate] = useState("");
  const [dateWhenReturned, setDateWhenReturned] = useState("");

  useEffect(() => {
    if (dateWhenReturned) {
      // This block will execute when dealineDate changes
      updateBookReq();
      updateLending();
      // Close the modal
      handleClose();
    }
  }, [dateWhenReturned]);


  const updateBookReq = async () => {
    try {
      const response = await fetch(`http://localhost:3004/book/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: book.name,
          author: book.author,
          ISBN: book.ISBN,
          status: "Laisva",
        }),
      });
      if (response.ok) {
        console.log("response is okey");
        updateBook();
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLending = async () => {
    try {
      const response = await fetch(
        `http://localhost:3004/book/lend/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book_id: book._id,
            lendingStatus: "Grąžinta",
            clientName: lending.clientName,
            clientSurname: lending.clientSurname,
            clientPhoneNumber: lending.clientPhoneNumber,
            deadline: lending.dealineDate,
            dateWhenReturned: "",
          }),
        }
      );
      if (response.ok) {
        console.log("response is okey");
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBookReturn = (e) => {
    e.preventDefault();
    setDateWhenReturned(formReturnDate.toISOString()); // Ensure it's in the correct format
  };

  const handleClose = () => {
    setDateWhenReturned("");
    setFormReturnDate("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lending info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
      </Modal.Footer>
      {/* <Form onSubmit={handleLend}> */}
      {/* <Modal.Body>
          <Form.Group>
            <Form.Label>Client's Name:</Form.Label>
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
            
          </Button>
        </Modal.Footer> */}
      {/* </Form> */}
    </Modal>
  );
};

export default LendingInfoModal;
