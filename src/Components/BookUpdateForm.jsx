import React, { useState } from 'react';

function BookUpdateForm(props) {
    const [bookName, setBookName] = useState(props.bookName);
    const [authorName, setAuthorName] = useState(props.authorName);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookName && authorName) {
            if (props.bookToUpdate) {
                props.updateBook({ ...props.bookToUpdate, name: bookName, author: authorName });
            } else {
                props.addBook({ id: Date.now(), title: bookName, author: authorName });
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

export default BookUpdateForm;