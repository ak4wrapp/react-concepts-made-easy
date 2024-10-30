// types.ts

export interface Order {
  productId: string;
  price: number;
  guid: string; // Added GUID to the Order interface
}

export interface Product {
  price: number;
  changeFrequency: number; // Frequency in milliseconds
  currentGUID?: string; // Store the current GUID for the price
}
