import { useEffect, useState, useCallback } from "react";
import useWebSocket from "./useWebSocket"; // Adjust the path as necessary

interface Product {
  productId: string;
  price: number;
  guid: string;
  error?: string; // Optional error property to store error message
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState<string | null>(null); // Track network errors
  const [reconnecting, setReconnecting] = useState<boolean>(false); // Track reconnection state
  const [acceptingPrice, setAcceptingPrice] = useState<boolean>(false); // Track if a price is being accepted

  const handleMessage = useCallback((data) => {
    console.log("Handling message:", data);
    if (data.type === "ProductsResponse") {
      setProducts(data.products);
      setLoading(false);
    } else if (data.type === "PriceUpdate") {
      updateProductPrice(data.productId, data.price);
    }
  }, []);

  const webSocketURL =
    window.location.hostname === "localhost1"
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

  const updateProductPrice = (productId: string, price: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, price } : product
      )
    );
  };

  const acceptPrice = async (
    productId: string,
    price: number,
    guid: string
  ) => {
    // If reconnecting or already processing another price acceptance, do nothing
    if (reconnecting || acceptingPrice) return;

    setAcceptingPrice(true); // Set acceptingPrice to true to block further price acceptance

    try {
      if (productId === "product4") {
        throw new Error("product4 is disabled from accepting price");
      }
      // Send the message to accept the price
      await sendMessage({
        type: "AcceptPrice",
        productId,
        price,
        guid,
      });
      console.log(`Accepted price for ${productId}: $${price} (GUID: ${guid})`);

      // Successfully accepted price, clear the error
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, error: undefined } // Clear any error for this product
            : product
        )
      );
    } catch (error: any) {
      console.error("Error accepting price:", error);

      // Set error on the specific product
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, error: error.message } // Attach the error to the product
            : product
        )
      );

      // Set product theme to red on error
      setTimeout(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === productId
              ? { ...product, error: undefined } // Reset error after 500ms
              : product
          )
        );
      }, 500); // Reset error after 500ms

      setNetworkError(error.message); // Set the global network error if applicable

      throw error; // Rethrow the error to propagate it up
    } finally {
      setAcceptingPrice(false); // Reset acceptingPrice once done
    }
  };

  const retryAcceptPrice = async (
    productId: string,
    price: number,
    guid: string
  ) => {
    // Retry logic: Simply call acceptPrice again if the WebSocket is connected
    if (connected) {
      await acceptPrice(productId, price, guid);
    } else {
      setNetworkError("Unable to retry, WebSocket is disconnected.");
    }
  };

  return {
    products,
    loading,
    acceptPrice,
    retryAcceptPrice,
    networkError,
    reconnecting,
  };
};

export default useProducts;
