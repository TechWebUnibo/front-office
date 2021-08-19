import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = (prop) => {

    return (
    <Card>
        <Card.Img variant="top" src={prop.img}/>
      <Card.Body>
        <Card.Title>{prop.title}</Card.Title>
        <Card.Text>A partire da {prop.currency + " " + prop.price} al giorno </Card.Text>
        <Link to="/" className="shadow-link-gray">
          <Button>Vai a prodotto</Button>
        </Link>
      </Card.Body>
        

    </Card>
  );
};

export default ProductCard;
