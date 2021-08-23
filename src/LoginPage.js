import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
const LoginPage = () => {

  const [wrongUsrnm, setWrongUsrnm] = useState(false);
  const [wrongPassw, setWrongPassw] = useState(false);

  return (
    <Container className="my-3">
      <p className="display-2 mb-0">Log in</p>
      <Form className="my-3">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Inserisci username" />
          {wrongUsrnm && <Form.Text className=" text-danger">
            Nessun username corrispondente. Riprova o <Link to="/signup">registrati gratis</Link>
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          {wrongPassw && <Form.Text className=" text-danger">
            Password errata
          </Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Rimani collegato" />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      <Link to="/signup">Non hai un profilo? Registrati gratis</Link>
    </Container>
  );
};

export default LoginPage;
