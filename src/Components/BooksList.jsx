import React from 'react';

function BooksList({books, editBook, deleteBook}) {
    return (
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    {book.title} by {book.author}
                    <button onClick={() => editBook(book)}>Edit</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                    <button onClick={() => console.log("cia keisis knygos statusas")}>Lend</button>
                </li>
            ))}
        </ul>
    );
}

export default BooksList;