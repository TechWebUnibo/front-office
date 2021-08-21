import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./common.css";
import logo from "../assets/logo.png";

const Topbar = () => {
  const loggedIn = false;

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
                <NavDropdown.Item href="#action/3.1">Profilo</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Notifiche
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Noleggi</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
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
