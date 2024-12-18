import { useState, useEffect, useCallback } from "react";
import useWebSocket from "./useWebSocket"; // Import your WebSocket hook

interface OrderData {
  timestamp: string;
  productId: string;
  price: number;
}

const useOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [newOrders, setNewOrders] = useState<OrderData[]>([]); // Track newly added orders

  const handleMessage = useCallback((data) => {
    if (data.type === "OrderAdded") {
      setNewOrders((prevNewOrders) => [...data.orders, ...prevNewOrders]); // Store newly added orders
      setOrders((prevOrders) => [...data.orders, ...prevOrders]); // Add new orders at the top
    } else if (data.type === "OrdersResponse") {
      setOrders(data.orders); // Set initial orders
    }
  }, []);

  const webSocketURL =
    window.location.hostname === "localhost"
      ? "ws://localhost:3000" // Local development URL
      : "wss://react-concepts-made-easy.onrender.com"; // Production URL

  const { connected, sendMessage } = useWebSocket(
    webSocketURL + "/orders",
    handleMessage
  );

  useEffect(() => {
    if (connected) {
      console.log("Sending GetOrders message");
      sendMessage({ type: "GetOrders" }); // Request initial orders
    }
  }, [connected, sendMessage]);

  return { orders, newOrders }; // Return orders and new orders
};

export default useOrders;
