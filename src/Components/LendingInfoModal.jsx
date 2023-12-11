import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Modal,
  FormGroup,
  ModalDialog,
} from "react-bootstrap";

const LendingInfoModal = ({ show, onClose, book, updateBook }) => {
  const [lending, setLending] = useState(null);
  const [formReturnDate, setFormReturnDate] = useState("");
  const [dateWhenReturned, setDateWhenReturned] = useState("");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [minimumDate, setMinimumDate] = useState(null);

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
        `http://localhost:3004/book/lend/${lending._id}`,
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
            dateWhenReturned: new Date(formReturnDate).toISOString(),
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
    updateBookReq();
    updateLending();
    handleClose();
  };

  const handleMarkAsReturned = (e) => {
    e.preventDefault();
    setMinimumDate(formatDate());
    setOpenDatePicker(true);
  };

  const handleClose = () => {
    setDateWhenReturned("");
    setFormReturnDate("");
    setOpenDatePicker(false);
    onClose();
  };

  const formatDate = () => {
    const currentDeadline = new Date(lending.deadline);
    const oneMonthEarlier = new Date(currentDeadline);
    const deadlineMonth = currentDeadline.getMonth();
    oneMonthEarlier.setMonth(deadlineMonth - 1);
    return oneMonthEarlier.toISOString().split("T")[0];
  };

  const handleCloseForm = () => {
    setOpenDatePicker(false);
    setFormReturnDate("");
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Lending info</Modal.Title>
      </Modal.Header>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Modal.Body>
            <p>Book: {book.name}</p>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>Status: {lending.lendingStatus}</p>
            <p>Client: {lending.clientName + " " + lending.clientSurname}</p>
            <p>Client phone number: {lending.clientPhoneNumber}</p>
            <p>Deadline to return: {lending.deadline}</p>
            {lending.dateWhenReturned === "" ? (
              <p>Book not yet returned</p>
            ) : (
              <p>{lending.dateWhenReturned}</p>
            )}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {lending.dateWhenReturned === "" ? (
              <Button variant="primary" onClick={handleMarkAsReturned}>
                Mark as returned
              </Button>
            ) : (
              <></>
            )}
          
            <ModalDialog>
            {openDatePicker === true ? (
              <Form onSubmit={handleSubmitBookReturn}>
                <FormGroup>
                  <label>Select return date</label>
                  <input
                    required
                    type="date"
                    label="Controlled picker"
                    min={minimumDate}
                    max={new Date().toISOString().split("T")[0]}
                    value={formReturnDate}
                    onChange={(e) => setFormReturnDate(e.target.value)}
                  />
                </FormGroup>
                <Button variant="secondary" onClick={handleCloseForm}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            ) : (
              <></>
            )}
            </ModalDialog>
            </Modal.Body>
        </div>
      )}
    </Modal>
  );
};

export default LendingInfoModal;
