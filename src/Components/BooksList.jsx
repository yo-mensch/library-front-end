import React, { useState } from "react";
import { Button, ButtonGroup, Card, Modal, Form } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./style/BooksList.css";

function BooksList({ books, editBook, deleteBook }) {
  const [showLendForm, setShowLendForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    clientSurname: "",
    clientPhoneNumber: "",
  });

  const handleDelete = (_id) => {
    fetch(`http://localhost:3004/book/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the deleted book from the local state
        deleteBook();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLendClick = (book) => {
    setSelectedBook(book);
    setShowLendForm(true);
  };

  const handleLend = (clientInfo) => {
    
    console.log('Lending book with client info:', clientInfo);
    setShowLendForm(false);
  };

  const handleLendFormClose = () => {
    setShowLendForm(false);
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
        <Grid item xs={8} sm={6} md={4} key={book._id}>
          <Card className="list-item">
            <Card.Title>
              {book.name} by {book.author}
            </Card.Title>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {book.status}
            </Typography>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => editBook(book)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(book._id)}>
                Delete
              </Button>
            </ButtonGroup>
            <Button
              variant="outline-disabled"
              onClick={() => handleLendClick(book)}
            >
              Lend
            </Button>
          </Card>
        </Grid>
      ))}
      {showLendForm && (
        <Modal show={showLendForm} onHide={handleLendFormClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lend Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  <Form>
    <Form.Group controlId="clientName">
      <Form.Label>Client's Name:</Form.Label>
      <Form.Control
        type="text"
        value={clientInfo.clientName}
        onChange={(e) =>
          setClientInfo({
            ...clientInfo,
            clientName: e.target.value,
          })
        }
      />
    </Form.Group>
    <Form.Group controlId="clientSurname">
      <Form.Label>Client's Surname:</Form.Label>
      <Form.Control
        type="text"
        value={clientInfo.clientSurname}
        onChange={(e) =>
          setClientInfo({
            ...clientInfo,
            clientSurname: e.target.value,
          })
        }
      />
    </Form.Group>
    <Form.Group controlId="clientPhoneNumber">
      <Form.Label>Client's Phone Number:</Form.Label>
      <Form.Control
        type="text"
        value={clientInfo.clientPhoneNumber}
        onChange={(e) =>
          setClientInfo({
            ...clientInfo,
            clientPhoneNumber: e.target.value,
          })
        }
      />
    </Form.Group>
  </Form>
</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleLendFormClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleLend(clientInfo)}>
              Lend
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Grid>
  );
}

export default BooksList;
