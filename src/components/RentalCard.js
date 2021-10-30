import { Card, Row, Col } from 'react-bootstrap';

const RentalCard = (prop) => {
    return (

            <Card className="mt-3">
                <Card.Header>Ordine #{prop.id}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="pe-1">
                            <Card.Title className="display-5">{prop.name}</Card.Title>
                            <Card.Text>
                                Costo: {prop.price}€ <br />
                                Stato: {prop.status}
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

                </Card.Body>
            </Card>
    );
}
export default RentalCard