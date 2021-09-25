import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { withdrawMoneyReducer } from "../redux/user/user.actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const withdrawMoney = useSelector((state) => state.withdrawMoney);
  const { loading, error, message, success } = withdrawMoney;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(withdrawMoneyReducer({ amount, userId: userInfo.id }));
  };

  return (
    <Card style={{ width: "30rem" }}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          {`Withdraw Successful`} <Link to="/balance">Deposit</Link>
        </Alert>
      )}
      <Card.Body>
        <Card.Title>Withdraw Money</Card.Title>
        <Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ammount to Withdraw</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                name="amount"
                onChange={changeHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {loading ? "Loading..." : "Withdraw"}
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Withdraw;
