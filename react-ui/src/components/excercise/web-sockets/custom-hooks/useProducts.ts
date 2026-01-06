import { useEffect, useState, useCallback } from "react";
import useWebSocket from "./useWebSocket";

interface Product {
  productId: string;
  price: number;
  guid: string;
}

type ProductStatus = "none" | "success" | "error";

// Determine WS URL dynamically
const WS_BASE_URL =
  window.location.hostname === "localhost"
    ? "ws://localhost:5001"
    : "wss://react-concepts-made-easy.onrender.com";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productStatuses, setProductStatuses] = useState<
    Record<string, ProductStatus>
  >({});

  const handleMessage = useCallback((data: any) => {
    switch (data.type) {
      case "ProductsResponse":
        setProducts(data.products);
        setLoading(false);
        break;

      case "PriceUpdate":
        setProducts((prev) =>
          prev.map((p) =>
            p.productId === data.productId
              ? { ...p, price: data.price, guid: data.guid }
              : p
          )
        );
        break;

      case "AcceptPriceResponse":
        setProductStatuses((prev) => ({
          ...prev,
          [data.productId]: data.status === "Success" ? "success" : "error",
        }));
        break;
    }
  }, []);

  const { connected, reconnecting, sendMessage, networkError } = useWebSocket(
    `${WS_BASE_URL}/products`,
    handleMessage
  );

  useEffect(() => {
    if (connected) {
      setLoading(true);
      sendMessage({ type: "GetProducts" });
    }
  }, [connected, sendMessage]);

  const acceptPrice = (productId: string, price: number, guid: string) => {
    sendMessage({
      type: "AcceptPrice",
      productId,
      price, // backend ignores it, but TS requires it
      guid,
    });
  };
  const resetProductStatus = (productId: string) => {
    setProductStatuses((prev) => ({
      ...prev,
      [productId]: "none",
    }));
  };

  return {
    products,
    loading,
    connected,
    reconnecting,
    networkError,
    acceptPrice,
    productStatuses,
    resetProductStatus,
  };
};

export default useProducts;
