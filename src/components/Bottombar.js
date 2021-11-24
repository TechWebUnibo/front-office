import React from "react";
import {Col, Container, Row, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import "../style/footer.css"

function Bottombar() {

    return(
        <footer className="footer">
            <div className="container p-5">
                <div className="row">
                    <div className="col-md-6">
                            <ul>
                            <li><Link to={"/manager"}>Manager</Link></li>
                            <li><Link to={"/admin"}>Admin</Link></li>
                            <li><Link to={"/info"}>Info</Link></li>
                        </ul >
                    </div>
                    <div className="col-md-6">
                        <img src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" className="img-fluid" alt="Company Logo" />
                    </div>
                </div>
                <hr />
                <span className="small-text text-muted">Powered by NoloNolo+</span>
            </div>
        </footer>
    )
}
export default Bottombar

