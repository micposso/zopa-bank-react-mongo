import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";

import { getUserDetails } from "../redux/user/user.actions";

const Balance = ({ balance }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, success, error, userDetail } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/";
    }

    dispatch(getUserDetails(userInfo.id));
    // console.log(userInfo.id);
  }, [dispatch, userInfo]);

  console.log(userDetail);

  return (
    <Card bg={"success"} text={"light"} style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Account Balance for </Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>{loading ? "Loading..." : userDetail.balance}</Card.Text>
        <Card.Link href="/deposit">Deposit Money</Card.Link>
        <Card.Link href="/withdraw">Withdraw Money</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default Balance;
