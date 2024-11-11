import { WebSocket } from "ws";
import { Order, orders } from "../datastore";

const orderClients: WebSocket[] = [];
let lastOrderCount = orders.length;

// Check for new orders and notify clients
const checkForNewOrders = () => {
  const currentOrderCount = orders.length;

  if (currentOrderCount > lastOrderCount) {
    const newOrders = orders.slice(lastOrderCount); // Get newly added orders
    notifyOrderClients(newOrders);
    lastOrderCount = currentOrderCount; // Update the last order count
    console.log(`Detected ${newOrders.length} new orders`);
  }
};

// Start polling for new orders
const startOrderPolling = () => {
  setInterval(checkForNewOrders, 1000); // Check every second
  console.log("Started polling for new orders every second");
};

// Notify order clients about new orders
const notifyOrderClients = (newOrders: Order[]) => {
  const newOrder = {
    type: "OrderAdded",
    orders: newOrders,
  };

  orderClients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(newOrder));
      console.log(`Notified client with ${newOrders.length} new orders`);
    } else {
      console.warn("Client is not open. Skipping notification.");
    }
  });
};

// Handle incoming order connections
const handleOrderConnection = (ws: WebSocket) => {
  orderClients.push(ws);
  console.log(
    "New order client connected. Total clients:",
    orderClients.length
  );

  ws.on("message", (message: string) => {
    try {
      const data = JSON.parse(message);
      console.log("Received message from client:", data);

      switch (data.type) {
        case "GetOrders":
          sendOrders(ws);
          break;
        default:
          console.log("Unknown order message type:", data.type);
      }
    } catch (e) {
      console.error("Error parsing message:", e);
      ws.send(
        JSON.stringify({
          type: "Error",
          message: "Invalid message format",
        })
      );
    }
  });

  ws.on("close", () => {
    orderClients.splice(orderClients.indexOf(ws), 1);
    console.log(
      "Order client disconnected. Total clients:",
      orderClients.length
    );
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
};

// Send current orders to a client
const sendOrders = (ws: WebSocket) => {
  const ordersResponse = {
    type: "OrdersResponse",
    orders,
  };
  ws.send(JSON.stringify(ordersResponse));
  console.log(`Sent ${orders.length} orders to client`);
};

// Call startOrderPolling when the module is loaded
startOrderPolling();

export { handleOrderConnection };
