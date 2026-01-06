import React, { useEffect, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./Product.css";
import { ProductProps } from "./types";

const Product: React.FC<ProductProps> = ({
  productId,
  price,
  guid,
  onAcceptPrice,
  reconnecting,
  acceptPriceStatus,
  onResetPriceStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [blink, setBlink] = useState(false);

  const prevPriceRef = useRef<number | null>(null);

  // Detect price change
  useEffect(() => {
    if (prevPriceRef.current !== null && prevPriceRef.current !== price) {
      setBlink(true);

      const timer = setTimeout(() => setBlink(false), 1200);
      return () => clearTimeout(timer);
    }

    prevPriceRef.current = price;
  }, [price]);

  const handleDoubleClick = async () => {
    if (reconnecting || loading) return;
    setLoading(true);
    try {
      await onAcceptPrice(productId, price, guid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`product
        ${acceptPriceStatus === "success" ? "green-theme" : ""}
        ${acceptPriceStatus === "error" ? "red-theme" : ""}
      `}
      onDoubleClick={handleDoubleClick}
    >
      <div className="name">{productId}</div>

      <div className="price-and-indicator">
        <div className={`price ${blink ? "price-text-blink" : ""}`}>
          ${price}
        </div>

        {acceptPriceStatus === "success" && (
          <CheckCircleIcon
            sx={{ color: "lightgreen", fontSize: "1.2rem", paddingLeft: "8px" }}
          />
        )}
        {acceptPriceStatus === "error" && (
          <CancelIcon
            sx={{ color: "lightred", fontSize: "1.2rem", paddingLeft: "8px" }}
          />
        )}
      </div>

      {loading && <div className="loading-indicator">Processing...</div>}

      {(acceptPriceStatus === "success" || acceptPriceStatus === "error") && (
        <button className="reset-button" onClick={onResetPriceStatus}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Product;
