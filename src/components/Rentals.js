import {Container, Button, Spinner, Form, Col, Row} from 'react-bootstrap'
import RentalCard from './RentalCard';
import { getRentals, getUser } from '../utility/apiLibrary'
import { useState, useEffect } from 'react';

const Rentals = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);
    const [rentals, setRentals] = useState([])

    async function fetchRentals()  {

        let {status, body} = await getRentals({productName:true, customer: await getUser()});
        if(status) {
            setIsPending(false);
        }
        if(status === 200) {
            setRentals(body)
        }
        else {
            setError(true);
        }
    }
    useEffect( () => {
        fetchRentals();
    }, []);


    return(
        <Container>
            <h2 className="display-2">I tuoi noleggi</h2>
            {isPending && (
                <Container>
                    <Spinner animation="border" size="m"/>
                </Container>
            )}
            {error && (
                <Container>
            <h2> Uho, qualcosa è andato storto...</h2>
                    <Button onClick={() => fetchRentals()}> Ricarica</Button>
            </Container>
            )}
            {!isPending &&
                (<Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} md={3} controlId="id-filter">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" placeholder="Filter by id" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Address 2</Form.Label>
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>
                    </Form>)
                }
            {
                rentals.map((rental) => {
                    return <RentalCard alt="Product image" id={rental._id} name={rental.productType} img={rental.img} price={rental.price} startDate={rental.start.split('T')[0]} endDate={rental.end.split('T')[0]} status={rental.state} key={rental._id}/>
                })
            }
        </Container>
    );
}
export default Rentals;