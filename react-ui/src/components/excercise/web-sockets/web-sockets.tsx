import React, { useEffect, useState } from "react";
import "./web-sockets.css"; // Ensure this file exists

interface Product {
  productId: string;
  price: number;
  guid: string;
}

interface Order {
  timestamp: string;
  productId: string;
  price: number;
}

const WebSocketComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const productWs = React.useRef<WebSocket | null>(null);
  const orderWs = React.useRef<WebSocket | null>(null);

  useEffect(() => {
    productWs.current = new WebSocket("ws://localhost:3000/products");
    orderWs.current = new WebSocket("ws://localhost:3000/orders");

    productWs.current.onopen = () => {
      console.log("Connected to Product WebSocket server");
      setLoading(true);
      productWs.current!.send(JSON.stringify({ type: "GetProducts" }));
    };

    orderWs.current.onopen = () => {
      console.log("Connected to Order WebSocket server");
      orderWs.current!.send(JSON.stringify({ type: "GetOrders" }));
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

    orderWs.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "OrderAdded") {
        appendNewOrders(data.orders);
      } else if (data.type === "OrdersResponse") {
        updateOrderTable(data.orders);
      }
    };

    return () => {
      productWs.current?.close();
      orderWs.current?.close();
    };
  }, []);

  const updateProductPrice = (productId: string, price: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId ? { ...product, price } : product
      )
    );
  };

  const updateOrderTable = (orders: Order[]) => {
    const sortedOrders = orders.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setOrders(sortedOrders);
  };

  const appendNewOrders = (newOrders: Order[]) => {
    setOrders((prevOrders) => [...newOrders, ...prevOrders]);

    // Trigger the flash effect for new rows
    setTimeout(() => {
      const orderRows = document.querySelectorAll("#ordersBody tr");
      const startIndex = newOrders.length; // Starting index for new rows
      orderRows.forEach((row, index) => {
        if (index < startIndex) {
          row.classList.add("new-order");
          // Remove the class after the animation to allow it to be reapplied next time
          setTimeout(() => {
            row.classList.remove("new-order");
          }, 1000); // Match this duration with the CSS animation duration
        }
      });
    }, 0);
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
    <div className="websocket-container">
      <h1>Product</h1>
      {loading && <div id="loader">Loading products...</div>}
      <div id="products">
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

      <h2>Orders</h2>
      <table id="orders">
        <thead>
          <tr>
            <th>Order Created</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody id="ordersBody">
          {orders.map((order, index) => (
            <tr
              key={index}
              style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}
            >
              <td>{order.timestamp}</td>
              <td>{order.productId}</td>
              <td>${order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WebSocketComponent;
