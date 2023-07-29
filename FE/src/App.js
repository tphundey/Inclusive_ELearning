import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SignIn from './features/auth/pages/SignIn';
import SignUp from './features/auth/pages/SignUp';
import CartPage from './features/cart';

// Lazy load - Code splitting
const Product = React.lazy(() => import('./features/product'));

function App() {
  return (
    <div className="container">
      <Header />
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect from="/" to="/product" exact />
            <Route path="/product" component={Product} />
            <Route path="/cart" component={CartPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
