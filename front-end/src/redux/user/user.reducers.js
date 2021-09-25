import {
  UserRegistrationType,
  UserLoginType,
  DepositMoneyType,
  WithdrawMoneyType,
  UserProfileType,
} from "./user.types";

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case UserRegistrationType.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserRegistrationType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };

    case UserRegistrationType.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case UserLoginType.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserLoginType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        userInfo: action.payload,
      };

    case UserLoginType.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case UserLoginType.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        success: false,
      };

    default:
      return state;
  }
};

export const depositMoneyReducer = (state = {}, action) => {
  switch (action.type) {
    case DepositMoneyType.DEPOSIT_MONEY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DepositMoneyType.DEPOSIT_MONEY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: true,
      };

    case DepositMoneyType.DEPOSIT_MONEY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export const withdrawMoneyReducer = (state = {}, action) => {
  switch (action.type) {
    case WithdrawMoneyType.WITHDRAW_MONEY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case WithdrawMoneyType.WITHDRAW_MONEY_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        userInfo: action.payload.data,
        success: true,
      };

    case WithdrawMoneyType.WITHDRAW_MONEY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userProfileReducer = (state = { userDetail: {} }, action) => {
  switch (action.type) {
    case UserProfileType.USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserProfileType.USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userDetail: action.payload,
      };

    case UserProfileType.USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case UserProfileType.USER_PROFILE_RESET:
      return {
        ...state,
        userDetail: {},
      };

    default:
      return state;
  }
};
