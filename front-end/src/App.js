import "./App.css";
import React, { useState } from "react";
import Data from "./api/api";
import Navigation from "./components/navigation";
import Home from "./components/home";
import CreateAccount from "./components/createAccount";
import Withdraw from "./components/withdraw";
import Balance from "./components/balance";
import Deposit from "./components/deposit";
import AllData from "./components/allData";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import data

function App() {
  const [account, setAccount] = useState(Data);

  return (
    <Router>
      <div className="container">
        <Navigation />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <CreateAccount />
            </Route>
            <Route path="/deposit">
              <Deposit balance={Object.values(account)[0][0]} />
            </Route>
            <Route path="/withdraw">
              <Withdraw balance={Object.values(account)[0][0]} />
            </Route>
            <Route path="/balance">
              <Balance />
            </Route>
            <Route path="/alldata">
              <AllData alldata={Object.values(account)[0][0]} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
