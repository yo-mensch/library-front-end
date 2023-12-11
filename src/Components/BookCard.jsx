import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import LendBookForm from "./LendBookForm";
import "./style/BooksList.css";
import LendingInfoModal from "./LendingInfoModal";

function BookCard({ book, editBook, deleteBook, updateBook }) {
  const [showLendForm, setShowLendForm] = useState(false);
  const [showLendInfoModal, setShowLendInfoModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(book);

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
  };

  const handleLendClick = () => {
    setShowLendForm(true);
  };

  const handleLendFormClose = () => {
    setShowLendForm(false);
  };

  const handleLendInfoModal = () => {
    setShowLendInfoModal(true);
  }

  const handleLendingInfoClose = () => {
    setShowLendInfoModal(false);
  };

  return (
    <>
      <Grid item xs={8} sm={6} md={4}>
        <Card className="list-item">
          <h3>
            {book.name}
          </h3>
          <h5>
            {book.author}
          </h5>
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
          {book.status === "Laisva" ? (
            <Button
              variant="outline-disabled"
              onClick={() => handleLendClick(book)}
            >
              Lend
            </Button>
          ) : (
            <Button variant="outline-disabled" onClick={handleLendInfoModal}>
              Lending info
            </Button>
          )}
        </Card>
      </Grid>
      <LendBookForm
        show={showLendForm}
        onClose={handleLendFormClose}
        book={selectedBook}
        updateBook={updateBook}
      />
      <LendingInfoModal
        show={showLendInfoModal}
        onClose={handleLendingInfoClose}
        book={selectedBook}
        updateBook={updateBook}
      />
    </>
  );
}

export default BookCard;
