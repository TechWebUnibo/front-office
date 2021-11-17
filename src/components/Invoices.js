import React, {useEffect, useState} from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import {getInvoices, getUser} from "../utility/apiLibrary";
import {Link} from "react-router-dom";

function Invoices() {

    const [invoices, setInvoices] = useState([])
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () =>{
            let customer = "{customer: "+await getUser()+"}"
            const res = await getInvoices(customer);
            if(res) {
                setIsPending(false);
                setInvoices(res);
            }
        }
        fetchInvoices();
    }, [])

    return (
        <Container>
            <h2>Le tue fatture</h2>
            {isPending &&
            (<Container>
                <Spinner animation="border" size="m" />
            </Container>)
            }
            {!isPending && invoices.length >0 &&
            (<ListGroup>
                {invoices.map((n) => {
                    return (<ListGroup.Item action as={Link} to={"/invoice/"+n.invoice} href={"/invoice"+n.invoice}> {n.invoice} </ListGroup.Item>);})}
            </ListGroup>) //todo da testare e modificare
            }
            { !isPending && invoices.length <= 0 &&
            (<h3>Nessuna fattura disponibile</h3>)
            }
        </Container>

    )

}
export default Invoices