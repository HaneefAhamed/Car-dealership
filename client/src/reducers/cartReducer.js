import {
	ADD_ITEM_TO_CART,
	// FAILED_TO_COMPLETE_PURCHASE,
	COMPLETED_TRANSACTION,
	UPDATE_PURCHASE_HISTORY,
	UPDATE_PURCHASE_TRENDS,
	EMPTY_CART
} from '../actions/types';

const initialState = {
	items: [],
	error: '',
	purchaseId: null,
	purchaseHistory: [],
	purchaseTrends: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case EMPTY_CART:
			return {...state, items: [] };
		case UPDATE_PURCHASE_TRENDS:
			return { ...state, purchaseTrends: action.purchaseTrends };
		case UPDATE_PURCHASE_HISTORY:
			return { ...state, purchaseHistory: action.purchaseHistory };
		case COMPLETED_TRANSACTION:
			return { ...state, purchaseId: action.purchaseId };
		case ADD_ITEM_TO_CART:
			if (!(state.items.find(item => action.item.product_id === item.product_id))) {
				console.log(state.items.length + 1)
				return { ...state, items: [...state.items, action.item ] };
			} else {
				return state;
			}
		default:
      return state;
	}
};