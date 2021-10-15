import React from "react";
import { Container} from "react-bootstrap";
import ProductCard from "./components/ProductCard";

const Products = () => { 
  
  const logo = '/box'

    const products= [{title: "Gruppo 1", price:245.68, img:{logo}},
    {title: "Gruppo 2", price:285.68, img:{logo}},
    {title: "Gruppo 3", price:345.68, img:{logo}},
    {title: "Gruppo 4", price:145.68, img:{logo}}];

  return (
    <Container>
      <h2>I nostri gruppi cottura</h2>
      {products.map(product => (
          <ProductCard
          prop={product}
        />
      ))}
    </Container>
  );
};

export default Products;
