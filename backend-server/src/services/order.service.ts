import { Order, orders } from "../datastore";

type OrderListener = (order: Order) => void;

class OrderService {
  private listeners = new Set<OrderListener>();

  addOrder(order: Order) {
    orders.push(order);
    this.listeners.forEach((listener) => listener(order));
  }

  onNewOrder(listener: OrderListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getAll() {
    return orders;
  }
}

export const orderService = new OrderService();
