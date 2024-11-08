import * as http from "http";
import { setupWebSocketServer } from "./web-sockets/webSocketServer"; // New module for handling WebSocket connections
import { requestHandler } from "./http/http-endpoints";

const server = http.createServer(requestHandler);

// Set up a single WebSocket server for both products and orders
setupWebSocketServer(server);

// Use the dynamic port provided by Render or fallback to 3000 for local testing
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
