import React from "react";
import { Button, ButtonGroup, ListGroup, Card } from "react-bootstrap";
import "./style/BooksList.css"

function BooksList({ books, editBook, deleteBook }) {
  return (
    <ListGroup className="container">
      {books.map((book) => (
        <Card className="list-item" key={book.id}>
          <h4>{book.title} by {book.author}</h4>
          <ButtonGroup>
            <Button variant='secondary' onClick={() => editBook(book)}>Edit</Button>
            <Button variant='danger' onClick={() => deleteBook(book.id)}>Delete</Button>
          </ButtonGroup>
          <Button
            variant="outline-disabled"
            onClick={() => console.log("cia keisis knygos statusas")}
          >
            Lend
          </Button>
        </Card>
      ))}
    </ListGroup>
  );
}

export default BooksList;
