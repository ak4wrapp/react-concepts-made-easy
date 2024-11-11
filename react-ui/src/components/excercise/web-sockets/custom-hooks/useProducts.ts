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

  // Track the status of each product
  const [productStatuses, setProductStatuses] = useState<{
    [productId: string]: "none" | "success" | "error";
  }>({});

  const handleMessage = useCallback((data: any) => {
    if (data.type === "ProductsResponse") {
      setProducts(data.products);
      setLoading(false);
    } else if (data.type === "PriceUpdate") {
      updateProductPrice(data.productId, data.guid, data.price);
    } else if (data.type === "AcceptPriceResponse") {
      // Handle the response for accepting a price
      const { productId, status, message } = data;
      const newStatus = status === "Success" ? "success" : "error";

      // Only update if the status has changed
      setProductStatuses((prevStatuses) => {
        const updatedStatuses = { ...prevStatuses };
        updatedStatuses[productId] = newStatus;
        return updatedStatuses;
      });

      // Optionally show a toast notification
      // Show toast based on the success or error of the AcceptPriceResponse
      // We'll handle showing the toast in ProductList based on `productStatuses` changes
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

  // Add a function to reset the product status
  const resetProductStatus = (productId: string) => {
    setProductStatuses((prevStatuses) => ({
      ...prevStatuses,
      [productId]: "none", // Reset the status of the given product
    }));
  };

  return {
    products,
    loading,
    acceptPrice,
    networkError,
    reconnecting,
    productStatuses, // Provide the product status here
    resetProductStatus, // Expose the reset function here
  };
};

export default useProducts;
