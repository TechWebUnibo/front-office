import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useLocation } from "react-router";
import DatePicker from "react-datepicker";

import "../style/ProductPage.css"
import "react-datepicker/dist/react-datepicker.css";
import { getAvailability } from "../utility/apiLibrary";

const ProductPage = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [price, setPrice] = useState(NaN)
    const [available, setAvailable] = useState(false)
    const [isLogged, setisLogged] = useState(true)

    const location = useLocation()
    const { product } = location.state
    
    let availableAlert

    if(isLogged){
        availableAlert = (<p>Sign in to check the availability</p>)
    }
    else{
        availableAlert = (<p>This item is {available ? 'available' : 'not available'}</p>)
    }
    
    async function refreshPrice(){
        const res = await getAvailability(product._id, startDate, endDate)
        if(res){
            setPrice(res.price)
            if (res.available){
                setAvailable(res.available)
                setisLogged(true)
            }
            else{
                setisLogged(false)
            }
        }
    }
    
    useEffect(() => {
        const refresh = async () => {
            await refreshPrice()
        }
        refresh()
    }, [refreshPrice])


    return ( 
        <Container>
            <Row>
                <Col sm lg={4}>
                    <Image src={product.img} fluid thumbnail="true" alt="product image"/>
                </Col>
                <Col sm lg={8}>
                    <h2>{product.name}</h2>
                    <h3 className="description-header">Description: </h3>
                    <p>{product.description}</p>
                    <label htmlFor="start">From:</label> 
                    <DatePicker controlId="start"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />

                    <p>Rent me for: {price}</p>
                    {!isLogged && (
                        <p>Sign in to check the availability</p>
                    )}
                    {availableAlert}

                    <label htmlFor="end">To:</label>
                    <DatePicker controlId="end"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
          
     );
}
 
export default ProductPage;