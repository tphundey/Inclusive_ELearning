import { createSelector } from "reselect";

const cartItems = state => state.cart.items;

export const cartPrice = createSelector(cartItems, items => items.reduce((total, item) => {
    return total + (+item.price * item.quantity) // convert item.price to number
}, 0));