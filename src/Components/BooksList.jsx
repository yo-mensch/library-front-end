import React from "react";
import { Grid } from "@mui/material";
import "./style/BooksList.css";
import BookCard from "./BookCard";

function BooksList({ books, editBook, deleteBook, updateBook }) {
  return (
    <Grid
      container
      spacing={2}
      className="container"
      direction="row"
      alignItems="center"
    >
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          editBook={editBook}
          deleteBook={deleteBook}
          updateBook={updateBook}
        />
      ))}
    </Grid>
  );
}

export default BooksList;
