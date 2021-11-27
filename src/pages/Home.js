import React from "react";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";

import "../style/home.css"

const Home = () => {
    return (
        <Container fluid className="p-0">
            <div className="py-5 pe-2 pe-md-5 text-start shadow-2-strong bckimg">
                <div className="ps-1 me-5 text-box-home" >
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
}
 
export default Home;