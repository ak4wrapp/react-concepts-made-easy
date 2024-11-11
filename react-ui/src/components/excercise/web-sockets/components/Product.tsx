import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // MUI check icon for success
import CancelIcon from "@mui/icons-material/Cancel"; // MUI cancel icon for error
import "./Product.css"; // Custom styles for the Product component

interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (productId: string, price: number, guid: string) => void;
  reconnecting: boolean;
  acceptPriceStatus: "success" | "error" | "none"; // Unified status for price acceptance
  onResetPriceStatus: () => void; // Reset price status after completion
}

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
  reconnecting,
  acceptPriceStatus,
  onResetPriceStatus,
}) => {
  const [loading, setLoading] = useState(false); // Track loading state

  const handleDoubleClick = async () => {
    if (reconnecting || loading) return; // Prevent action if reconnecting or loading
    setLoading(true);
    try {
      await onAcceptPrice(productId, price, guid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`product ${
        acceptPriceStatus === "success" ? "green-theme" : ""
      } ${acceptPriceStatus === "error" ? "red-theme" : ""}`}
      onDoubleClick={handleDoubleClick} // Handle double-click to accept price
    >
      <div className="name">{productId}</div>

      <div className="price-and-indicator">
        <div className="price">${price}</div>

        {acceptPriceStatus === "success" && (
          <CheckCircleIcon
            sx={{
              color: "lightgreen",
              fontSize: "1.2rem",
              paddingLeft: "8px",
            }}
          />
        )}
        {acceptPriceStatus === "error" && (
          <CancelIcon
            sx={{ color: "lightred", fontSize: "1.2rem", paddingLeft: "8px" }}
          />
        )}
      </div>

      {loading && <div className="loading-indicator">Processing...</div>}

      {/* Optionally, show reset button */}
      {(acceptPriceStatus === "success" || acceptPriceStatus === "error") && (
        <button className="reset-button" onClick={onResetPriceStatus}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Product;
