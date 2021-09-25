import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { loginAction } from "../redux/user/user.actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success, loading, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      window.location.href = "/balance";
    }

    if (success) {
      window.location.href = "/balance";
    }
  }, [userInfo, success]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAction(email, password));
  };

  return (
    <Card>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Title>Login to your Account</Card.Title>

        <Card.Text>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={changeHandler}
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={changeHandler}
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {loading ? "Loading..." : "Login"}
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Login;
