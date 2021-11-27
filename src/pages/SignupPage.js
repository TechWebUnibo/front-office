import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { createCustomer } from "../utility/apiLibrary"
// import { apiRegister } from "../utility/apiLibrary.js";

import Notify from '../components/Notify';


const SignupPage = ({ setLoginState }) => {
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  // eslint-disable-next-line
  const [isPending, setIsPending] = useState(false);

  // Modal control for error
  const [errorShow, setErrorShow] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  // eslint-disable-next-line
  const [isFilePicked, setIsFilePicked] = useState(false);

  const history = useHistory();

  /*async function signup(e) {
    e.preventDefault();
    setIsPending(true);
    const status = await apiRegister(
      name,
      surname,
      username,
      password,
      address,
      city,
      zip,
      avatar
    );
    if (status) setIsPending(false);
    if (status === 400) setError(true);
    else if (status === 502) setError(true);
    else {
      history.push("/login");
    }
  }*/

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  async function signup(e){
    e.preventDefault();
    let { status } = await createCustomer(name, surname, username, password, {city: city, zip: zip, residence: address}, selectedFile)
    if(status === 200){
      history.goBack();
    }
    else if(status === 400){
      setError(true)
    }
    else{
      setErrorShow(true)
    }
  }; 

  return (
      <Container>
        <p className="display-2">Registrati</p>
        <Form className="my-3 mx-2" onSubmit={signup}>
          <Row>
            <Col sm>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col sm>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicSurname"
              >
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci cognome"
                  value={surname}
                  required
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {error && (
                  <Form.Text className=" text-danger">Username already taken</Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col sm>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              placeholder="123 Via Fasulla"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md>
              <Form.Group className="mb-3" controlId="formGridCity">
                <Form.Label>Città</Form.Label>
                <Form.Control
                  placeholder="Springfield"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group
                className="mb-3"
                controlId="formGridZip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              >
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Inserisci immagine (Facoltativo)</Form.Label>
            <Form.Control
              type="file"
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" >
              {!isPending && <span>Submit</span>}
              {isPending && <span>Loading</span>}
            </Button>
          </div>
        </Form>
        <Link to="/login">hai già un account? Fai Log in</Link>
        <Notify
          show={errorShow}
          data={{ title: 'Ooops...', text: 'Something gone wrong, please retry later' }}
          onHide={() => setErrorShow(false)}
        />
      </Container>
  );
};

export default SignupPage;
