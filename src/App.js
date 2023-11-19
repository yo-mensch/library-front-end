import React, { useState, useEffect } from "react";
import "./App.css";
import BookCreateForm from "./Components/BookCreateForm";
import BookUpdateForm from "./Components/BookUpdateForm";
import BooksList from "./Components/BooksList";
import LentBooksList from "./Components/LentBooksList";

function App() {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookToUpdate, setBookToUpdate] = useState(null);
  const [showLentBooks, setShowLentBooks] = useState(false);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

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

  const toggleLentBooks = () => {
    setShowLentBooks(!showLentBooks);
  };

  useEffect(() => {
    console.log(bookToUpdate);
  }, [bookToUpdate]);

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <nav>
        <button onClick={toggleLentBooks}>
          {showLentBooks ? "Hide Lent Books" : "Show Lent Books"}
        </button>
      </nav>

      {showLentBooks ? (
        <LentBooksList lentBooks={books} />
      ) : (
        <>
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
            books={books}
            editBook={editBook}
            deleteBook={deleteBook}
          />
        </>
      )}
    </div>
  );
}

export default App;
