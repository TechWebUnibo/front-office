import React from "react";
import { useParams } from "react-router";
import useFetch from "../utility/useFetch";

const ProductPage = () => {

    const { id } = useParams();
    const { data: product, error, isPending } = useFetch('http://localhost:8000/products/' + id);

    return ( 
        <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
          <div>
          <h1>product.title</h1>
          <img src={product.img} />
          </div>
      )}
      </div>
          
     );
}
 
export default ProductPage;