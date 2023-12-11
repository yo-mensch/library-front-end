import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import LendBookForm from "./LendBookForm";
import "./style/BooksList.css";
import LendingInfoModal from "./LendingInfoModal";

function BookCard({ book, editBook, deleteBook, updateBook }) {
  const [lending, setLending] = useState({});
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

  const fetchLending = async () => {
    try {
      const response = await fetch(`http://localhost:3004/book/lent`, {
        method: "GET",
      });
      if (!response.ok) {
        console.log(response);
        alert("response not okay");
      }
      const responseData = await response.json();
      const foundLending = responseData.filter(
        (item) =>
          item.book_id === book._id && item.lendingStatus === "Paskolinta"
      );
      setLending(foundLending);
      console.log(responseData);
      console.log(lending);
      console.log(foundLending);
      console.log(book);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLendClick = () => {
    setShowLendForm(true);
  };

  const handleLendFormClose = () => {
    setShowLendForm(false);
  };

  const handleOpenLendingInfo = async () => {
    await fetchLending();
    setShowLendInfoModal(true);
  };

  const handleLendingInfoClose = () => {
    setShowLendInfoModal(false);
  };

  return (
    <>
      <Grid item xs={8} sm={6} md={4}>
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
          {book.status === "Laisva" ? (
            <Button
              variant="outline-disabled"
              onClick={() => handleLendClick(book)}
            >
              Lend
            </Button>
          ) : (
            <Button
              variant="outline-disabled"
              onClick={() => handleOpenLendingInfo(book)}
            >
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
        lending={lending}
      />
    </>
  );
}

export default BookCard;
