import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {

    return (
    <Card>
        <Card.Img variant="top" src={product.img} thumbnail="true" alt="product image"/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
          <Link to={{
            pathname: '/productPage',
            state: {
              product: product
            }}}
             className="shadow-link-gray">
          <Button>Vai a prodotto</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
