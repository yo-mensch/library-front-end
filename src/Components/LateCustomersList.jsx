// LateCustomersList.js
import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

const LateCustomersList = ({ lateLendings, onContactClick }) => {
  if (!lateLendings.length) {
    return <p>No late customers currently.</p>;
  }

  return (
    <ListGroup>
      {lateLendings.map((lending) => (
        <ListGroupItem key={lending._id}>
           <strong>Book:</strong> {lending.book_id?.name || 'Unknown'} <br/>
          <strong>Client:</strong> {lending.clientName} {lending.clientSurname} <br/>
          <strong>Phone:</strong> {lending.clientPhoneNumber} <br/>
          <strong>Deadline:</strong> {new Date(lending.deadline).toLocaleDateString()} <br/>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default LateCustomersList;
