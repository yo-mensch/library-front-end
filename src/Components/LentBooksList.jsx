import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import LendBookForm from "./LendBookForm";
import "./style/BooksList.css";

function LentBooksList({ books, editBook, updateBook }) {
  const [showLendForm, setShowLendForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [lentBooks, setLentBooks] = useState([]);

  useEffect(() => {
    setLentBooks(books.filter((book) => {
        return book.status === "Paskolinta";
    }))
  }, [lentBooks]);
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
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleLendClick = (book) => {
    setSelectedBook(book);
    setShowLendForm(true);
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
      {lentBooks.map((book) => (
        <Grid item xs={8} sm={6} md={4} key={book._id}>
          <Card className="list-item">
            <Card.Title>
              {book.name} by {book.author}
            </Card.Title>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
            <ButtonGroup>
            <Button
              variant="outline-disabled"
              onClick={() => handleLendClick(book)}
            >
              Show lending info
            </Button>
            </ButtonGroup>
          </Card>
        </Grid>
      ))}
      <LendBookForm show={showLendForm} onClose={handleLendFormClose} book={selectedBook} updateBook={updateBook}/>
    </Grid>
  );
}

export default LentBooksList;
