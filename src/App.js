import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { isLogged, logout } from "./utility/apiLibrary";

import "bootstrap/dist/css/bootstrap.min.css";
import './style/common.css'

import Topbar from "./components/Topbar";
import Bottombar from "./components/Bottombar";


import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import ConfirmPage from "./pages/ConfirmPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Rentals from "./pages/Rentals"
import NotificationPage from "./pages/NotificationPage"
import Invoices from "./pages/Invoices"
import InvoicePage from "./pages/InvoicePage"


//import PublicRoute from "./components/PublicRoute";
//import PrivateRoute from "./components/PrivateRoute";



function App() {

  const [loggedIn, setLoggedIn] = useState(undefined);
  
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
  }, [loggedIn])



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
              <ProductPage loggedIn={loggedIn}/>
            </Route>

            <Route path="/login">
              {loggedIn !== undefined && loggedIn ? <Redirect to="/dashboard" /> : <LoginPage setLoginState={setLoginState}/>}
            </Route>

            <Route path="/signup">
              {loggedIn !== undefined && loggedIn ? <Redirect to="/dashboard" /> : <SignupPage setLoginState={setLoginState}/>}
            </Route>

            <Route path="/confirm">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <ConfirmPage/>}
            </Route>

            <Route path="/profile">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <Profile/>}
            </Route>

            <Route path="/dashboard">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <Dashboard/>}
            </Route>

            <Route path="/rentals">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <Rentals/>}
            </Route>

            <Route path="/notifications">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <NotificationPage />}
            </Route>

            <Route path="/invoices">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <Invoices />}
            </Route>

            <Route path='/manager' component={() => {
              window.location.href = 'https://site202118.tw.cs.unibo.it/management-dashboard';
              return null;
            }} />

            <Route path='/admin' component={() => {
              window.location.href = 'https://site202118.tw.cs.unibo.it/admin/Home.html';
              return null;
            }} />

            <Route path="/invoice/:id">
              {loggedIn !== undefined && !loggedIn ? <Redirect to="/login" /> : <InvoicePage />}
            </Route>

            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
          <Bottombar/>
        </div>
      </div>
    </Router>
  );
}

export default App;
