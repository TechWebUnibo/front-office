import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Topbar from "./components/Topbar";
import Home from "./Home";
import NotFound from "./components/NotFound";
import Products from "./components/Products";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import { isLogged, logout } from "./utility/apiLibrary";
import ProductPage from "./components/ProductPage";



function App() {

  const [loggedIn, setLoggedIn] = useState();
  
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
    }
  };
    
  useEffect(() =>{
    const checkLogin = async() =>{
      setLoginState(await isLogged())
    } 
    checkLogin()
  }, [])



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

            <Route path="/productPage">
              <ProductPage />
            </Route>

            <Route path="/login"> {/*TODO: add control if already logged in*/}
              <LoginPage setLoginState={setLoginState}/>
            </Route>

            <Route path="/signup">
              <SignupPage setLoginState={setLoginState}/>
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
