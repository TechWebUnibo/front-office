import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {

    return (
    <Card>
        <Card.Img variant="top" src={product.img}/>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Link to="/productPage" className="shadow-link-gray">
          <Button>Vai a prodotto</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
