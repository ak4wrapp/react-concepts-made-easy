// ProductList.tsx
import React from "react";
import "./ProductList.css"; // Import the ProductList styles
import useProducts from "../custom-hooks/useProducts"; // Import the new custom hook

const ProductList: React.FC = () => {
  const { products, loading, acceptPrice } = useProducts();

  return (
    <div id="products">
      {loading && <div id="loader">Loading products...</div>}
      {products.map((product) => (
        <div
          key={product.productId}
          id={product.productId}
          className="product"
          onDoubleClick={() =>
            acceptPrice(product.productId, product.price, product.guid)
          }
        >
          <div className="name">{product.productId}</div>
          <div className="price">${product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
