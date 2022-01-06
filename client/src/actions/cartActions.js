import axios from 'axios';

import {
	ADD_ITEM_TO_CART,
	// FAILED_TO_ADD_TO_CART,
	FAILED_TO_COMPLETE_PURCHASE,
	COMPLETED_TRANSACTION,
	UPDATE_PURCHASE_HISTORY,
	EMPTY_CART,
	DELETED_FROM_ITEMS,
	UPDATE_PURCHASE_TRENDS
} from './types';

export const addToCart = item => (dispatch) => {

	// if token exists, use it
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.post('/api/cart', item).then(response => {
		console.log(response);
		dispatch(getItemsFromCart());
	}).catch(error => {
		console.log(error)
	});

};

export const getItemsFromCart = () => dispatch => {

	// if token exists, use it
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.get('/api/cart').then(response => {
		const items = response && response.data;
		
		// if (items.length < 1) {
			dispatch({ type: EMPTY_CART });
		// }

		for (let i=0;i<items.length;i++) {
			dispatch({
				type: ADD_ITEM_TO_CART,
				item: { ...items[i], quantity: 1}
			});
		}
	});
};

export const removeFromCart = id => dispatch => {
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.delete(`/api/cart/id/${id}`).then(result => {
		dispatch(getItemsFromCart());
		dispatch({ type: DELETED_FROM_ITEMS, id: result.data })
	}).catch(err => {
		console.log(err);
	});
};


export const completePurchase = (data) => (dispatch) => {

	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.post('/api/purchases', data).then(response => {
		console.log(response);
		dispatch(getItemsFromCart());
		dispatch({ type: COMPLETED_TRANSACTION, purchaseId: response.data });
	}).catch(err => {
		console.log(err);
		dispatch({ type: FAILED_TO_COMPLETE_PURCHASE, error: err });
	});
}

export const getPurchaseTrends = () => dispatch => {
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.get('/api/purchases/trends').then(response => {
		console.log(response.data)
		dispatch({
			type: UPDATE_PURCHASE_TRENDS,
			purchaseTrends: response && response.data
		});
	}).catch(err => {
		console.log(err);
	});
};

export const getPurchaseHistory = () => dispatch => {
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.get('/api/purchases').then(response => {
		dispatch({
			type: UPDATE_PURCHASE_HISTORY,
			purchaseHistory: response && response.data
		});
	}).catch(err => {
		console.log(err);
	});
};