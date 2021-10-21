import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Alert } from "react-bootstrap";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";
import {useHistory, Link} from "react-router-dom";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";
import { createRent, getAvailability, getUser } from "../utility/apiLibrary";
import  Notify  from "./Notify";

const ProductPage = () => {

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;
    const [products, setProducts] = useState([])
    const [price, setPrice] = useState(NaN)
    const [available, setAvailable] = useState(false)
    const [isLogged, setisLogged] = useState(true)

    // Modal control for error
    const [errorShow, setErrorShow] = useState(false);

    const location = useLocation()
    const { product } = location.state
    
    let availableAlert = isLogged ? (<Alert variant={available ? 'success' : 'danger'}>This item is <Alert.Link as={"span"}>{available ? 'available' : 'not available'}</Alert.Link></Alert>) : ''
    
    useEffect(() => {
        async function refreshPrice(){
            if (Date.parse(startDate) < new Date().setHours(23, 59, 59)){
                setAvailable(false)
            }
            else{
                const res = await getAvailability(product._id, startDate, endDate)
                if(res){
                    setPrice(res.price)
                    if (typeof res.available !== 'undefined'){
                        setAvailable(res.available)
                        setisLogged(true)
                        setProducts(res.products)
                    }
                    else{
                        setisLogged(false)
                    }
                }
            }
        }
        const refresh = async () => {
            await refreshPrice()
        }
        refresh()
    }, [startDate, endDate, product])

    async function rentProduct(){
        let { status, body } = await createRent(await getUser(), startDate, endDate, price, products, product._id)
        console.log(body)
        if(status === 200){
            history.push({
                pathname: '/confirm', 
                state: {
                    rental: body.rent,
                    productName: product.name
                }
            })
        }
        else{
            setErrorShow(true)
        }
    }

    const history = useHistory();

    return ( 
        <Container className="">
            <Button variant="outline-primary" className="my-3" onClick={history.goBack}>
                <i className="bi bi-arrow-left-short" style={{fontSize: "1em"}}></i>
                Product</Button>
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
                        <Alert variant="warning"><Alert.Link as={Link} to="/login" href="/login">Sign in to check the availability</Alert.Link> </Alert>
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
                    <Button variant="primary" className="mt-4" onClick={rentProduct} disabled={!isLogged || !available}>
                        Submit
                    </Button>
                </Col>
            </Row>
            <Notify
                show={errorShow}
                data={{title: 'Ooops...', text: 'Something gone wrong, please retry later'}}
                onHide={() => setErrorShow(false)}
            />
        </Container>
          
     );
}
 
export default ProductPage;