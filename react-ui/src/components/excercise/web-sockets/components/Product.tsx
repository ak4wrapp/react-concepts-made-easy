import React, { useState } from "react";
import throttle from "lodash/throttle"; // Import throttle from lodash
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
  error?: string; // Optional error prop to show error state
}

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
  reconnecting,
  error,
}) => {
  const [isGreen, setIsGreen] = useState(false); // Green background for success
  const [loading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false); // Track cooldown state
  const [isRed, setIsRed] = useState(false); // Track red theme for errors

  // Throttled version of the handleDoubleClick function
  const handleDoubleClick = throttle(async () => {
    // If reconnecting, loading, cooldown is active, or an error is present, do nothing
    if (reconnecting || loading || isCooldown || isRed) return;

    // Reset themes before starting the process
    setIsGreen(false); // Reset the green theme before accepting the price
    setIsRed(false); // Ensure that the red theme is reset before proceeding

    // Start price acceptance immediately
    setLoading(true);

    try {
      // Wait for the price acceptance to finish
      await onAcceptPrice(productId, price, guid);

      // Only set isGreen if there is no error during the price acceptance
      setIsGreen(true); // Set green background for success

      // Revert the background to the original after 1 second
      setTimeout(() => {
        setIsGreen(false); // Reset green after 1 second
      }, 1000); // 1 second delay
    } catch (error) {
      console.error("Error accepting price:", error);
      setIsRed(true); // Set to red on error

      // Reset to default dark theme after 500ms
      setTimeout(() => {
        setIsRed(false); // Revert to default theme after 500ms
      }, 500); // 500ms for showing red error theme
    } finally {
      // After the process is complete, set loading state to false
      setLoading(false);
    }
  }, 1000); // 1 second throttle delay

  // Render the product
  return (
    <div
      key={productId}
      id={productId}
      className={`product ${isGreen ? "green-theme" : ""} ${
        isRed || error ? "red-theme" : ""
      } ${isCooldown ? "disabled" : ""}`} // Ensure only one theme is applied at a time
      onDoubleClick={handleDoubleClick} // Handle double-click
      style={{ cursor: isCooldown ? "not-allowed" : "pointer" }} // Change cursor to "not-allowed" during cooldown
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
