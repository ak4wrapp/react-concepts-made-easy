import React, { useEffect, useState } from "react";
import "./OrderTable.css"; // Import the OrderTable styles
import Order from "./Order"; // Import the Order component

interface OrderData {
  timestamp: string;
  productId: string;
  price: number;
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const orderWs = new WebSocket("ws://localhost:3000/orders");

    orderWs.onopen = () => {
      console.log("Connected to Order WebSocket server");
      orderWs.send(JSON.stringify({ type: "GetOrders" }));
    };

    orderWs.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "OrderAdded") {
        appendNewOrders(data.orders);
      } else if (data.type === "OrdersResponse") {
        updateOrderTable(data.orders);
      }
    };

    return () => {
      orderWs.close();
    };
  }, []);

  const updateOrderTable = (orders: OrderData[]) => {
    const sortedOrders = orders.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setOrders(sortedOrders);
  };

  const appendNewOrders = (newOrders: OrderData[]) => {
    setOrders((prevOrders) => [...newOrders, ...prevOrders]);

    setTimeout(() => {
      const orderRows = document.querySelectorAll("#ordersBody tr");
      const startIndex = newOrders.length;
      orderRows.forEach((row, index) => {
        if (index < startIndex) {
          row.classList.add("new-order");
          setTimeout(() => {
            row.classList.remove("new-order");
          }, 1000);
        }
      });
    }, 0);
  };

  return (
    <table id="orders">
      <thead>
        <tr>
          <th>Order Created</th>
          <th>Product</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody id="ordersBody">
        {orders.map((order, index) => (
          <Order key={index} {...order} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
