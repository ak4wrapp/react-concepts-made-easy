export type ProductClientMessage =
  | { type: "GetProducts" }
  | { type: "AcceptPrice"; productId: string; guid: string };

export type OrderClientMessage = { type: "GetOrders" };
