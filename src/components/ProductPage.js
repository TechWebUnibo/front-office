import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useLocation } from "react-router";
import { createURL } from '../utility/develop'

const ProductPage = () => {

    const location = useLocation()
    const { product } = location.state
    
    useEffect(() => {
        product.img = createURL(product.img)
    }, [product])

    return ( 
        <Container>
            <Row>
                <Col sm>
                    <Image src={product.img} fluid thumbnail="true" alt="product image"/>
                </Col>
                <Col sm>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </Col>
            </Row>
        </Container>
          
     );
}
 
export default ProductPage;