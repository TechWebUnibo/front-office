import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import "../style/common.css";

const Topbar = ({loggedIn, setLoginState}) => {

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
            <Nav.Link as={Link} to="/" href="/" className="shadow-link-gray" >
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" href="/products" className="shadow-link-gray" >
                Prodotti
            </Nav.Link>

            {loggedIn && (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile" className="shadow-link-gray">
                    Profilo
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile" className="shadow-link-gray">
                    Notifiche
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile" className="shadow-link-gray">
                  Noleggi
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  <Button className="btn-danger" onClick={() => setLoginState(false)}>
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {!loggedIn && (
              <Nav.Link as={Link} to="/login" href="/login" className="shadow-link-gray" >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
//TODO: fare in modo che la navbar si comprima dopo aver fatto logout