import { Link } from "react-router-dom";

const Item = ({ product }) => {
    return (
        <div>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
        </div>
    )
}

export default Item
