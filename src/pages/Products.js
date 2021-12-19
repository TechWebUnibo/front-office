import React, { useState, useEffect } from "react";
import { Container} from "react-bootstrap";
import { getProducts } from "../utility/apiLibrary";
import Paginator from "../components/Paginator"

import '../style/products.css'

import ProductCard from "../components/ProductCard";
import seo from "../utility/dynamicPageTitle";

const Products = () => {

  //Dynamic page title
  seo({title : 'Prodotti | Cater', metaDescription : 'I nostri prodotti'})

  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container className="containerSM">
      <h2 className="title">I nostri Prodotti</h2>
      {currentProducts.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
      <Paginator
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default Products;

//TODO: risolvere bug dove a primo caricamento della pagina da il prodotto non disponibile