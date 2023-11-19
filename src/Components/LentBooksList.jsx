import React from "react";
import { Modal, Button } from "react-bootstrap";

function LentBooksList({ show, onClose, lentBooks }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lent Books</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the list of lent books */}
        <p>Lent Books:</p>
        <ul>
          {lentBooks.map((user, index) => (
            <li key={index}>{user}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LentBooksList;