import React, {useEffect, useState} from "react";
import {Container, ListGroup, Spinner} from "react-bootstrap";
import {getInvoices, getUser} from "../utility/apiLibrary";
import {Link} from "react-router-dom";

import seo from "../utility/dynamicPageTitle";

function Invoices() {

    //Dynamic page title
    seo({title : 'Fatture | Cater', metaDescription : 'Le tue fatture'})

    const [invoices, setInvoices] = useState([])
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () =>{
            const { status, body} = await getInvoices({ customer: await getUser() });
            if(status === 200) {
                setIsPending(false);
                setInvoices(body)
            }
        }
        fetchInvoices();
    }, [])

    return (
        <Container className="containerSM">
            <h2 className="title">Le tue fatture</h2>
            {isPending &&
            (<Container>
                <Spinner animation="border" size="m" />
            </Container>)
            }
            {!isPending && invoices.length >0 &&
            (<ListGroup>
                {invoices.map((invoice) => {
                    return (<ListGroup.Item action as={Link} key={invoice._id} to={"/invoice/" + invoice._id} href={"/invoice" + invoice._id}> Visualizza la fattua per l'ordine: {invoice.rent} </ListGroup.Item>);})}
            </ListGroup>) //todo da testare e modificare
            }
            { !isPending && invoices.length <= 0 &&
            (<h3 className="sub-title">Nessuna fattura disponibile</h3>)
            }
        </Container>

    )

}
export default Invoices