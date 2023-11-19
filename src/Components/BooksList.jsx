import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./style/BooksList.css";

function BooksList({ books, editBook, deleteBook }) {
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
              <Button variant="danger" onClick={() => deleteBook(book.id)}>
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
