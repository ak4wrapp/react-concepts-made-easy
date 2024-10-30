// ProductList.tsx
import React, { useEffect, useState } from "react";
import "./ProductList.css"; // Import the ProductList styles

interface Product {
  productId: string;
  price: number;
  guid: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productWs = React.useRef<WebSocket | null>(null);

  useEffect(() => {
    productWs.current = new WebSocket("ws://localhost:3000/products");

    productWs.current.onopen = () => {
      console.log("Connected to Product WebSocket server");
      setLoading(true);
      productWs.current!.send(JSON.stringify({ type: "GetProducts" }));
    };

    productWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ProductsResponse") {
        setProducts(data.products);
        setLoading(false);
      } else if (data.type === "PriceUpdate") {
        updateProductPrice(data.productId, data.price);
      }
    };

    return () => {
      productWs.current?.close();
    };
  }, []);

  const updateProductPrice = (productId: string, price: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, price } : product
      )
    );
  };

  const acceptPrice = (productId: string, price: number, guid: string) => {
    if (productWs.current) {
      productWs.current.send(
        JSON.stringify({
          type: "AcceptPrice",
          productId,
          price,
          guid,
        })
      );
      console.log(`Accepted price for ${productId}: $${price} (GUID: ${guid})`);
    }
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
