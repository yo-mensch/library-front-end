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

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateBook = (updatedBook) => {
    const newBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(newBooks);
    setBookToUpdate(null); // Reset the book to update
    setOpenUpdateForm(false);
  };

  const deleteBook = (id) => {
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
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
    console.log(bookToUpdate);
  }, [bookToUpdate]);

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
              updateBook={updateBook}
              closeEditForm={closeEditForm}
            />
          ) : (
            <BookCreateForm addBook={addBook} />
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
