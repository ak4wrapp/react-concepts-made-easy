import { useEffect, useState, useCallback } from "react";
import useWebSocket from "./useWebSocket"; // Adjust the path as necessary

interface Product {
  productId: string;
  price: number;
  guid: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<string | null>(null); // Track network errors
  const [reconnecting, setReconnecting] = useState<boolean>(false); // Track reconnection state

  const handleMessage = useCallback((data) => {
    console.log("Handling message:", data);
    if (data.type === "ProductsResponse") {
      setProducts(data.products);
      setLoading(false);
    } else if (data.type === "PriceUpdate") {
      updateProductPrice(data.productId, data.guid, data.price);
    }
  }, []);

  const webSocketURL =
    window.location.hostname === "localhost"
      ? "ws://localhost:3000" // Local development URL
      : "wss://react-concepts-made-easy.onrender.com"; // Production URL

  const {
    connected,
    sendMessage,
    reconnecting: wsReconnecting,
  } = useWebSocket(webSocketURL + "/products", handleMessage);

  useEffect(() => {
    if (connected) {
      setNetworkError(null); // Reset network error on successful connection
      setLoading(true);
      console.log("Sending GetProducts message");
      sendMessage({ type: "GetProducts" });
    } else if (wsReconnecting) {
      setReconnecting(true); // WebSocket is reconnecting
    } else {
      // setNetworkError("Connection lost. Trying to reconnect...");
      setReconnecting(false);
    }
  }, [connected, sendMessage, wsReconnecting]);

  const updateProductPrice = (
    productId: string,
    guid: string,
    price: number
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, guid, price } : product
      )
    );
  };

  const acceptPrice = (productId: string, price: number, guid: string) => {
    sendMessage({
      type: "AcceptPrice",
      productId,
      price, // Even if you send price: "100", it will not be used as we will pull price from backend
      guid,
    });
    console.log(`Accepted price for ${productId}: $${price} (GUID: ${guid})`);
  };

  return { products, loading, acceptPrice, networkError, reconnecting };
};

export default useProducts;
