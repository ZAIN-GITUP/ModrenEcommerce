// types.ts
export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface RootState {
    cart: CartItem[];
  }
  