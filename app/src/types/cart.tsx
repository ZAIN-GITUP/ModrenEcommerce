// types/cart.ts
export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type RootState = {
  cart: CartState;
};
