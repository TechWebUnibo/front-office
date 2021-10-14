import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "./common.css";
import { useEffect } from "react";

const Topbar = ({loggedIn, setLoginState}) => {
  

  useEffect(() => {
    console.log(loggedIn);
  });


  return (
    <Navbar collapseOnSelect bg="light" expand="md" >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="shadow-link">
            <img src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" alt="CATER" style={{ height: "35px" }}></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/">
              <Link to="/" className="shadow-link-gray">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="/products">
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
                  <Button className="btn-danger" onClick={setLoginState(false)}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!loggedIn && (
              <Nav.Link href="/login">
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