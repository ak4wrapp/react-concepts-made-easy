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
  validTillTime?: number | null; // validTillTime is nullable, defaults to null
  priceGenerateTime: number; // time when the price was generated/last updated
}

export const orders: Order[] = [];
export const products: Record<string, Product> = {
  product1: {
    price: 100,
    changeFrequency: 4000,
    priceGenerateTime: Date.now(),
  },
  product2: {
    price: 200,
    changeFrequency: 3000,
    priceGenerateTime: Date.now(),
  },
  product3: {
    price: 310,
    changeFrequency: 5000,
    priceGenerateTime: Date.now(),
  },
  product4: {
    price: 854,
    changeFrequency: 2500,
    priceGenerateTime: Date.now(),
  },
  product5: {
    price: 434,
    changeFrequency: 1500,
    priceGenerateTime: Date.now(),
  },
  product6: {
    price: 719,
    changeFrequency: 3500,
    priceGenerateTime: Date.now(),
  },
};

export const lastKnownPrices: Record<
  string,
  { price: number; validTillTime: number | null; priceGenerateTime: number }
> = {
  product1: {
    price: products["product1"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
  product2: {
    price: products["product2"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
  product3: {
    price: products["product3"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
  product4: {
    price: products["product4"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
  product5: {
    price: products["product5"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
  product6: {
    price: products["product6"].price,
    validTillTime: null,
    priceGenerateTime: Date.now(),
  },
};
