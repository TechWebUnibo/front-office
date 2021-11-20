import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Bottombar() {

    return(
        <footer>
            <Container className={"text-center text-lg-start bg-light text-muted"}>
                <Row>
                    <Col xs={3} className="">
                        <img src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" alt="CATER" style={{height: "25px"}}/>
                    </Col>
                    <Col xs={9}>
                        <Link to={"/contacts"}>Contatti</Link>
                        <br/>
                        <Link to={"/contacts"}>Info</Link>
                    </Col>
                </Row>



            </Container>
            <div className="text-center p-1" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
                Powered by
                <span className="text-reset fw-bold"> NoloNolo+</span>
            </div>
        </footer>
    )
}
export default Bottombar