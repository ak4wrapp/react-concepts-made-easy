import React, { useState } from "react";
import "./Product.css"; // Import the Product styles

interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (productId: string, price: number, guid: string) => void;
  reconnecting: boolean; // New prop to handle reconnecting state
}

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
  reconnecting,
}) => {
  const [isGreen, setIsGreen] = useState(false);

  const handleDoubleClick = () => {
    // Check if reconnecting is true, if so, don't process the double-click
    if (reconnecting) return;

    onAcceptPrice(productId, price, guid); // Call the passed function

    // Set the green background temporarily
    setIsGreen(true);

    // Revert the background to the original after 2 seconds
    setTimeout(() => {
      setIsGreen(false);
    }, 1000); // 1 second
  };

  return (
    <div
      key={productId}
      id={productId}
      className={`product ${isGreen ? "green-theme" : ""}`} // Conditional class for green background
      onDoubleClick={handleDoubleClick} // Handle double-click
    >
      {/* The product name stays at the top-left */}
      <div className="name">{productId}</div>

      {/* The price and reconnecting indicator are centered */}
      <div className={`price-and-indicator ${reconnecting ? "hidden" : ""}`}>
        <div className="price">${price}</div>
      </div>

      {reconnecting && <div className="reconnecting-indicator">...</div>}
    </div>
  );
};

export default Product;
