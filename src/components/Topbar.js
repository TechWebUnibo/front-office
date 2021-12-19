import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavLink, NavItem, NavDropdown, Button, Badge, Image, Dropdown } from "react-bootstrap";
import "../style/common.css";
import { getNotifications, getUser, getCustomer } from "../utility/apiLibrary";

const Topbar = ({ loggedIn, setLoginState }) => {

  const [notify, setNotify] = useState(0)
  const [avatar, setAvatar] = useState(undefined)

  useEffect(() => {
    async function getNotify() {
      const user = await getUser();
      const { status, body } = await getNotifications(user)
      if (status === 200) {
        setNotify(body.length)
      }
      const res = await getCustomer(await getUser())
      if (res && res.avatar) {
        setAvatar(res.avatar)
      }
      else{
        setAvatar('/img/cardProfile.png')
      }
    }
    if (loggedIn) {
      getNotify()
    }
  }, [avatar, notify, loggedIn])

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
              <Dropdown as={NavItem} >
                <Dropdown.Toggle as={NavLink}><Navbar.Brand className="m-0">
                  <Image alt='Avatar del profilo' src={avatar} style={{ height: "35px" }} roundedCircle />
                </Navbar.Brand></Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item as={Link} href='/dashboard' to="/dashboard" className="shadow-link-gray">
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/notifications" href='/notifications' className="shadow-link-gray">
                  Notifiche
                  {notify > 0 &&
                    <Badge className="mx-1" pill bg="danger">
                      {notify}
                    </Badge>
                  }
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/rentals" href='/rentals' className="shadow-link-gray">
                  Noleggi
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item >
                  <Button className="btn-danger" onClick={() => setLoginState(false)}>
                    Logout
                  </Button>
                </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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