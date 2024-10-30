// Order.tsx
import React from "react";
import "./Order.css"; // Import the Order styles

interface OrderProps {
  timestamp: string;
  productId: string;
  price: number;
  index: number;
}

const Order: React.FC<OrderProps> = ({
  timestamp,
  productId,
  price,
  index,
}) => {
  return (
    <tr style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
      <td>{timestamp}</td>
      <td>{productId}</td>
      <td>${price}</td>
    </tr>
  );
};

export default Order;
