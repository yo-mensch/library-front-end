import React, { useState } from "react";
import { Button, ButtonGroup, Card, Modal, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
import "./style/BooksList.css";
import LentBooksList from "./LentBooksList";

function BooksList({ books, editBook, deleteBook }) {
  const [showLendPopup, setShowLendPopup] = useState(false);
  const [showLentBooksPopup, setShowLentBooksPopup] = useState(false);
  const [lendTo, setLendTo] = useState("");
  const [lentBooks, setLentBooks] = useState([]);

  const handleLendSubmit = () => {
    const updatedBooks = [...lentBooks, lendTo];
    setLentBooks(updatedBooks);
    setShowLendPopup(false); // Fix this line
  };

  const handleShowLentBooks = () => {
    setShowLentBooksPopup(true);
  };

  const handleCloseLentBooks = () => {
    setShowLentBooksPopup(false);
  };

  return (
    <Grid
      container
      spacing={2}
      className="container"
      direction="row"
      alignItems="center"
    >
      {books.map((book) => (
        <Grid item xs={8} sm={6} md={4} key={book.id}>
          <Card className="list-item">
            <Card.Title>
              {book.title} by {book.author}
            </Card.Title>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => editBook(book)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteBook(book.id)}>
                Delete
              </Button>
            </ButtonGroup>
            <Button
              variant="outline-disabled"
              onClick={() => {
                setLendTo("");
                setShowLendPopup(true);
              }}
            >
              Lend
            </Button>
          </Card>
        </Grid>
      ))}

      {/* Pop-up window (form) */}
      <Modal show={showLendPopup} onHide={() => setShowLendPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lend Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form components here */}
          <Form.Group controlId="formUserName">
            <Form.Label>User's Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user's name"
              value={lendTo}
              onChange={(e) => setLendTo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLendPopup(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLendSubmit}>
            Lend
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Show Lent Books Pop-up window */}
      <LentBooksList
        show={showLentBooksPopup}
        onClose={handleCloseLentBooks}
        lentBooks={lentBooks}
      />
    </Grid>
  );
}

export default BooksList;
