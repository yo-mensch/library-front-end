import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./style/BookUpdateForm.css";

function BookUpdateForm(props) {
  const [name, setName] = useState(props.book ? props.book.name : "");
  const [author, setAuthor] = useState(
    props.book ? props.book.author : ""
  );
  const [ISBN, setISBN] = useState(props.book? props.book.ISBN: "");
  const [status, setStatus] = useState(props.book? props.book.status: "");
  const statusOptions = ["Laisva", "Paskolinta"];

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (name && author) {
      try {
        const response = await fetch(
          `http://localhost:3004/book/${props.book._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, author, ISBN, status }),
          }
        );
        if (response.ok) {
          window.location.reload(false);
        } else {
          const errorData = await response.json();
          console.log(errorData); // Log the error data to the console
        }
      } catch (error) {
        console.error(error);
      }
      props.updateBook();
    }
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <h3>Edit Book</h3>
        <Form.Group>
          <Form.Label>Book Name:</Form.Label>
          <Form.Control
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            required
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ISBN:</Form.Label>
          <Form.Control
            type="text"
            required
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>Select Status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
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
