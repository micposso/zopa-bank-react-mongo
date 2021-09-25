import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

import { useSelector, useDispatch } from "react-redux";

import { getUserDetails } from "../redux/user/user.actions";

const AllData = () => {
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
  }, [dispatch, userInfo]);

  return (
    <div>
      {loading ? (
        "...Loading"
      ) : success ? (
        <div>
          <h3>All Data</h3>
          <p>First Name: {userDetail.firstName}</p>
          <p>Last Name: {userDetail.lastName}</p>
          <p>Email: {userDetail.email}</p>
          <p>Balance: {userDetail.balance}</p>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        "null"
      )}
    </div>
  );
};

export default AllData;
