// LendBooksList.jsx
import React from 'react';
import { Grid } from '@mui/material';
import BookCard from './BookCard'; 

const LendBooksList = ({ lentBooks }) => {
    const filteredBooks = lentBooks.filter(book => book.status === "Paskolinta"); 

    return (
        <Grid container spacing={2} className="container" direction="row" alignItems="center">
            {filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                />
            ))}
        </Grid>
    );
};

export default LendBooksList;
