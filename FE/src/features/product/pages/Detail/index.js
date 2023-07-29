import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom"
import { addToCart } from '../../../cart/cartSlice';
import { fetchProductById } from '../../productSlice';

const DetailPage = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm();
    const history = useHistory()
    const product = useSelector(state => state.product.current);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [id]);

    const onSubmit = (data) => {
        const newData = {
            ...product,
            quantity: +data.quantity
        };
        dispatch(addToCart(newData));
        // history.push('/cart');
    }
    return (
        <div>
            {product.name}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="number" {...register('quantity')} />
                <button>Add To cart</button>
            </form>
        </div>
    )
}

export default DetailPage
