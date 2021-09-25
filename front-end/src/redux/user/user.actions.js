import axios from "axios";

import {
  UserRegistrationType,
  UserLoginType,
  DepositMoneyType,
  WithdrawMoneyType,
  UserProfileType,
} from "./user.types";

export const userRegiterAction =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({ type: UserRegistrationType.USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/register",
        { firstName, lastName, email, password },
        config
      );

      dispatch({
        type: UserRegistrationType.USER_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: UserRegistrationType.USER_REGISTER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: UserLoginType.USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: UserLoginType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UserLoginType.USER_LOGIN_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const userLogoutAction = () => (dispatch) => {
  dispatch({
    type: UserLoginType.USER_LOGOUT,
  });

  localStorage.removeItem("userInfo");
};

export const depositMoneyAction = (amount, userId) => async (dispatch) => {
  try {
    dispatch({
      type: DepositMoneyType.DEPOSIT_MONEY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { message, data } = await axios.put(
      "/api/users/deposit",
      amount,
      config
    );

    dispatch({
      type: DepositMoneyType.DEPOSIT_MONEY_SUCCESS,
      payload: { message, data },
    });
  } catch (error) {
    dispatch({
      type: DepositMoneyType.DEPOSIT_MONEY_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const withdrawMoneyReducer = (amount, userId) => async (dispatch) => {
  try {
    dispatch({
      type: WithdrawMoneyType.WITHDRAW_MONEY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { message, data } = await axios.put(
      "/api/users/withdraw",
      amount,
      config
    );

    dispatch({
      type: WithdrawMoneyType.WITHDRAW_MONEY_SUCCESS,
      payload: { message, data },
    });
  } catch (error) {
    dispatch({
      type: WithdrawMoneyType.WITHDRAW_MONEY_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: UserProfileType.USER_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/users/profile/${id}`, config);

    dispatch({
      type: UserProfileType.USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UserProfileType.USER_PROFILE_FAIL,
      payload: error.response?.data.error,
    });
  }
};
