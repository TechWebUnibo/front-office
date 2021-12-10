import { Container, ListGroup } from "react-bootstrap";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import seo from "../utility/dynamicPageTitle";

const ConfirmPage = () => {

    const location = useLocation()
    const { rental, productName } = location.state

    console.log(location.state)
    
    //Dynamic page title
    seo({title : 'Conferma ordine '+rental._id+' | Cater', metaDescription : 'La conferma per il tuo ordine'})

    return (
        <Container className="containerSM">
            <h2 className="title">Thank for your purchase!</h2>
            <h3 className="sub-title">Your order has been registered:</h3>
            <ListGroup id="rental-overall">
                <ListGroup.Item>Rental id: {rental._id}</ListGroup.Item>
                <ListGroup.Item>Product: {productName}</ListGroup.Item>
                <ListGroup.Item>Price: {rental.price}€</ListGroup.Item>
                <ListGroup.Item>Start: {rental.start.split('T')[0]}</ListGroup.Item>
                <ListGroup.Item>End: {rental.end.split('T')[0]}</ListGroup.Item>
            </ListGroup>
            <p className='mt-2'>You can still modify your order in your <Link to="/dashboard" classNmae="underlined">dashboard</Link></p>
        </Container>
    )
}

export default ConfirmPage