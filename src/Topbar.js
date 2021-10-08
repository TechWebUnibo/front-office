import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "./common.css";
import logo from "../assets/logo.png";
import { isLogged, logout } from "./apiLibrary";

const Topbar = () => {
  
  const [loggedIn, setLoggedIn] = useState(isLogged());

  useState(() => {
    isLogged().then(data => setLoggedIn(data));
  })

  function logoutHere() {
    logout();
    isLogged().then(data => setLoggedIn(data));
  }

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="shadow-link">
            <img src={logo} alt="CATER" style={{ height: "20px" }}></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className="shadow-link-gray">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/products" className="shadow-link-gray">
                Prodotti
              </Link>
            </Nav.Link>

            {loggedIn && (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item >
                  <Link to="/profile" className="shadow-link-gray">
                    Profilo
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                <Link to="/profile" className="shadow-link-gray">
                    Notifiche
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="/profile" className="shadow-link-gray">
                    Noleggi
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  <Button className="btn-danger" onClick={logoutHere}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!loggedIn && (
              <Nav.Link>
                <Link to="/login" className="shadow-link-gray">
                  Log in
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
