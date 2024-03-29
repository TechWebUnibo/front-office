import React from "react";
import { Card, Button, Image, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({product}) => {

    return (
      <div className="card mb-3" >
        <div className="row g-0">
          <div className="col-4">
            <img variant="top" className="img-fluid rounded-start" src={product.img} alt="product" />
          </div>
          <div className="col-8">
            <div className="card-body">
              <h5 className="card-title">{product.name} 
              {product.products.length !== 0 && <Badge bg="secondary px-1 mx-2">Bundle</Badge>}
              </h5>
                <Card.Text>{product.description}</Card.Text>
                <Link to={{
                  pathname: '/productPage',
                  state: {
                    props: {
                      backText: 'Prodotti',
                      confirmText: 'Noleggia',
                      action: 'create'
                    },
                    product: product,
                  }}}
                  className="shadow-link-gray">
                <Button>Vai al prodotto</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
