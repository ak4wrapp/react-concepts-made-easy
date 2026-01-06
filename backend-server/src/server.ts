import * as http from "http";
// import { setupWebSocketServer } from "./web-sockets/webSocketServer";
import { setupWebSocketServer } from "./ws/wsServer"; // New module for handling WebSocket connections
import { requestHandler } from "./http/http-endpoints";
import { productService } from "./services/product.service";

const server = http.createServer(requestHandler);
// Set up a single WebSocket server for both products and orders
setupWebSocketServer(server);

// Start the product service to handle product-related WebSocket connections
productService.start();

// Use the dynamic port provided by Render or fallback to 3000 for local testing
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
