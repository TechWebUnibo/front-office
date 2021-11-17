import React, {useEffect, useRef, useState} from "react"
import {Button, Container, ListGroup, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import {getInvoices, getUser} from "../utility/apiLibrary";

const InvoicePagePrintable = React.forwardRef(({prop}, ref) => {
    const {id} = useParams();

    const [invoice, setInvoice] = useState([])
    const [isPending, setIsPending] = useState(false);

    /*    useEffect(() => {
            const fetchNotifications = async () => {
                const res = await getInvoices({customer: await getUser(), rent: id});
                if (res != undefined) {
                    setInvoice(res);
                    setIsPending(false);
                }
            }
        }, []);*/

    let prodN = 1;//debug
    let prova = {
        "customer": "customer_id",
        "employee": "employee_id",
        "products": {
            "additionalProp1": {
                "condition": "broken",
                "start": "2021-01-10",
                "end": "2021-01-12"
            },
            "additionalProp2": {
                "condition": "broken",
                "start": "2021-01-10",
                "end": "2021-01-12"
            },
            "additionalProp3": {
                "condition": "broken",
                "start": "2021-01-10",
                "end": "2021-01-12"
            }
        },
        "price": 100,
        "start": "2017-07-21",
        "end": "2017-07-28"
    };//debug

    let codFattura = 123456789; //debug

    function showSubProduct(products) {
        let res = [];
        let i = 0;
        for (const prod in products) {
            res.push(
            <div>
                <p>Prodotto: {prod}
                    <br/>
                Data di inizio: {prova.products[prod].start}
                    <br/>
                Data di fine: {prova.products[prod].end}</p>
            </div>);
        }
        return res;
    }

    return (
        <div ref={ref} className="container">

            {isPending &&
            (<Container>
                <Spinner animation="border" size="m"/>
            </Container>)
            }

            {!isPending && invoice !== [] &&
            (
                <div>
                    <h2 className="display-2">Fattura #{codFattura}</h2>
                    <p>Cliente: {prova.customer}
                        <br/>
                        Impiegato: {prova.employee}</p>
                    <h3 className="display-4">Prodotti</h3>
                    <ul>
                    {showSubProduct(prova.products).map((prod) => {
                        return (
                            <li>{prod}</li>
                        );
                    })}
                    </ul>
                    <p>Prezzo € {prova.price}</p>
                    <p>Data di inizio: {prova.start}
                        <br/>
                    Data di fine: {prova.end}</p>
                </div>
            )
            }

            {!isPending && invoice === [] &&
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