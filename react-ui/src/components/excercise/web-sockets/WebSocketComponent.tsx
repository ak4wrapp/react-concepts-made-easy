// WebSocketComponent.tsx
import React from "react";
import "./WebSocketComponent.css"; // Import the main styles
import ProductList from "./ProductList";
import OrderTable from "./OrderTable";

const WebSocketComponent: React.FC = () => {
  return (
    <div className="websocket-container">
      <h1>Products</h1>
      <ProductList />
      <h2>Orders</h2>
      <OrderTable onOrdersUpdate={(orders) => console.log(orders)} />
    </div>
  );
};

export default WebSocketComponent;
