import React, {useEffect, useRef, useState} from "react"
import {Button, Container, ListGroup, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import {getInvoices, getUser} from "../utility/apiLibrary";

const InvoicePagePrintable = React.forwardRef(({prop}, ref) => {
    const {id} = useParams();

    const [invoice, setInvoice] = useState()
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            const { status, body } = await getInvoices({ productName: true, customer: await getUser(), _id: id});
            if (status === 200) {
                setInvoice(body[0]);
                setIsPending(false);
            }
        }
        fetchInvoices()
    }, [])

    return (
        <div ref={ref} className="container">

            {isPending &&
            (<Container>
                <Spinner animation="border" size="m"/>
            </Container>)
            }

            {!isPending &&
            (
                <div>
                    <h2 className="display-2">Fattura #{invoice._id}</h2>
                    <p>Codice cliente: {invoice.customer}
                        <br/>
                    Codice impiegato: {invoice.employee}</p>
                    <h3 className="display-4">Prodotti</h3>
                    <ul>
                    {Object.keys(invoice.products).map((prod) => {
                        return (
                            <li key={prod}>
                                <div>
                                    <h4>Prodotto: {prod} </h4>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                    <p>Prezzo € {invoice.price}</p>
                    <p>Data di inizio: {invoice.start.split('T')[0]}
                        <br/>
                        Data di fine: {invoice.end.split('T')[0]}
                    </p>
                </div>
            )
            }

            {(!isPending && invoice === {}) &&
            (<h3> Fattura non disponibile</h3>)
            }
        </div>
    );

})

function InvoicePage() {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container>
            <InvoicePagePrintable ref={componentRef}/>
            <Button onClick={handlePrint}>Stampa</Button>
        </Container>
    );
}

export default InvoicePage;