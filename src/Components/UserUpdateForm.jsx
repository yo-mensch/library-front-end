import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import './style/UserUpdateForm.css';

function UserUpdateForm(props) {
  const [username, setUsername] = useState(props.user ? props.user.username : '');
  const [password, setPassword] = useState(props.user ? props.user.password : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch(`http://localhost:3004/user/${props.user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
          props.updateUser(); // Update the user state in App.js
          props.closeEditUserForm(); // Close the edit user form
        } else {
          const errorData = await response.json();
          console.log(errorData); // Log the error data to the console
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <h3>Edit User</h3>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Update User</Button>
        <Button variant="light" onClick={props.closeEditUserForm}>
          Close
        </Button>
      </Form>
    </Container>
  );
}

export default UserUpdateForm;
