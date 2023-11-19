import React, { useState, useEffect } from "react";
import "./App.css";
import BookCreateForm from "./Components/BookCreateForm";
import BookUpdateForm from "./Components/BookUpdateForm";
import BooksList from "./Components/BooksList";
import LoginForm from "./Components/LoginForm";
import { Form, FormControl } from "react-bootstrap"; // Importing Bootstrap components

function App() {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3004/book/", {
        method: "GET",
      });
      if (!response.ok) {
        alert("response aint okey");
      }
      const responseData = await response.json();
      setBooks(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateBook = () => {
    fetchData();
    setBookToUpdate(null); // Reset the book to update
    setOpenUpdateForm(false);
  };

  const deleteBook = () => {
    fetchData();
  };

  const editBook = (book) => {
    const bookToEdit = book;
    setBookToUpdate(bookToEdit);
    setOpenUpdateForm(true);
    console.log(book);
  };

  const closeEditForm = () => {
    setOpenUpdateForm(false);
    setBookToUpdate(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Library Management System</h1>
      {!isLoggedIn ? ( // Conditionally render the login form if not logged in
        <LoginForm />
      ) : (
        <>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search by Title or Author"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form>
          {openUpdateForm ? (
            <BookUpdateForm
              book={bookToUpdate}
              fetchData={fetchData}
              closeEditForm={closeEditForm}
            />
          ) : (
            <BookCreateForm addBook={addBook} fetchData={fetchData} />
          )}
          <BooksList
            books={filteredBooks}
            editBook={editBook}
            deleteBook={deleteBook}
          />
        </>
      )}
    </div>
  );
}

export default App;
