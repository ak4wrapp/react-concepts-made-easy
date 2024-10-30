import { Server as WebSocketServer, WebSocket } from "ws";
import { Server as HttpServer } from "http";

// Function to generate a random GUID
const generateGUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

interface Order {
  productId: string;
  price: number;
  guid: string; // Added GUID to the Order interface
  timestamp: string; // Added property for timestamp
}

interface Product {
  price: number;
  changeFrequency: number; // Frequency in milliseconds
  currentGUID?: string; // Store the current GUID for the price
}

const orders: Order[] = [];
const products: Record<string, Product> = {
  product1: { price: 100, changeFrequency: 2000 },
  product2: { price: 200, changeFrequency: 1000 },
  product3: { price: 310, changeFrequency: 500 },
  product4: { price: 854, changeFrequency: 700 },
};

// Store the last known prices to detect changes
const lastKnownPrices: Record<string, number> = {
  product1: products["product1"].price,
  product2: products["product2"].price,
  product3: products["product3"].price,
  product4: products["product4"].price,
};

export const setupWebSocketServer = (server: HttpServer) => {
  const wss = new WebSocketServer({ server });

  const updatePriceForProduct = (productId: string) => {
    const product = products[productId];
    const newPrice =
      product.price +
      (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
    product.price = Math.max(newPrice, 0);

    if (product.price !== lastKnownPrices[productId]) {
      const newGUID = generateGUID();
      product.currentGUID = newGUID;

      const priceUpdate = {
        type: "PriceUpdate",
        productId,
        price: product.price,
        guid: newGUID,
      };

      wss.clients.forEach((client) => {
        if (
          client instanceof WebSocket &&
          client.readyState === WebSocket.OPEN
        ) {
          client.send(JSON.stringify(priceUpdate));
        }
      });

      lastKnownPrices[productId] = product.price;
    }

    setTimeout(() => updatePriceForProduct(productId), product.changeFrequency);
  };

  for (const productId in products) {
    updatePriceForProduct(productId);
  }

  wss.on("connection", (ws: WebSocket) => {
    console.log("Client connected");

    ws.on("message", (message: string) => {
      const data = JSON.parse(message);

      switch (data.type) {
        case "GetPrice":
          const priceResponse = {
            type: "PriceResponse",
            productId: data.productId,
            price: products[data.productId]?.price || null,
            guid: products[data.productId]?.currentGUID || null,
          };
          ws.send(JSON.stringify(priceResponse));
          break;

        case "GetProducts":
          const productsResponse = {
            type: "ProductsResponse",
            products: Object.keys(products).map((productId) => ({
              productId,
              price: products[productId].price,
              guid: products[productId].currentGUID || generateGUID(),
            })),
          };
          ws.send(JSON.stringify(productsResponse));
          break;

        case "AcceptPrice":
          const newOrder: Order = {
            productId: data.productId,
            price: products[data.productId]?.price || 0,
            guid: data.guid,
            timestamp: new Date().toISOString(), // Capture the current time
          };
          orders.push(newOrder);
          console.log("New order created:", newOrder);

          const orderUpdate = {
            type: "OrderUpdate",
            orders,
          };
          wss.clients.forEach((client) => {
            if (
              client instanceof WebSocket &&
              client.readyState === WebSocket.OPEN
            ) {
              client.send(JSON.stringify(orderUpdate));
            }
          });
          break;

        case "GetOrders":
          // Sort orders in descending order by timestamp
          const sortedOrders = orders.sort((a, b) => {
            return (
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });

          const ordersResponse = {
            type: "OrdersResponse",
            orders: sortedOrders,
          };
          ws.send(JSON.stringify(ordersResponse));
          break;

        default:
          console.log("Unknown message type:", data.type);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });
};
