// useProducts.ts
import { useEffect, useState, useCallback } from "react";
import useWebSocket from "../custom-hooks/useWebSocket"; // Adjust the path as necessary

interface Product {
  productId: string;
  price: number;
  guid: string;
}

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMessage = useCallback((data) => {
    console.log("Handling message:", data);
    if (data.type === "ProductsResponse") {
      setProducts(data.products);
      setLoading(false);
    } else if (data.type === "PriceUpdate") {
      updateProductPrice(data.productId, data.price);
    }
  }, []);

  const { connected, sendMessage } = useWebSocket(
    "ws://localhost:3000/products",
    handleMessage
  );

  useEffect(() => {
    if (connected) {
      console.log("Sending GetProducts message");
      sendMessage({ type: "GetProducts" });
    }
  }, [connected, sendMessage]);

  const updateProductPrice = (productId: string, price: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, price } : product
      )
    );
  };

  const acceptPrice = (productId: string, price: number, guid: string) => {
    sendMessage({
      type: "AcceptPrice",
      productId,
      price,
      guid,
    });
    console.log(`Accepted price for ${productId}: $${price} (GUID: ${guid})`);
  };

  return { products, loading, acceptPrice };
};

export default useProducts;
