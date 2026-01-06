import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { handleProductConnection } from "./product.ws";
import { handleOrderConnection } from "./order.ws";

export const setupWebSocketServer = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    if (req.url === "/products") return handleProductConnection(ws);
    if (req.url === "/orders") return handleOrderConnection(ws);
    ws.close();
  });
};
