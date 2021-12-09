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
              <ProductPage loggedIn={loggedIn}/>
            </Route>

            <Route path="/login">
              {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage setLoginState={setLoginState}/>}
            </Route>

            <Route path="/signup">
              {loggedIn ? <Redirect to="/dashboard" /> : <SignupPage setLoginState={setLoginState}/>}
            </Route>

            <Route path="/confirm">
              {!loggedIn ? <Redirect to="/login" /> : <ConfirmPage setLoginState={setLoginState}/>}
            </Route>

            <Route path="/profile">
              {!loggedIn ? <Redirect to="/login" /> : <Profile setLoginState={setLoginState}/>}
            </Route>

            <Route path="/dashboard">
              {!loggedIn ? <Redirect to="/login" /> : <Dashboard setLoginState={setLoginState}/>}
            </Route>

            <Route path="/rentals">
              {!loggedIn ? <Redirect to="/login" /> : <Rentals/>}
            </Route>

            <Route path="/notifications">
              {!loggedIn ? <Redirect to="/login" /> : <NotificationPage />}
            </Route>

            <Route path="/invoices">
              {!loggedIn ? <Redirect to="/login" /> : <Invoices />}
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
              {!loggedIn ? <Redirect to="/login" /> : <InvoicePage />}
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

/*
<PublicRoute restricted={false} component={Home} path="/" exact/>

            <PublicRoute restricted={false} component={Products} path="/products" exact/>

            <PublicRoute restricted={false} component={ProductPage} path="/productPage" exact/>

            <PublicRoute restricted={false} component={LoginPage} path="/login" props={{setLoginState: setLoginState}} exact/>

            <PublicRoute restricted={false} component={SignupPage} path="/signup" setLoginState={setLoginState} exact/>

            <PrivateRoute component={Dashboard} path="/dashboard" setLoginState={setLoginState} exact />
            
            <PrivateRoute component={ConfirmPage} path="/confrim" setLoginState={setLoginState} exact />
            
            <PrivateRoute component={Profile} path="/profile" setLoginState={setLoginState} exact />
            
            <PrivateRoute component={Rentals} path="/rentals" setLoginState={setLoginState} exact />

            <PublicRoute restricted={false} component={NotFound} path="/*" />

*/