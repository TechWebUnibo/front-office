import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <div>
        <p className="display-1 mt-2">
          Hai chiamato, ma nessuno ha risposto...
        </p>
        <p>La pagina da te richiesta non risulta essere disponibile</p>
      </div>
      <div className="mt-5 text-center">
          <Link to="/">
            <Button>Torna alla home</Button>
          </Link>
      </div>
    </Container>
  );
};

export default NotFound;
