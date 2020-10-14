import React, { Fragment, useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const clearError = () => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    clearError();
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value.length < 7) {
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Password do not match");
      }
      return setError("Password Should be greater than 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <Fragment>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {currentUser?.email && <Redirect to="/login"></Redirect>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?
        <Link to="/login"> Login</Link>
      </div>
    </Fragment>
  );
};

export default Signup;
