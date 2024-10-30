// wsServer.ts

import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
import { updatePriceForProduct } from "./priceUpdater";
import { handleOrderRequest } from "./orderManager";
import { Product } from "./types";
import { WebSocket } from "ws";

const products: Record<string, Product> = {
  product1: { price: 100, changeFrequency: 2000 },
  product2: { price: 200, changeFrequency: 5000 },
};

const lastKnownPrices: Record<string, number> = {
  product1: products["product1"].price,
  product2: products["product2"].price,
};

export const setupWebSocketServer = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  // Start updating prices for each product
  for (const productId in products) {
    updatePriceForProduct(productId, products[productId], lastKnownPrices, wss);
  }

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (message: string) => {
      const data = JSON.parse(message);
      handleOrderRequest(data, ws, wss);
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
