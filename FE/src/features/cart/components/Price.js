import React from 'react'
import { useSelector } from 'react-redux'
import { cartPrice } from '../selector'

const CartPrice = () => {
    const totalPrice = useSelector(cartPrice);
    return (
        <div>
            {totalPrice}
        </div>
    )
}

export default CartPrice
