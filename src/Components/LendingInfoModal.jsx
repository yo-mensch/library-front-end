import React, { useState, useEffect } from "react";
import { Form, Button, Modal, Card } from "react-bootstrap";

const LendingInfoModal = ({ show, onClose, book, updateBook }) => {
  const [lending, setLending] = useState(null);
  const [formReturnDate, setFormReturnDate] = useState("");
  const [dateWhenReturned, setDateWhenReturned] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dateWhenReturned) {
      updateBookReq();
      updateLending();
      handleClose();
    }
  }, [dateWhenReturned]);

  useEffect(() => {
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
        const foundLending = responseData.find(
          (item) =>
            item.book_id === book._id && item.lendingStatus === "Paskolinta"
        );
        setLending(foundLending || {}); // Ensure it's an object, even if not found
        setLoading(false); // Set loading to false when lending data is available
      } catch (error) {
        console.error(error);
      }
    };

    if (show) {
      setLoading(true); // Set loading to true when opening the modal
      fetchLending();
    }
  }, [show]);

  const updateBookReq = async () => {
    try {
      const response = await fetch(`http://localhost:3004/book/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: book.name,
          author: book.author,
          ISBN: book.ISBN,
          status: "Laisva",
        }),
      });
      if (response.ok) {
        console.log("response is okey");
        updateBook();
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLending = async () => {
    try {
      const response = await fetch(
        `http://localhost:3004/book/lend/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book_id: book._id,
            lendingStatus: "Grąžinta",
            clientName: lending.clientName,
            clientSurname: lending.clientSurname,
            clientPhoneNumber: lending.clientPhoneNumber,
            deadline: lending.dealineDate,
            dateWhenReturned: "",
          }),
        }
      );
      if (response.ok) {
        console.log("response is okey");
      } else {
        const errorData = await response.json();
        console.log(errorData); // Log the error data to the console
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitBookReturn = (e) => {
    e.preventDefault();
    setDateWhenReturned(formReturnDate.toISOString()); // Ensure it's in the correct format
  };

  const handleCheckLending = (e) => {
    e.preventDefault();
    console.log(lending);
  };

  const handleClose = () => {
    setDateWhenReturned("");
    setFormReturnDate("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lending info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Book: {book.name}</p>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>Status: {lending.lendingStatus}</p>
            <p>Client: {lending.clientName + " " + lending.clientSurname}</p>
            <p>Client phone number: {lending.clientPhoneNumber}</p>
            <p>Deadline: {lending.deadline}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckLending}>
          Mark as returned
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LendingInfoModal;
