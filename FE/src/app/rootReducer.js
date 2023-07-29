import { combineReducers } from "redux";
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';


const rootReducer = combineReducers({
    counter: counterReducer,
    product: productReducer,
    cart: cartReducer,
    auth: authReducer
});
export default rootReducer;