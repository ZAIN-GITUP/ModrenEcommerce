import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/app/src/types/cart'; // Adjust the path as necessary

// Define the type for the state
type CartState = CartItem[];

// Define the initial state
const initialState: CartState = [];

// Create the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CartItem>) => {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; change: number }>) => {
            const { id, change } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    return state.filter(item => item.id !== id);
                }
            }
        },
        clearCart: () => [],
    }
});

export const { add, remove, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
