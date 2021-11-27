import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { getProducts } from "../utility/apiLibrary";

import '../style/products.css'

import ProductCard from "../components/ProductCard";

const Products = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      let {status, body} = await getProducts()
      if(status !== 200){
        body = []
      }
      setProducts(body);
    };
    loadProducts();
  }, []);

  return (
    <Container>
      <h2 className="title">I nostri Prodotti</h2>
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Container>
  );
};

export default Products;

//TODO: risolvere bug dove a primo caricamento della pagina da il prodotto non disponibile