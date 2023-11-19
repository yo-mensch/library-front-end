import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from "react-bootstrap";
import "./style/LoginForm.css";


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here using username and password
    console.log('Username:', username);
    console.log('Password:', password);
    // You can handle login functionality, API calls, etc. here
    // Remember, this is a basic example - handle actual login logic appropriately
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
