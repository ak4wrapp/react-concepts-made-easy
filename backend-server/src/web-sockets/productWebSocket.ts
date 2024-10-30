import { WebSocket } from "ws";
import { products, lastKnownPrices, Order, orders } from "../datastore";
import { generateGUID } from "../utils";

const productClients: WebSocket[] = [];

// Function to update product prices
const updatePriceForProduct = (productId: string) => {
  const product = products[productId];
  const priceChange =
    (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
  const newPrice = Math.max(product.price + priceChange, 0);

  if (newPrice !== lastKnownPrices[productId]) {
    product.price = newPrice;
    const newGUID = generateGUID();
    product.currentGUID = newGUID;

    const priceUpdate = {
      type: "PriceUpdate",
      productId,
      price: product.price,
      guid: newGUID,
    };

    // Notify only product clients
    productClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(priceUpdate));
      }
    });

    lastKnownPrices[productId] = newPrice;
  }

  setTimeout(() => updatePriceForProduct(productId), product.changeFrequency);
};

// Start price updates for all products
Object.keys(products).forEach(updatePriceForProduct);

// Handle incoming product connections
const handleProductConnection = (ws: WebSocket) => {
  productClients.push(ws);

  ws.on("message", (message: string) => {
    try {
      const data = JSON.parse(message);
      switch (data.type) {
        case "GetProducts":
          sendProducts(ws);
          break;
        case "AcceptPrice":
          acceptPrice(data);
          break;
        default:
          console.log("Unknown product message type:", data.type);
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });

  ws.on("close", () => {
    productClients.splice(productClients.indexOf(ws), 1);
  });
};

// Send product data to a client
const sendProducts = (ws: WebSocket) => {
  const productsResponse = {
    type: "ProductsResponse",
    products: Object.entries(products).map(
      ([productId, { price, currentGUID }]) => ({
        productId,
        price,
        guid: currentGUID || generateGUID(),
      })
    ),
  };
  ws.send(JSON.stringify(productsResponse));
};

// Accept price and create a new order
const acceptPrice = (data: any) => {
  const { productId, guid } = data;
  if (!productId || !guid || !products[productId]) return;

  const newOrder: Order = {
    productId,
    price: products[productId].price,
    guid,
    timestamp: new Date().toISOString(),
  };
  orders.push(newOrder);
  console.log("New order created:", newOrder);
  // No need to notify order clients here
};

export { handleProductConnection };
