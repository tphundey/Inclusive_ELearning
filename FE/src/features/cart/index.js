import { Route, Switch, useRouteMatch } from "react-router-dom";
import CartPage from "./pages/Cart";

const Cart = () => {
    const { url } = useRouteMatch();
    return <div>
        <Switch>
            <Route exact path={url} component={CartPage} />
        </Switch>
    </div>
}

export default Cart
