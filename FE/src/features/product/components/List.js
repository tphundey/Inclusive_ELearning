import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../productSlice";
import Item from "./Item";
const List = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.items);
    useEffect(() => {
        dispatch(fetchProduct())
            .unwrap()
            .then(value => console.log(value))
            .catch(error => console.log(error))
    }, [])
    return (
        <div className="row">
            {products && products.map((product, index) => (
                <div className="col-3">
                    <Item key={index} product={product} />
                </div>
            ))}
        </div>
    )
}

export default List
