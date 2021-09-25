import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Zopa Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/create">Create Account</Nav.Link>
            <Nav.Link href="/deposit">Deposit</Nav.Link>
            <Nav.Link href="/withdraw">Withdraw</Nav.Link>
            <Nav.Link href="/balance">Balance</Nav.Link>
            <Nav.Link href="/alldata">All Data</Nav.Link>
            {userInfo ? <Button onClick={logout}>Logout</Button> : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
