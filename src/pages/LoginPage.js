import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import {apiLogin} from "../utility/apiLibrary.js";
const LoginPage = ({setLoginState}) => {

  const [wrongUsrnm, setWrongUsrnm] = useState(false);
  const [wrongPassw, setWrongPassw] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    setWrongPassw(false);
    setWrongUsrnm(false);
    setIsPending(true);
    const status = await apiLogin(username, password);
    if(status)
      setIsPending(false);
    if(status === 403)
      setWrongPassw(true);
    else if(status === 404)
      setWrongUsrnm(true);
    else {
        setLoginState(true)
        history.goBack();
      }
      
  };

  return (
    <Container className="my-3">
      <p className="display-2 mb-0">Log in</p>
      <Form className="my-3" onSubmit={login}>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Inserisci username" value={username}  onChange={(e) => setUsername(e.target.value)}/>
          {wrongUsrnm && <Form.Text className=" text-danger">
            Nessun username corrispondente. Riprova o <Link to="/signup">registrati gratis</Link>
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          {wrongPassw && <Form.Text className=" text-danger">
            Password errata
          </Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Rimani collegato" />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            {!isPending && <span>Submit</span> }
            { isPending && <span>Loading</span> }
          </Button>
        </div>
      </Form>
      <Link to="/signup">Non hai un profilo? Registrati gratis</Link>
    </Container>
  );
};

export default LoginPage;
