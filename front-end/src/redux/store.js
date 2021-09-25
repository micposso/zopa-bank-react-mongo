import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

// Reducers
import {
  registerReducer,
  loginReducer,
  depositMoneyReducer,
  withdrawMoneyReducer,
  userProfileReducer,
} from "./user/user.reducers";

// get local values

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const rootReducers = combineReducers({
  userRegister: registerReducer,
  userLogin: loginReducer,
  depositMoney: depositMoneyReducer,
  withdrawMoney: withdrawMoneyReducer,
  userProfile: userProfileReducer,
});

const initialValues = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middlewares = [thunk];

const store = createStore(
  rootReducers,
  initialValues,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
