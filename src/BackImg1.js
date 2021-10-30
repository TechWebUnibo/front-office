import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
//import bgimage from "../assets/visual-stories-micheile-7NFwwp-vZk8-unsplash.jpg";

//TODO: mettere a posto i padding e il layout
//TODO: mettere a posto l'immagine di sottofondo

const BackImg1 = () => {
  return (
    <Container fluid className="p-0">
      <div
        className="py-5 pe-2 pe-md-5 text-start shadow-2-strong"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')",
          height: "93vh",
        }}>
        <div className="ps-1 me-5" style={{ backgroundColor: "rgba(255,255,255,.4)", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", position: "relative",  }}>
          <h1 className="mb-3 h2 text-dark display-2">
            <strong>
              Il noleggio di attrezature da street food reso facile e senza
              pensieri.
            </strong>
          </h1>
        </div>
        <Container fluid className="mh-100 ps-2 ps-md-5">
          <div className="row align-items-end" style={{ height: "250px" }}>
            <div className="col-12 text-center flex-grow-1">
              <Link to="/products">
                <Button><p className="display-6 mb-0">Fai un preventivo</p></Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default BackImg1;
