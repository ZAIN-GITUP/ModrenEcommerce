import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/app/src/types/cart';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    remove(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; change: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const newQuantity = item.quantity + action.payload.change;
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { add, remove, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
