import React, { useState } from "react";
import { Button, ButtonGroup, Card, Modal, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
import "./style/BooksList.css";

function BooksList({ books, editBook, deleteBook }) {

  const [showPopup, setShowPopup] = useState(false);
  const [lendTo, setLendTo] = useState("");

  const handleLendSubmit = () => {
    // prideti logika???
    console.log('Lending book to: ${lendTo}');
    setShowPopup(false);
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
              //onClick={() => console.log("cia keisis knygos statusas")}
              onClick={() => setShowPopup(true)}
            >
              Lend
            </Button>
          </Card>
        </Grid>
      ))}
      {/* Pop-up window (form) */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
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
          <Button variant="secondary" onClick={() => setShowPopup(false)}>
            Close
          </Button>
          {/* Add your form submission button here */}
          <Button variant="primary" onClick={handleLendSubmit}>
            Lend
          </Button>
        </Modal.Footer>
      </Modal>
    </Grid>
  );
}

export default BooksList;