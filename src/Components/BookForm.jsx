import React, { useState } from 'react';

function BookForm(props) {
    const [bookName, setBookName] = useState(props.bookToUpdate ? props.bookToUpdate.name : '');
    const [authorName, setAuthorName] = useState(props.bookToUpdate ? props.bookToUpdate.author : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookName && authorName) {
            if (props.bookToUpdate) {
                props.updateBook({ ...props.bookToUpdate, name: bookName, author: authorName });
            } else {
                props.addBook({ id: Date.now(), name: bookName, author: authorName });
                setBookName('');
                setAuthorName('');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Book Name:
                <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} />
            </label>
            <label>
                Author:
                <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
            </label>
            <button type="submit">Add Book</button>
        </form>
    );
}

export default BookForm;