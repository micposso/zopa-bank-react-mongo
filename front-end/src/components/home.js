import React from "react";
import Login from "./login";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <img src={require('../images/kids.jpeg').default} width={500} />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
