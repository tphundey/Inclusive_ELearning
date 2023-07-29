import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseCart, increaseCart, removeItemFromCart } from '../cartSlice';
import CartPrice from '../components/Price';

const CartPage = () => {
    const product = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    return (
        <div>
            <ul>
                {product.map((item, index) => {
                    return <li key={index}>
                        {item.name}
                        <button onClick={() => dispatch(decreaseCart(item.id))}>-</button>
                        <button onClick={() => dispatch(increaseCart(item.id))}>+</button>
                        <button onClick={() => dispatch(removeItemFromCart(item.id))}>x</button>
                    </li>
                })}
            </ul>
            <CartPrice />
        </div>
    )
}

export default CartPage
