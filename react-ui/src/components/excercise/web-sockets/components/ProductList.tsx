import React from "react";
import "./ProductList.css"; // Import the ProductList styles
import useProducts from "../custom-hooks/useProducts"; // Import the new custom hook
import Product from "./Product"; // Import the Product component

const ProductList: React.FC = () => {
  const { products, loading, acceptPrice, networkError, reconnecting } =
    useProducts();

  return (
    <div id="products">
      {networkError && !reconnecting && (
        <div className="error-message">{networkError}</div>
      )}

      {loading && !reconnecting && !networkError && (
        <div id="loader">Loading products...</div>
      )}

      {products.length === 0 && !loading && !networkError && !reconnecting && (
        <div id="no-products">No products available</div>
      )}

      {products.map((product) => (
        <Product
          key={product.productId}
          productId={product.productId}
          price={product.price}
          guid={product.guid}
          onAcceptPrice={acceptPrice} // Pass the onAcceptPrice handler down to Product
          reconnecting={reconnecting} // Pass the reconnecting state to each Product
        />
      ))}
    </div>
  );
};

export default ProductList;
