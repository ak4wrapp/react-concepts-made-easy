export type Product = {
  price: number;
  changeFrequency: number;
  currentGUID: string | null;
  validTillTime: number | null;
  priceGenerateTime: number | null;
};

export type Order = {
  productId: string;
  price: number;
  guid: string;
  timestamp: string;
};

export const products: Record<string, Product> = {
  product1: {
    price: 100,
    changeFrequency: 3000,
    currentGUID: null,
    validTillTime: null,
    priceGenerateTime: null,
  },
  product2: {
    price: 200,
    changeFrequency: 4000,
    currentGUID: null,
    validTillTime: null,
    priceGenerateTime: null,
  },
  product5: {
    price: 500,
    changeFrequency: 5000,
    currentGUID: null,
    validTillTime: null,
    priceGenerateTime: null,
  },
};

export const lastKnownPrices: Record<
  string,
  { price: number; validTillTime: number | null; priceGenerateTime: number }
> = {};

export const orders: Order[] = [];
