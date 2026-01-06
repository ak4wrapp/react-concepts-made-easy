import { WebSocket } from "ws";
import { orderService } from "../services/order.service";
import { OrderClientMessage } from "./types";

const clients = new Set<WebSocket>();

export const handleOrderConnection = (ws: WebSocket) => {
  clients.add(ws);

  const unsubscribe = orderService.onNewOrder((order) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "OrderAdded",
          orders: [order],
        })
      );
    }
  });

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString()) as OrderClientMessage;

    if (msg.type === "GetOrders") {
      ws.send(
        JSON.stringify({
          type: "OrdersResponse",
          orders: orderService.getAll(),
        })
      );
    }
  });

  ws.on("close", () => {
    unsubscribe();
    clients.delete(ws);
  });
};
