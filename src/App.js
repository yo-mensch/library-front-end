import React, { useState, useEffect } from "react";
import "./App.css";
import BookCreateForm from "./Components/BookCreateForm";
import BookUpdateForm from "./Components/BookUpdateForm";
import BooksList from "./Components/BooksList";

function App() {
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [bookToUpdate, setBookToUpdate] = useState(null);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const updateBook = (updatedBook) => {
    const newBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(newBooks);
    setBookToUpdate(null); // Reset the book to update
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
      {openUpdateForm ? (
        <BookUpdateForm
          book={bookToUpdate}
          updateBook={updateBook}
          closeEditForm={closeEditForm}
        />
      ) : (
        <BookCreateForm addBook={addBook} />
      )}
      <BooksList books={books} editBook={editBook} deleteBook={deleteBook} />
    </div>
  );
}

export default App;
