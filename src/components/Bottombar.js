import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../style/footer.css"

function Bottombar() {

    return(
        <footer className="footer m-0">
            <Container className="p-5">
                <Row className="">
                    <Col md={6} >
                            <ul>
                            <li><Link to={"/manager"}>Manager</Link></li>
                            <li><Link to={"/admin"}>Admin</Link></li>
                            <li><Link to={"/info"}>Info</Link></li>
                        </ul >
                    </Col>
                    <Col md={6} >
                        <img src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" className="img-fluid" alt="Company Logo" />
                    </Col>
                </Row>
                <hr className="my-1"/>
                <span className="small-text text-muted">Powered by NoloNolo+</span>
            </Container>
        </footer>
    )
}
export default Bottombar

