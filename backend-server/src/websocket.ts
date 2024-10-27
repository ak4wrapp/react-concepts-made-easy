import { Server as WebSocketServer, WebSocket } from "ws";
import { Server as HttpServer } from "http";

// Function to generate a random GUID
const generateGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface Order {
  productId: string;
  price: number;
  guid: string; // Added GUID to the Order interface
}

interface Product {
  price: number;
  changeFrequency: number; // Frequency in milliseconds
  currentGUID?: string; // Store the current GUID for the price
}

const orders: Order[] = [];
const products: Record<string, Product> = {
  product1: { price: 100, changeFrequency: 2000 },
  product2: { price: 200, changeFrequency: 5000 },
};

// Store the last known prices to detect changes
const lastKnownPrices: Record<string, number> = {
  product1: products["product1"].price,
  product2: products["product2"].price,
};

export const setupWebSocketServer = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  // Function to update price for each product
  const updatePriceForProduct = (productId: string) => {
    const product = products[productId];

    // Randomly change price for demonstration
    const newPrice =
      product.price +
      (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
    product.price = Math.max(newPrice, 0); // Ensure price doesn't go negative

    // Check if the price has changed
    if (product.price !== lastKnownPrices[productId]) {
      // Generate a new GUID for the price change
      const newGUID = generateGUID();
      product.currentGUID = newGUID;

      const priceUpdate = {
        type: "PriceUpdate",
        productId,
        price: product.price,
        guid: newGUID, // Include GUID in the price update
      };

      // Notify all clients about the price change
      wss.clients.forEach((client) => {
        if (
          client instanceof WebSocket &&
          client.readyState === WebSocket.OPEN
        ) {
          client.send(JSON.stringify(priceUpdate));
        }
      });

      // Update the last known price
      lastKnownPrices[productId] = product.price;
    }

    // Schedule the next update based on frequency
    setTimeout(() => updatePriceForProduct(productId), product.changeFrequency);
  };

  // Start updating prices for each product
  for (const productId in products) {
    updatePriceForProduct(productId);
  }

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (message: string) => {
      const data = JSON.parse(message);

      switch (data.type) {
        case "GetPrice":
          // Handle GetPrice request
          const priceResponse = {
            type: "PriceResponse",
            productId: data.productId,
            price: products[data.productId]?.price || null,
            guid: products[data.productId]?.currentGUID || null, // Send the current GUID
          };
          ws.send(JSON.stringify(priceResponse));
          break;

        case "AcceptPrice":
          // Handle AcceptPrice request (create an order)
          const newOrder: Order = {
            productId: data.productId,
            price: products[data.productId]?.price || 0,
            guid: data.guid, // Accept the GUID from the request
          };
          orders.push(newOrder);
          console.log("New order created:", newOrder);

          // Notify all clients about the new order
          const orderUpdate = {
            type: "OrderUpdate",
            orders,
          };
          wss.clients.forEach((client) => {
            if (
              client instanceof WebSocket &&
              client.readyState === WebSocket.OPEN
            ) {
              client.send(JSON.stringify(orderUpdate));
            }
          });
          break;

        case "GetOrders":
          // Handle GetOrders request
          const ordersResponse = {
            type: "OrdersResponse",
            orders,
          };
          ws.send(JSON.stringify(ordersResponse));
          break;

        default:
          console.log("Unknown message type:", data.type);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
