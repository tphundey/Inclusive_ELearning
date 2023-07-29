import { useSelector } from "react-redux"

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    return (
        <div>
            {cartItems.length}
        </div>
    )
}

export default Header
