// Product.tsx
import React from "react";
import "./Product.css"; // Import the Product styles

interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (productId: string, price: number, guid: string) => void;
}

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
}) => {
  return (
    <div
      key={productId}
      id={productId}
      className="product"
      onDoubleClick={() => onAcceptPrice(productId, price, guid)}
    >
      <div className="name">{productId}</div>
      <div className="price">${price}</div>
    </div>
  );
};

export default Product;
