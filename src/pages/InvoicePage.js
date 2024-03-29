import React, {useEffect, useRef, useState} from "react"
import {Button, Container, Spinner, Row, Col, Alert} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useReactToPrint} from 'react-to-print';
import {getInvoices, getUser} from "../utility/apiLibrary";

import '../style/common.css';
import '../style/invoicePage.css';

import seo from "../utility/dynamicPageTitle";

const InvoicePagePrintable = React.forwardRef(({canPrint}, ref) => {
    const {id} = useParams();

    const [invoice, setInvoice] = useState()
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            const { status, body } = await getInvoices({ productName: true, customer: await getUser(), _id: id});
            if (status === 200) {
                setInvoice(body[0]);
                setIsPending(false);
                //Dynamic page title
                if(body[0] === undefined) 
                {
                    canPrint(false)
                    seo({title : 'fattura non disponibile | Cater', metaDescription : 'La mia fattura'})
                }
                else {
                    seo({title : 'fattura '+body[0]._id+' | Cater', metaDescription : 'La mia fattura'})
                }
                
            }
        }
        fetchInvoices()
    }, [])

    return (
        <div ref={ref} id="invoice" className="container">

            {isPending &&
            (<Container>
                <Spinner animation="border" size="m"/>
            </Container>)
            }

            {!isPending && invoice !== undefined &&
            (
                <div>
                    <Row>
                        <Col md={4}>
                            <img src="//site202118.tw.cs.unibo.it/img/logo.eda7be37.png" alt="CATER" style={{ height: "4em" }}></img>
                        </Col>
                        <Col md={8} className="text-end mt-4">
                            <h3 className="small">Fattura: #{invoice._id}</h3>
                            <h3 className="small">Ordine: #{invoice.rent}</h3>
                            <h3 className="small">Codice cliente: {invoice.customer}</h3>
                            <h3 className="small">Codice impiegato: {invoice.employee}</h3>
                        </Col>
                    </Row>
                    <h2 className="mt-4">Noleggio:</h2>
                    <Row className="mt-2">
                        <Col>
                            <h3>Data di inizio: {invoice.start.split('T')[0]}</h3>
                        </Col>
                        <Col>
                            <h3>Data di fine: {invoice.end.split('T')[0]}</h3>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col>
                            <h3>
                                Nome
                            </h3>
                        </Col>
                        <Col>
                            <h3>
                                Stato di riconsegna
                            </h3>
                        </Col>
                    </Row>

                    {Object.keys(invoice.products).map((prod) => {
                        return (
                            <Row key={prod}>
                                <Col>
                                    <h4>{prod}</h4>
                                </Col>
                                <Col>
                                    <h4>{invoice.products[prod].condition}</h4>
                                </Col>
                            </Row>
                        )
                    })}
                    <Row className='mt-4'>
                        <Col md={{offset: 9 }} className="text-md-center">
                            <Alert variant={'secondary'}>
                                Totale: {invoice.price} €
                            </Alert>                        
                        </Col>
                    </Row>
                </div>
            )}
            {(!isPending && invoice === undefined) &&
            (<h2 className="display-2"> Fattura non disponibile</h2>)
            }
        </div>
    );

})

function InvoicePage() {

    const [enablePrint, setEnablePrint] = useState(true);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Container className="container mt-4 content">
            <InvoicePagePrintable ref={componentRef} canPrint={(value) => setEnablePrint(value)} />
            <Button onClick={handlePrint} className={enablePrint ? '' : 'disabled'}>Stampa</Button>
        </Container>
    );
}

export default InvoicePage;