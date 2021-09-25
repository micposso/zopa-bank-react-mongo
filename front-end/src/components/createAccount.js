import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { userRegiterAction } from "../redux/user/user.actions";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      window.location.href = "/deposit";
    }
    if (success) {
      window.location.href = "/deposit";
    }
  }, [userInfo, success]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(userRegiterAction(firstName, lastName, email, password));
  };

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Card.Title>Create Account</Card.Title>

        <Card.Text>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={changeHandler}
                name="firstName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={changeHandler}
                name="lastName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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
              {loading ? "...loading" : "Submit"}
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CreateAccount;
