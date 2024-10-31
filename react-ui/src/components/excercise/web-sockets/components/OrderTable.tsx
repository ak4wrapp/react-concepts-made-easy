import React, { useEffect, useState } from "react";
import Order from "./Order"; // Import the Order component
import useOrders from "../custom-hooks/useOrders"; // Import the custom hook
import "./OrderTable.css"; // Import the CSS file

const OrderTable: React.FC = () => {
  const { orders, newOrders } = useOrders();
  const [newOrderIndex, setNewOrderIndex] = useState<number | null>(null);

  useEffect(() => {
    if (newOrders.length > 0) {
      // Flash the latest added order only if new orders are received
      setNewOrderIndex(0); // Latest order index (top of the list)
    }
  }, [newOrders]);

  useEffect(() => {
    if (newOrderIndex !== null) {
      // Clear the new order index after a timeout
      const timeout = setTimeout(() => {
        setNewOrderIndex(null); // Reset index to hide flashing
      }, 1000); // Flash duration

      return () => clearTimeout(timeout); // Cleanup on unmount
    }
  }, [newOrderIndex]);

  // Sort orders in descending order based on timestamp
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="table-container">
      <table id="orders">
        <thead>
          <tr>
            <th>Order Created</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody id="ordersBody">
          {sortedOrders.map((order, index) => (
            <Order
              key={index} // Use the index as the key
              {...order} // Spread order properties
              index={index} // Pass the index prop
              isNew={newOrderIndex === index} // Flash only the latest added order
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
