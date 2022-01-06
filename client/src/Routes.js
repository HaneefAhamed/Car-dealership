import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AuthEntry from './pages/AuthEntry';
import Checkout from './pages/Checkout';
import PurchaseSummary from './pages/PurchaseSummary';
import PurchaseHistory from './pages/PurchaseHistory';

export const Routes = () => (
	<Switch>
		<Route exact path='/home' component={Home} />
		<Route exact path="/" render={() => <Redirect to="/home" />} />
		<Route exact path='/login' component={AuthEntry} />
		<Route exact path='/products/id/:productId' component={ProductDetails} />
		<Route exact path='/checkout' component={Checkout} />
		<Route exact path='/purchase-summary' component={PurchaseSummary}/>
		<Route exact path='/history' component={PurchaseHistory} />				
		<Redirect to="/" />
	</Switch>
);

export default withRouter(Routes);