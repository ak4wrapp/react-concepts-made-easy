import { useEffect, useState, useCallback } from "react";
import useWebSocket from "./useWebSocket";

interface Order {
  timestamp: string;
  productId: string;
  price: number;
}

// Determine WS URL dynamically
const WS_BASE_URL =
  window.location.hostname === "localhost"
    ? "ws://localhost:5001"
    : "wss://react-concepts-made-easy.onrender.com";

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrders, setNewOrders] = useState<Order[]>([]); // Track newly added orders

  const handleMessage = useCallback((data: any) => {
    switch (data.type) {
      case "OrdersResponse":
        setOrders(data.orders);
        break;

      case "OrderAdded":
        setNewOrders((prev) => [data.order, ...prev]);
        setOrders((prev) => [...data.orders, ...prev]);
        break;
    }
  }, []);

  const { connected, reconnecting, sendMessage, networkError } = useWebSocket(
    `${WS_BASE_URL}/orders`,
    handleMessage
  );

  useEffect(() => {
    if (connected) {
      sendMessage({ type: "GetOrders" });
    }
  }, [connected, sendMessage]);

  return {
    orders,
    connected,
    reconnecting,
    networkError,
    newOrders,
  };
};

export default useOrders;
