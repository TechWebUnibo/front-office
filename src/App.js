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
import ConfirmPage from "./components/ConfirmPage";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Rentals from "./components/Rentals"
import NotificationPage from "./components/NotificationPage"
import Invoices from "./components/Invoices"
import InvoicePage from "./components/InvoicePage"
import Bottombar from "./components/Bottombar";
import './style/common.css'
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
              <ProductPage />
            </Route>

            <Route path="/login">
              <LoginPage setLoginState={setLoginState}/>
            </Route>

            <Route path="/signup">
              <SignupPage setLoginState={setLoginState}/>
            </Route>

            <Route path="/confirm">
              <ConfirmPage setLoginState={setLoginState}/>
            </Route>

            <Route path="/profile">
              <Profile setLoginState={setLoginState}/>
            </Route>

            <Route path="/dashboard">
              <Dashboard setLoginState={setLoginState}/>
            </Route>

            <Route path="/rentals">
              <Rentals/>
            </Route>

            <Route path="/notifications">
              <NotificationPage />
            </Route>

            <Route path="/invoices">
              <Invoices />
            </Route>

            <Route path="/invoice/:id">
              <InvoicePage />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>

          </Switch>
        </div>
        <Bottombar/>
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