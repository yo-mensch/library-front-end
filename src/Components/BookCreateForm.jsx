import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./style/BookCreateForm.css"

function BookCreateForm(props) {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookName && authorName) {
      props.addBook({ id: Date.now(), title: bookName, author: authorName });
      setBookName("");
      setAuthorName("");
    }
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <h3>Add Book</h3>
        <Form.Group>
          <Form.Label>Book Name:</Form.Label>
          <Form.Control
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </Container>
  );
}

export default BookCreateForm;
