// WebSocketComponent.tsx
import React from "react";
import "./WebSocketComponent.css"; // Import the main styles
import ProductList from "./components/ProductList";
import OrderTable from "./components/OrderTable";

const WebSocketComponent: React.FC = () => {
  return (
    <div className="websocket-container">
      <h1>Products</h1>
      <ProductList />
      <h2>Orders</h2>
      <OrderTable />
    </div>
  );
};

export default WebSocketComponent;
