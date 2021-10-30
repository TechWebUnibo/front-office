import {Container, Button, Spinner, Form, Col, Row} from 'react-bootstrap'
import RentalCard from './RentalCard';
import { getRentals, getUser } from '../utility/apiLibrary'
import { useState, useEffect } from 'react';

const Rentals = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);
    const [rentals, setRentals] = useState([])
    const [idFilter, setIdFilter] = useState('')
    const [productFilter, setProductFilter] = useState('')

    function rentalsFilter(){
        return rentals.filter((rental) => {
            return ((rental._id.toLowerCase().includes(idFilter.toLowerCase())) &&
                    (rental.productType.toLowerCase().includes(productFilter.toLowerCase())))
        })
    }

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
                                <Form.Control type="text" value={idFilter} onChange={(e) => setIdFilter(e.target.value)} placeholder="Filter by id" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="product-filter">
                            <Form.Label>Nome del prodotto</Form.Label>
                    <Form.Control value={productFilter} onChange={(e) => setProductFilter(e.target.value)} placeholder="Filter by product name"  />
                        </Form.Group>
                    </Form>)
                }
            {
                rentalsFilter().map((rental) => {
                    return <RentalCard alt="Product image" id={rental._id} name={rental.productType} img={rental.img} price={rental.price} startDate={rental.start.split('T')[0]} endDate={rental.end.split('T')[0]} status={rental.state} key={rental._id}/>
                })
            }
        </Container>
    );
}
export default Rentals;