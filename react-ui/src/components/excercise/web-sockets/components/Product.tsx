import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import MUI check icon
import CancelIcon from "@mui/icons-material/Cancel"; // Import MUI cancel icon
import "./Product.css"; // Your custom styles for Product

interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (
    productId: string,
    price: number,
    guid: string
  ) => Promise<void>;
  reconnecting: boolean;
  error?: string;
  acceptPriceSuccess: boolean;
  acceptPriceError: boolean;
  onResetPriceStatus: () => void; // New prop to handle resetting success/error states
}

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
  reconnecting,
  error,
  acceptPriceSuccess,
  acceptPriceError,
  onResetPriceStatus, // Add this prop to reset price success/error states
}) => {
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false); // Track if reset button should be shown
  const [isReset, setIsReset] = useState(false); // Tracks whether the product card has been reset
  const [acceptedPrice, setAcceptedPrice] = useState<number | null>(null); // Track the accepted price

  // Disable double-click if there's a success or error
  const isDoubleClickDisabled = acceptPriceSuccess || acceptPriceError;

  // Throttled version of the handleDoubleClick function
  const handleDoubleClick = async () => {
    if (reconnecting || loading || isReset || isDoubleClickDisabled) return;

    // Start price acceptance immediately
    setLoading(true);

    try {
      await onAcceptPrice(productId, price, guid);
      setAcceptedPrice(price); // Store the accepted price
      setShowReset(true); // Show the reset button
    } catch (error) {
      setAcceptedPrice(price); // Store the accepted price even in case of failure
      setShowReset(true); // Show the reset button
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowReset(false); // Hide reset button
    setIsReset(true); // Set to reset state
    onResetPriceStatus(); // Reset the price success and error states
    setAcceptedPrice(null); // Clear accepted price to show original price

    setTimeout(() => {
      setIsReset(false); // Reset the product card to normal state
    }, 1000); // Reset delay (1 second)
  };

  return (
    <div
      className={`product ${acceptPriceSuccess ? "green-theme" : ""} ${
        acceptPriceError || error ? "red-theme" : ""
      }`}
      onDoubleClick={handleDoubleClick} // Handle double-click to accept price
    >
      <div className="name">{productId}</div>

      {/* Price and icon on the right */}
      <div className="price-and-indicator">
        {/* Show the accepted price or the original price depending on reset */}
        <div className="price">
          ${acceptedPrice !== null ? acceptedPrice : price}
        </div>
        {/* Show green check icon on success */}
        {acceptPriceSuccess && !isReset && (
          <CheckCircleIcon sx={{ color: "white", fontSize: "1.2rem" }} />
        )}
        {/* Show red cancel icon on error */}
        {acceptPriceError && !isReset && (
          <CancelIcon sx={{ color: "white", fontSize: "1.2rem" }} />
        )}
      </div>

      {/* Optionally, show a loading indicator when price is being accepted */}
      {loading && <div className="loading-indicator">Processing...</div>}

      {/* Show the reset button only when there's a success or error */}
      {showReset && !isReset && (
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Product;
