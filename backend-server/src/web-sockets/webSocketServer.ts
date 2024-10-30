import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { handleProductConnection } from "./productWebSocket";
import { handleOrderConnection } from "./ordersWebSocket";

const setupWebSocketServer = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, request) => {
    console.log("Client connected");

    const path = request.url; // Get the path from the request

    if (path === "/products") {
      handleProductConnection(ws);
    } else if (path === "/orders") {
      handleOrderConnection(ws);
    } else {
      console.log("Unknown path:", path);
      ws.close(); // Close connection for unknown paths
    }

    ws.on("close", () => {
      console.log("Client disconnected");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });
};

export { setupWebSocketServer };
