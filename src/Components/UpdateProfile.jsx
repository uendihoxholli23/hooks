import React from "react";
import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import Profile from "../Components/Profile";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div>
      <Card>
        <Profile />
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="" type="submit">
              Update
            </Button>
            <div className="w-100 text-center mt-2">
              <Link to="/">Cancel</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UpdateProfile;
