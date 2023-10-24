import React, { useState } from 'react';

function BookUpdateForm(props) {
    const [bookName, setBookName] = useState(props.book ? props.book.title : ''); // Use a default value
    const [authorName, setAuthorName] = useState(props.book ? props.book.author : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookName && authorName) {
            props.updateBook({ ...props.book, title: bookName, author: authorName });
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
            <button type="submit">Update Book</button>
            {/* <button onClick={props.closeEditForm()}>Close</button> */}
        </form>
    );
}

export default BookUpdateForm;