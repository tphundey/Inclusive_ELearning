import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailPage from './pages/Detail';
import MainPage from './pages/Main';
export default function Product() {
    const { url } = useRouteMatch();
    return <div>
        <Switch>
            <Route exact path={url} component={MainPage} />
            <Route path={`${url}/:id`} component={DetailPage}></Route>
        </Switch>
    </div>
}