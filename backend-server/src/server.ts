import * as http from "http";
import { setupWebSocketServer } from "./web-sockets/webSocketServer"; // New module for handling WebSocket connections
import { requestHandler } from "./http/http-endpoints";

const server = http.createServer(requestHandler);

// Set up a single WebSocket server for both products and orders
setupWebSocketServer(server);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
