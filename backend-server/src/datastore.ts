// datastore.ts
export interface Order {
  productId: string;
  price: number;
  guid: string;
  timestamp: string;
}

export interface Product {
  price: number;
  changeFrequency: number;
  currentGUID?: string;
}

export const orders: Order[] = [];
export const products: Record<string, Product> = {
  product1: { price: 100, changeFrequency: 2000 },
  product2: { price: 200, changeFrequency: 1000 },
  product3: { price: 310, changeFrequency: 5000 },
  product4: { price: 854, changeFrequency: 3000 },
  product5: { price: 434, changeFrequency: 500 },
  product6: { price: 79, changeFrequency: 1500 },
};

export const lastKnownPrices: Record<string, number> = {
  product1: products["product1"].price,
  product2: products["product2"].price,
  product3: products["product3"].price,
  product4: products["product4"].price,
  product5: products["product5"].price,
  product6: products["product6"].price,
};
