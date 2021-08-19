import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
//import bgimage from "../assets/visual-stories-micheile-7NFwwp-vZk8-unsplash.jpg";
const BackImg1 = () => {
  return (
    <Container fluid className="p-0">
      <div
        class="py-5 px-2 px-md-5 text-start shadow-2-strong text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')",
          height: "93vh",
        }}>
        <div style={{ backgroundColor: "rgba(255,255,255,.4)" }}>
          <h1 class="mb-3 h2 text-dark">
            <strong>
              Il noleggio di attrezature da street food reso facile e senza
              pensieri.
            </strong>
          </h1>
          <p>Dummy</p>
        </div>
        <Container fluid className="mh-100">
          <div className="row align-items-end" style={{ height: "250px" }}>
            <div class="col-12 text-center flex-grow-1">
              <Link to="/product">
                <Button>Fai un preventivo</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default BackImg1;
