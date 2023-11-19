import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./style/BooksList.css";

function BooksList({ books, editBook, deleteBook }) {
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
  }
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
              onClick={() => console.log("cia keisis knygos statusas")}
            >
              Lend
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BooksList;
