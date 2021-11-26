import {Container, Button, Spinner, Form, Col, Row, Modal} from 'react-bootstrap'
import RentalCard from './RentalCard';
import { deleteRental, getRentals, getUser } from '../utility/apiLibrary'
import { useState, useEffect } from 'react';
import Notify from './Notify'

const Rentals = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);
    const [rentals, setRentals] = useState([])
    const [idFilter, setIdFilter] = useState('')
    const [productFilter, setProductFilter] = useState('')  
    const [stateFilter, setStateFilter] = useState('')

    // Modal control for error
    const [errorShow, setErrorShow] = useState(false);

    function rentalsFilter(){
        const filteredByState = rentals.filter((rental) => {
            return rental.state === stateFilter || stateFilter === ''
        })
        const filteredByText = filteredByState.filter((rental) => {
            return ((rental._id.toLowerCase().includes(idFilter.toLowerCase())) &&
                    (rental.productType.toLowerCase().includes(productFilter.toLowerCase())))
        })
        return filteredByText
    }

    const [show, setShow] = useState(false);
    const [rentalId, setRentalId] = useState();

    const handleClose = () => {
        setRentalId('');
        setShow(false);
    }
    const handleShow = (id) => {
        setRentalId(id);
        console.log(rentalId);
        setShow(true);
    }


    // TODO - Use this function to trigger a modal for the confirmation (if you want)
    async function deleteTrigger(id){
        console.log(id)
        handleShow(id);
        // await deleteReal(id)
    }
    async function deleteReal(id){
        let res = await deleteRental(id)
        if(res === 200){
            window.location.reload(false);
        }
        else{
            setShow(false)
            setErrorShow(true)
        }
    }

    useEffect( () => {
        const fetchRentals = async () => {
            let {status, body} = await getRentals({productName:true, img: true, customer: await getUser()});
            if(status === 200) {
                setRentals(body)
                setIsPending(false);
            }
            else {
                setError(true);
            }
        }
        fetchRentals();
    }, []);


    return(
        <Container fluid="sm">
            <h2 className="title">I tuoi noleggi</h2>
            {isPending && (
                <Container>
                    <Spinner animation="border" size="m"/>
                </Container>
            )}
            {error && (
                <Container>
            <h2> Uho, qualcosa è andato storto...</h2>
                    <Button > Ricarica</Button>
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

                        <Row>
                            <Form.Group as={Col} md={3} className="mb-3" controlId="product-filter">
                                <Form.Label>Nome del prodotto</Form.Label>
                                <Form.Control value={productFilter} onChange={(e) => setProductFilter(e.target.value)} placeholder="Filter by product name"  />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md={3} className="mb-3" controlId="product-filter">
                                <Form.Label>Filtra per stato</Form.Label>
                                <Form.Select aria-label="State filter" value={stateFilter}
                                    onChange={(e) => setStateFilter(e.target.value)}>
                                    <option value='' defaultValue>Tutti gli stati</option>
                                    <option value="not_started">Non iniziato</option>
                                    <option value="started">In corso</option>
                                    <option value="terminated">Terminato</option>
                                    <option value="delayed">In ritardo</option>
                                    <option value="cancelled">Cancellato</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                    )
                }
            {!isPending &&
                rentalsFilter().map((rental) => {
                    return <RentalCard alt="Product image" deleteRental={deleteTrigger} id={rental._id} name={rental.productType} img={rental.img} price={rental.price} startDate={rental.start.split('T')[0]} endDate={rental.end.split('T')[0]} status={rental.state} key={rental._id}/>
                })
            }
            <Notify
                show={errorShow}
                data={{ title: 'Ooops...', text: "E' troppo tardi per poter eliminare il noleggio"}}
                onHide={() => setErrorShow(false)}
            />

            <Modal show={show}
                   onHide={handleClose}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminazione Noleggio</Modal.Title>
                </Modal.Header>
                <Modal.Body>Stai per annullare il noleggio {rentalId}, sei sicuro di voler procedere? Questo procedimento è irreversibile.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annulla
                    </Button>
                    <Button variant="danger" onClick={() => deleteReal(rentalId)}> {/*TODO problemi di sicurezza,la variabile è globale e non un parametro migliorare*/}
                        Elimina noleggio
                    </Button>
                </Modal.Footer>
            </Modal>

            </Container>
    );
}
export default Rentals;