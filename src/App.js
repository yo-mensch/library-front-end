import React, { useState } from 'react';
import './App.css';
import BookCreateForm from './Components/BookCreateForm';
import BookUpdateForm from './Components/BookUpdateForm';
import BooksList from './Components/BooksList';

function App() {
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const [books, setBooks] = useState([]);
    const [bookToUpdate, setBookToUpdate] = useState(null);

    const addBook = (book) => {
        setBooks([...books, book]);
    };

    const updateBook = (updatedBook) => {
        const newBooks = books.map(book =>
            book.id === updatedBook.id ? updatedBook : book
        );
        setBooks(newBooks);
        setBookToUpdate(null);  // Reset the book to update
    };

    const deleteBook = (id) => {
        const newBooks = books.filter(book => book.id !== id);
        setBooks(newBooks);
    };

    const editBook = (book) => {
        setBookToUpdate(book);
        console.log(bookToUpdate);
    };

    return (
        <div className="App">
            <h1>Library Management System</h1>
            {openUpdateForm ? 
                <BookUpdateForm 
                    addBook={addBook}
                /> : 
                <BookCreateForm 
                    addBook={addBook}
                />}
            <BooksList books={books} editBook={editBook} deleteBook={deleteBook} />
        </div>
    );
}

export default App;