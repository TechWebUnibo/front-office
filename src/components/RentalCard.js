import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getProducts } from '../utility/apiLibrary';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker";

import '../style/rental.css'

import Explainer from './Explainer';

//possible rent state: not_started, in_progress, delayed, terminated

const RentalCard = (prop) => {

    //Explainer text
    const title = "Leggenda"
    const message = (<>
        <span><b>Not started</b>: il noleggio non è ancora in corso e deve essere revisionato da uno dei nostri addetti;</span>
        <br /> 
        <span><b>In progress</b>: la merce noleggiata è stata erogata e il noleggio è in corso;</span>
        <br /> 
        <span><b>Delayed</b>: il noleggio dovrebbe essere già terminato ma l'utente non ha ancora restituito la merce (si ricorda che ogni giorno extra comprende il pagamento di una penale);</span>
        <br /> 
        <span><b>Terminated</b>: la merce è stata restituita e sono state effettuate tutte le verifiche necessarie per chiudere il noleggio.</span>
        <br /> 
        <span><b>Cancelled</b>: il noleggio è stato terminato prima della sua erogazione.</span>
     </>)

    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProductInfo = async () => {
            let { status, body } = await getProducts({ name: prop.name })
            if(status === 200){
                setProduct(body[0])
            }
        }
        getProductInfo()
    }, [prop.name])

    return (

            <Card id="rental" className="mt-3">
                <Card.Header id='rental-id'>Ordine #{prop.id}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="pe-1">
                            <Card.Title className="display-5">{prop.name}</Card.Title>
                            <Card.Text>
                                Costo: {prop.price}€ <br />
                                Stato: {prop.status} <Explainer title={title} message={message}/>
                            </Card.Text>
                        </Col>
                        <Col className="ps-1 text-center">
                            <Card.Img src={prop.img} alt={prop.alt} />
                        </Col>
                        
                    </Row>
                    <hr className="my-3"/>
                                Periodo: {prop.startDate} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg> {prop.endDate}
                {(prop.status === 'not_started') && (
                <Row className="mt-3">
                    <Col>
                        <Link to={{
                                pathname: '/productPage',
                                state: {
                                    props: {
                                        backText: 'Ordini',
                                        confirmText: 'Modifica',
                                        action: 'modify',
                                        rentId: prop.id
                                    },
                                    product: product,
                                    }}}
                                className="shadow-link-gray">
                                <Button>Modifica</Button>
                            </Link>
                    </Col>
                    <Col>
                            <Button variant="primary" onClick={() => prop.deleteRental(prop.id)}>Elimina ordine</Button>
                    </Col>
                </Row>
                )}
                {(prop.state === 'terminated') && <Button variant="primary">Mostra fattura</Button>}
                </Card.Body>
            </Card>
    );
}
export default RentalCard