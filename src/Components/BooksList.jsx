import React from "react";
import { Button, ButtonGroup, ListGroup } from "react-bootstrap";

function BooksList({ books, editBook, deleteBook }) {
  return (
    <ListGroup>
      {books.map((book) => (
        <ListGroup.Item key={book.id}>
          {book.title} by {book.author}
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
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default BooksList;
