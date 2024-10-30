import * as http from "http";
import { requestHandler } from "./endpoints";
import { setupWebSocketServer } from "./websocket/wsServer";

const server = http.createServer(requestHandler);

// Set up WebSocket server
setupWebSocketServer(server);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
