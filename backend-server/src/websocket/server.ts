// server.ts

import { createServer } from "http";
import { setupWebSocketServer } from "./wsServer";

const server = createServer();
setupWebSocketServer(server);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
