import React from 'react';
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import './style/UserList.css';

function UserList({ users, editUser, deleteUser }) {
    const handleDelete = (userId) => {
        fetch(`http://localhost:3004/user/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Remove the deleted user from the local state
            deleteUser(userId); // Pass the userId here
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });
      };

  return (
    <Grid
      container
      spacing={2}
      className="container"
      direction="row"
      alignItems="center"
    >
      {users.map((user) => (
        <Grid item xs={8} sm={6} md={4} key={user._id}>
          <Card className="list-item">
            <Card.Title>
              {user.username}
            </Card.Title>
            <ButtonGroup>
              <Button variant="secondary" onClick={() => editUser(user)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(user._id)}>
                Delete
              </Button>
            </ButtonGroup>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default UserList;
