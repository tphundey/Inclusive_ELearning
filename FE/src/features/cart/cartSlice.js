import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart(state, action) {
            const newProduct = action.payload;
            const existProduct = state.items.find(item => item.id === newProduct.id);
            if (!existProduct) {
                state.items.push(newProduct);
            } else {
                existProduct.quantity += newProduct.quantity
            }
        },
        increaseCart(state, action) {
            state.items.find(item => item.id === action.payload).quantity++;
        },
        decreaseCart(state, action) {
            const items = state.items.find(item => item.id === action.payload);
            items.quantity--;
            if (items.quantity < 1) {
                state.items = state.items.filter(item => item.id !== items.id);
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
        }
    }
});

export const { addToCart, increaseCart, decreaseCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer