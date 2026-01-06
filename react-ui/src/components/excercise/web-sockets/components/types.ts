export interface ProductProps {
  productId: string;
  price: number;
  guid: string;
  onAcceptPrice: (productId: string, price: number, guid: string) => void;
  reconnecting: boolean;
  acceptPriceStatus: "success" | "error" | "none"; // Unified status for price acceptance
  onResetPriceStatus: () => void; // Reset price status after completion
}
