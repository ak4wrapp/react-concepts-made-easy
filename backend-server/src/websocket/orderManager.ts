// orderManager.ts

import { WebSocket, WebSocketServer } from "ws";
import { Order } from "./types";

const orders: Order[] = [];

export const handleOrderRequest = (
  data: any,
  ws: WebSocket,
  wss: WebSocketServer
) => {
  switch (data.type) {
    case "AcceptPrice":
      const newOrder: Order = {
        productId: data.productId,
        price: data.price || 0,
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
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(orderUpdate));
        }
      });
      break;

    case "GetOrders":
      const ordersResponse = {
        type: "OrdersResponse",
        orders,
      };
      ws.send(JSON.stringify(ordersResponse));
      break;

    default:
      console.log("Unknown message type:", data.type);
  }
};

export const getOrders = () => orders;
