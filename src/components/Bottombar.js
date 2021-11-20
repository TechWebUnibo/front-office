import React from "react";
import {Col, Container, Row, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../style/footer.css"

function Bottombar() {

    return(
        <div id="content-wrap">
        <footer>
            <Container className={"text-center text-lg-start bg-light text-muted"} fluid>
                <Row>
                    <Col md={6}>
                        <Image src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" rounded fluid />
                    </Col>
                    <Col md={6} id="footerLinks" className="p-4">
                        <ul>
                            <li><Link to={"/contacts"}>Contatti</Link></li>
                            <li><Link to={"/info"}>Info</Link></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                <div className="text-center p-1">
                    Powered by
                    <span className="text-reset fw-bold"> NoloNolo+</span>
                </div>
                </Row>
            </Container>
        </footer>
        </div>
    )
}
export default Bottombar