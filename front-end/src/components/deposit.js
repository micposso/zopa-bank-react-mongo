import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { depositMoneyAction } from "../redux/user/user.actions";

const Deposit = () => {
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();
  const depositMoney = useSelector((state) => state.depositMoney);
  const { loading, error, message, success } = depositMoney;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/";
    }
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      setAmount(value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(depositMoneyAction({ amount, userId: userInfo.id }));
  };

  return (
    <Card style={{ width: "30rem" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          {`Deposit Successful`} <Link to="/balance">Balance</Link>
        </Alert>
      )}

      <Card.Body>
        <Card.Title>Deposit Money</Card.Title>
        <Card.Text>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ammount to Deposit</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Deposit Amount"
                value={amount}
                onChange={changeHandler}
                name="amount"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {loading ? "Loading..." : "Deposit"}
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Deposit;
