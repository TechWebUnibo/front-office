import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";
import { createRent, getAvailability, getUser } from "../utility/apiLibrary";

const ProductPage = () => {

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(NaN)
    const [available, setAvailable] = useState(false)
    const [isLogged, setisLogged] = useState(true)

    const location = useLocation()
    const { product } = location.state
    
    let availableAlert = isLogged ? (<Alert variant={available ? 'success' : 'danger'}>This item is <Alert.Link as={"span"}>{available ? 'available' : 'not available'}</Alert.Link></Alert>) : ''
    
    useEffect(() => {
        async function refreshPrice(){
            const res = await getAvailability(product._id, startDate, endDate)
            if(res){
                setPrice(res.price)
                if (res.available){
                    setAvailable(res.available)
                    setisLogged(true)
                    setProducts(res.products)
                }
                else{
                    setisLogged(false)
                }
            }
        }
        const refresh = async () => {
            await refreshPrice()
        }
        refresh()
    }, [startDate, endDate, product])

    async function rentProduct(){
        // TODO - capire come assegnare l'employee, se casualmente o meno
        let res = await createRent(getUser(), getUser(), startDate, endDate, price, products, product._id)
        console.log(res)
    }


    return ( 
        <Container className="mt-5">
            <Row>
                <Col sm lg={4}>
                    <Image src={product.img} fluid thumbnail="true" alt="product image"/>
                </Col>
                <Col sm lg={8}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    {(!isLogged || available) && (<Alert variant="info">
                        Rent me for:   <Alert.Link as={"span"}>{price}€</Alert.Link>
                    </Alert>)}
                    {!isLogged && (
                        <Alert variant="warning"><Alert.Link as={"span"}>Sign in to check the availability</Alert.Link> </Alert>
                    )}
                    {availableAlert}
                    
                    <label htmlFor="start">Pick a range:</label> 
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        withPortal
                    />
                    <Button variant="primary" className="mt-4" onClick={rentProduct} disabled={!isLogged}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
          
     );
}
 
export default ProductPage;