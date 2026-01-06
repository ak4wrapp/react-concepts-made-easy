import { WebSocket } from "ws";
import { productService } from "../services/product.service";
import { ProductClientMessage } from "./types";

const clients = new Set<WebSocket>();

export const handleProductConnection = (ws: WebSocket) => {
  clients.add(ws);

  const unsubscribe = productService.onPriceUpdate((update) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(update));
    }
  });

  ws.on("message", (raw) => {
    const msg = JSON.parse(raw.toString()) as ProductClientMessage;

    if (msg.type === "GetProducts") {
      ws.send(
        JSON.stringify({
          type: "ProductsResponse",
          products: productService.getProducts(),
        })
      );
    }

    if (msg.type === "AcceptPrice") {
      try {
        const order = productService.acceptPrice(msg.productId, msg.guid);
        ws.send(
          JSON.stringify({
            type: "AcceptPriceResponse",
            status: "Success",
            order,
          })
        );
      } catch (e: any) {
        ws.send(
          JSON.stringify({
            type: "AcceptPriceResponse",
            status: "Error",
            message: e.message,
          })
        );
      }
    }
  });

  ws.on("close", () => {
    unsubscribe();
    clients.delete(ws);
  });
};
