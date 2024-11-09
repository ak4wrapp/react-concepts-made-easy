import React, { useState } from "react";
import "./Product.css"; // Import the Product styles

interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (
    productId: string,
    price: number,
    guid: string
  ) => Promise<void>; // Assuming onAcceptPrice returns a promise
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
  const [loading, setLoading] = useState(false); // State to track if a price is being accepted

  const handleDoubleClick = async () => {
    // If reconnecting or already in loading state, do nothing
    if (reconnecting || loading) return;

    // Set loading state to true
    setLoading(true);

    try {
      // Wait for the price acceptance to finish
      await onAcceptPrice(productId, price, guid);

      // Set the green background temporarily
      setIsGreen(true);

      // Revert the background to the original after 2 seconds
      setTimeout(() => {
        setIsGreen(false);
      }, 1000); // 1 second
    } catch (error) {
      console.error("Error accepting price:", error);
    } finally {
      // After the process is complete, set loading state to false
      setLoading(false);
    }
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

      {/* Optionally, show a loading indicator when price is being accepted */}
      {loading && <div className="loading-indicator">Processing...</div>}
    </div>
  );
};

export default Product;
