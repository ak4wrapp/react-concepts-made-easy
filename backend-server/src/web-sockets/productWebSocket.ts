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

  if (newPrice !== lastKnownPrices[productId].price) {
    const now = Date.now();

    // Expire the old price if it's not the first price update (validTillTime is not null)
    if (
      product.currentGUID &&
      lastKnownPrices[productId].validTillTime !== null
    ) {
      lastKnownPrices[productId].validTillTime = now + 1000; // expire old price after 1 second
      console.log(`Price for ${productId} expired at ${now + 1000}`);
    }

    // Set the new price and GUID
    product.price = newPrice;
    const newGUID = v4();
    product.currentGUID = newGUID;
    product.validTillTime = null; // validTillTime is reset to null as the new price is active
    product.priceGenerateTime = now; // update the time when the price was generated

    // console.log(
    //   `Updated price for ${productId}: ${newPrice}, GUID: ${newGUID}`
    // );

    // Notify only product clients
    const priceUpdate = {
      type: "PriceUpdate",
      productId,
      price: product.price,
      guid: newGUID,
    };

    productClients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        console.info(
          `Sending price update to client: ${JSON.stringify(priceUpdate)}`
        );
        client.send(JSON.stringify(priceUpdate));
      }
    });

    lastKnownPrices[productId] = {
      price: newPrice,
      validTillTime: null,
      priceGenerateTime: now,
    };
  }

  setTimeout(() => updatePriceForProduct(productId), product.changeFrequency);
};

// Start price updates for all products
Object.keys(products).forEach(updatePriceForProduct);

// Handle incoming product connections
const handleProductConnection = (ws: WebSocket) => {
  productClients.push(ws);
  console.log(`New client connected. Total clients: ${productClients.length}`);

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
    console.log(`Client disconnected. Total clients: ${productClients.length}`);
  });
};

// Send product data to a client
const sendProducts = (ws: WebSocket) => {
  const productsResponse = {
    type: "ProductsResponse",
    products: Object.entries(products).map(
      ([
        productId,
        { price, currentGUID, validTillTime, priceGenerateTime },
      ]) => ({
        productId,
        price,
        guid: currentGUID || v4(),
        validTillTime,
        priceGenerateTime,
      })
    ),
  };
  console.log(
    `Sending product data to client: ${JSON.stringify(productsResponse)}`
  );
  ws.send(JSON.stringify(productsResponse));
};

// Accept price and create a new order
const acceptPrice = (ws: WebSocket, data: any) => {
  const { productId, guid } = data;
  console.log(
    `Received AcceptPrice request: productId=${productId}, guid=${guid}`
  );

  // Check if the productId and guid are provided, and if the product exists
  if (!productId || !guid || !products[productId]) {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: "Invalid productId or guid, or product not found.",
    };
    console.log(
      `Invalid product or guid: productId=${productId}, guid=${guid}`
    );
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, as we cannot proceed without valid product data
  }

  // Retrieve the latest price information for the given productId
  const product = products[productId];
  const priceInfo = lastKnownPrices[productId];

  // Ensure the guid matches the one that was last generated for this product
  if (product.currentGUID !== guid) {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: `Invalid guid for ${productId}. The provided guid does not match the latest price for this product.`,
    };
    console.log(
      `Invalid GUID for ${productId}: expected ${product.currentGUID}, got ${guid}`
    );
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, as the GUID is not valid for this product
  }

  // Check if the price has expired (validTillTime is set and expired)
  if (
    priceInfo.validTillTime !== null &&
    priceInfo.validTillTime < Date.now()
  ) {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: "The price for this product has expired.",
    };
    console.log(`Price expired for productId=${productId}, guid=${guid}`);
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, as the price is expired
  }

  // Custom Logic here to test error case
  // Check for product5 and return error if it's the product in question
  if (productId === "product5") {
    const errorResponse = {
      type: "AcceptPriceResponse",
      status: "Error",
      productId,
      guid,
      message: `${productId} is not configured to create an order.`,
    };

    console.log(`${productId} is not configured to create an order.`);
    ws.send(JSON.stringify(errorResponse)); // Send error response
    return; // Return early, as the price is expired
  }

  // The price from the client request is ignored. Instead, use the price from the lastKnownPrices associated with the guid
  const correctPrice = priceInfo.price; // Get the correct price from the backend (lastKnownPrices)

  // Create a new order using the correct price and guid
  const newOrder: Order = {
    productId,
    price: correctPrice, // Use the correct price (associated with the guid)
    guid,
    timestamp: new Date().toISOString(),
  };

  // Push the new order into the orders array
  orders.push(newOrder);
  console.log(`New order created: ${JSON.stringify(newOrder)}`);

  // Send a success response with the order details
  const successResponse = {
    type: "AcceptPriceResponse",
    status: "Success",
    message: "Order successfully created.",
    productId,
    guid,
    order: newOrder, // Include the newly created order in the response
  };
  ws.send(JSON.stringify(successResponse)); // Send success response
};

export { handleProductConnection };
