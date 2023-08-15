import React from "react";
import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import Profile from "../Components/Profile";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      console.error(error);
      setError("Failed to reset  password");
    }
    setLoading(false);
  }
  return (
    <div>
      <Card>
        <Profile />
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Button disabled={loading} className="" type="submit">
              Reset password
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Log in</Link>
            </div>
            <div className="w-100 text-center mt-2">
              Create an account? <Link to="/signup">Sign up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ForgotPassword;
