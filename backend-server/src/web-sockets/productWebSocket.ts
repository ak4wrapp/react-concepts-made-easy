import { WebSocket } from "ws";
import { products, lastKnownPrices, Order, orders } from "../datastore";
import { v4 } from "uuid";

const productClients: WebSocket[] = [];

// Function to update product prices
const updatePriceForProduct = (productId: string) => {
  const product = products[productId];

  // Calculate price change, positive or negative
  const priceChange =
    (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
  let newPrice = Math.max(product.price + priceChange, 0);

  // Ensure price is always greater than 0
  if (newPrice <= 0) {
    newPrice = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  }

  if (newPrice !== lastKnownPrices[productId]) {
    product.price = newPrice;
    const newGUID = v4();
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
          acceptPrice(ws, data);
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
        guid: currentGUID || v4(),
      })
    ),
  };
  ws.send(JSON.stringify(productsResponse));
};

// Accept price and create a new order
const acceptPrice = (ws: WebSocket, data: any) => {
  const { productId, guid } = data;

  // Check if the productId and guid are provided, and if the product exists
  if (!productId || !guid || !products[productId]) {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: "Invalid productId or guid, or product not found.",
    };
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, as we cannot proceed without valid product data
  }

  // Check for product5 and return error if it's the product in question
  if (productId === "product5") {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: "Product is not configured to create an order.",
    };
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, don't process the order
  }

  // Create a new order if all conditions are valid
  const newOrder: Order = {
    productId,
    price: products[productId].price,
    guid,
    timestamp: new Date().toISOString(),
  };

  // Push the new order into the orders array
  orders.push(newOrder);

  console.log("New order created:", newOrder);

  // Send a success response with the order details
  const successResponse = {
    type: "AcceptPriceResponse",
    status: "Success",
    message: "Order successfully created.",
    order: newOrder, // Include the newly created order in the response
  };
  ws.send(JSON.stringify(successResponse)); // Send success response
};

export { handleProductConnection };
