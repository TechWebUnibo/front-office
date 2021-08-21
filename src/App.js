import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./Topbar";
import Home from "./Home";
import NotFound from "./NotFound";
import Products from "./Products";
import LoginPage from "./LoginPage";
import SignupPage from "./SinupPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Topbar />
          <div className="content">
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/products">
                <Products />
              </Route>

              <Route path="/login">
                <LoginPage />
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
}

export default App;
