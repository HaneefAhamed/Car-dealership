import { combineReducers } from 'redux';
import products from './productsReducer';
import user from './userReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
	products,
	user,
	cart
});

export default rootReducer;