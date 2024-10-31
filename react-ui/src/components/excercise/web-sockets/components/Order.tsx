import React from "react";
import "./Order.css"; // Import the Order styles

interface OrderProps {
  timestamp: string;
  productId: string;
  price: number;
  index: number;
  isNew: boolean; // Ensure this is included
}

const Order: React.FC<OrderProps> = ({
  timestamp,
  productId,
  price,
  isNew,
}) => {
  return (
    <tr className={isNew ? "new-order" : ""}>
      <td>{timestamp}</td>
      <td>{productId}</td>
      <td>${price}</td>
    </tr>
  );
};

export default Order;
