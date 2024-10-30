// ProductList.tsx
import React, { useEffect, useState, useCallback } from "react";
import "./ProductList.css"; // Import the ProductList styles
import useWebSocket from "../custom-hooks/useWebSocket"; // Import the custom hook

interface Product {
  productId: string;
  price: number;
  guid: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMessage = useCallback((data) => {
    console.log("Handling message:", data); // Log to verify message handling
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
      // Ensure WebSocket is connected
      console.log("Sending GetProducts message");
      sendMessage({ type: "GetProducts" });
    }
  }, [connected, sendMessage]); // Run when loading changes

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

  return (
    <div id="products">
      {loading && <div id="loader">Loading products...</div>}
      {products.map((product) => (
        <div
          key={product.productId}
          id={product.productId}
          className="product"
          onDoubleClick={() =>
            acceptPrice(product.productId, product.price, product.guid)
          }
        >
          <div className="name">{product.productId}</div>
          <div className="price">${product.price}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
