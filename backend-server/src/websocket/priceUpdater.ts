// priceUpdater.ts

import { WebSocket, WebSocketServer } from "ws";
import { generateGUID } from "./../utils";
import { Product } from "./types";

export const updatePriceForProduct = (
  productId: string,
  product: Product,
  lastKnownPrices: Record<string, number>,
  wss: WebSocketServer
) => {
  const newPrice =
    product.price +
    (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
  product.price = Math.max(newPrice, 0); // Ensure price doesn't go negative

  // Check if the price has changed
  if (product.price !== lastKnownPrices[productId]) {
    const newGUID = generateGUID();
    product.currentGUID = newGUID;

    const priceUpdate = {
      type: "PriceUpdate",
      productId,
      price: product.price,
      guid: newGUID, // Include GUID in the price update
    };

    // Notify all clients about the price change
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(priceUpdate));
      }
    });

    // Update the last known price
    lastKnownPrices[productId] = product.price;
  }

  // Schedule the next update based on frequency
  setTimeout(
    () => updatePriceForProduct(productId, product, lastKnownPrices, wss),
    product.changeFrequency
  );
};
