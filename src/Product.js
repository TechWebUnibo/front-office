import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import ProductCard from "./ProductCard";

const Product = () => { 
  var price = 248.99;
  var currency = "€";
  return (
    <Container>
      <h2>I nostri gruppi cottura</h2>
      <ProductCard
        title="gruppo cottura 1"
        currency="€"
        price="289.99"
        img={logo}
      />

      <Card>
        <Card.Title>Gruppo cottura 1</Card.Title>
        <Card.Body>
          <Card.Img className=" pb-2" src={logo}></Card.Img>
          <Card.Text>
            A partire da {currency + " " + price} al giorno{" "}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to="/" className="shadow-link-gray">
            <Button>Vai a prodotto</Button>
          </Link>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Title>Gruppo cottura 1</Card.Title>
        <Card.Body>
          <Card.Img className=" pb-2" src={logo}></Card.Img>
          <Card.Text>
            A partire da {currency + " " + price} al giorno{" "}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to="/" className="shadow-link-gray">
            <Button>Vai a prodotto</Button>
          </Link>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Product;
