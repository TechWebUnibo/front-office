import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./Topbar";
import Home from "./Home";
import NotFound from "./NotFound";
import Products from "./Products";
import LoginPage from "./LoginPage";
import SignupPage from "./SinupPage";
import { isLogged, logout } from "./apiLibrary";



function App() {

  const [loggedIn, setLoggedIn] = useState(isLogged());

  const setLoginState = (value) => {
    switch (value) {
      case true:
        setLoggedIn(true);
        break;
      case false:
        logout();
        setLoggedIn(false);
        break;
      default:
        throw Error('Invalid value');
    }};

  return (
    <Router>
      <div className="App">
        <Topbar loggedIn={loggedIn} setLoginState={setLoginState}/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/products">
              <Products />
            </Route>

            <Route path="/login"> {/*TODO: add control if already logged in*/}
              <LoginPage setLoginState={setLoginState}/>
            </Route>

            <Route path="/signup">
              <SignupPage />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
