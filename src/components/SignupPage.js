import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { apiLogin } from "../utility/apiLibrary.js";

const SignupPage = ({ setLoginState }) => {
  const [wrongUser, setWrongUser] = useState(false);
  const [wrongPassw, setWrongPassw] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState();
  const [avatar, setAvatar] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    setWrongPassw(false);
    setWrongUser(false);
    setIsPending(true);
    const status = await apiLogin(name);
    if (status) setIsPending(false);
    if (status === 403) setWrongPassw(true);
    else if (status === 404) setWrongUser(true);
    else {
      setLoginState(true);
      history.goBack();
    }
  }

  return (
    <div>
      <Container>
        <p className="display-2">Registrati</p>
        <Form className="my-3 mx-2" onSubmit={login}>
          <Row>
            <Col sm>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {wrongUser && (
                  <Form.Text className=" text-danger">blah blah</Form.Text>
                )}
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
                  onChange={(e) => setSurname(e.target.value)}
                />
                {wrongUser && (
                  <Form.Text className=" text-danger">blah balh</Form.Text>
                )}
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
                {wrongUsrnm && (
                  <Form.Text className=" text-danger">blah blah</Form.Text>
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
                {wrongUsrnm && (
                  <Form.Text className=" text-danger">blah balh</Form.Text>
                )}
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
                controlId="formGridState"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <Form.Label>Regione</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Abruzzo</option>
                  <option>Basilicata</option>
                  <option>Calabria</option>
                  <option>Campania</option>
                  <option>Emilia-Romagna</option>
                  <option>Friuli Venezia Giulia</option>
                  <option>Lazio</option>
                  <option>Liguria</option>
                  <option>Lombardia</option>
                  <option>Marche</option>
                  <option>Molise</option>
                  <option>Piemonte</option>
                  <option>Puglia</option>
                  <option>Sardegna</option>
                  <option>Sicilia</option>
                  <option>Toscana</option>
                  <option>Trentino-Alto Adige</option>
                  <option>Umbria</option>
                  <option>Valle d'Aosta</option>
                  <option>Veneto</option>
                </Form.Select>
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

          <Form.Group
            controlId="formFile"
            className="mb-3"
            onChange={(e) => setAvatar(e.target.file[0])}
          >
            <Form.Label>Inserisci mmagine (Facoltativo)</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit">
              {!isPending && <span>Submit</span>}
              {isPending && <span>Loading</span>}
            </Button>
          </div>
        </Form>
        <Link to="/login">hai già un account? Fai Log in</Link>
      </Container>
    </div>
  );
};

export default SignupPage;
