import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "./style/BookCreateForm.css"

function BookCreateForm({fetchData}) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [status, setStatus] = useState("");
  const statusOptions = ["Laisva"];

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (name && author) {
      try {
        console.log(status)
        const response = await fetch("http://localhost:3004/book/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, author, ISBN, status})
        });
        if(response.ok){
          console.log("response is okey");
          fetchData();
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error)
      }
      setName("");
      setAuthor("");
      setISBN("");
      setStatus("");
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
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            required
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
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </Container>
  );
}

export default BookCreateForm;
