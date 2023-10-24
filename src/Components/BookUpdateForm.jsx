import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import './style/BookUpdateForm.css'

function BookUpdateForm(props) {
  const [bookName, setBookName] = useState(props.book ? props.book.title : "");
  const [authorName, setAuthorName] = useState(
    props.book ? props.book.author : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookName && authorName) {
      props.updateBook({ ...props.book, title: bookName, author: authorName });
    }
  };

  return (
    <Container className="form-container">
    <Form onSubmit={handleSubmit}>
    <h3>Edit Book</h3>
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
      <Button type="submit">Update Book</Button>
      <Button variant="light" onClick={props.closeEditForm}>
        Close
      </Button>
    </Form>
    </Container>
  );
}

export default BookUpdateForm;
