import { v4 as uuid } from "uuid";
import { products, lastKnownPrices, Product } from "../datastore";
import { orderService } from "./order.service";

type PriceListener = (data: any) => void;

class ProductService {
  private listeners = new Set<PriceListener>();

  start() {
    Object.keys(products).forEach((id) => this.schedulePriceUpdate(id));
  }

  onPriceUpdate(listener: PriceListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(data: any) {
    this.listeners.forEach((listener) => listener(data));
  }

  private schedulePriceUpdate(productId: string) {
    const product = products[productId];

    const update = () => {
      const change =
        (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
      const newPrice = Math.max(product.price + change, 10);
      const now = Date.now();

      const guid = uuid();
      product.price = newPrice;
      product.currentGUID = guid;
      product.priceGenerateTime = now;
      product.validTillTime = null;

      lastKnownPrices[productId] = {
        price: newPrice,
        validTillTime: null,
        priceGenerateTime: now,
      };

      this.notify({
        type: "PriceUpdate",
        productId,
        price: newPrice,
        guid,
      });

      setTimeout(update, product.changeFrequency);
    };

    update();
  }

  getProducts() {
    return Object.entries(products).map(([id, p]) => ({
      productId: id,
      price: p.price,
      guid: p.currentGUID,
      validTillTime: p.validTillTime,
      priceGenerateTime: p.priceGenerateTime,
    }));
  }

  acceptPrice(productId: string, guid: string) {
    const product = products[productId];
    if (!product || product.currentGUID !== guid) {
      throw new Error("Invalid product or guid");
    }

    if (productId === "product5") {
      throw new Error("product5 cannot create orders");
    }

    const order = {
      productId,
      price: product.price,
      guid,
      timestamp: new Date().toISOString(),
    };

    orderService.addOrder(order);
    return order;
  }
}

export const productService = new ProductService();
