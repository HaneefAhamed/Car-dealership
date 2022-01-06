import axios from 'axios';
import configureStore from '../configureStore';

import {
	UPDATE_PRICE_SORT,
	UPDATE_QUERY,
	UPDATE_PRODUCTS,
	FAILED_TO_UPDATE_PRODUCTS,
	UPDATE_COUNT,
	UPDATE_LIMIT,
	UPDATE_OFFSET,
	FAILED_TO_UPDATE_PRODUCT_DETAILS,
	UPDATE_PRODUCT_DETAILS,
	UPDATE_CATEGORY_ID,
	UPDATE_CATEGORIES,
	FAILED_TO_UPDATE_CATEGORIES,
	UPDATE_RELATED_CATEGORIES,
	FAILED_TO_UPDATE_RELATED_CATEGORIES
} from './types';

const store = configureStore;

export const getAllCategories = () => dispatch => {
	axios.get('/api/categories').then(response => {
		const data = response && response.data;
		dispatch({ type: UPDATE_CATEGORIES, categories: data });
	}).catch(err => {
		dispatch({ type: FAILED_TO_UPDATE_CATEGORIES });
	});
};

export const getCategoriesById = (id) => dispatch => {
	axios.get(`/api/categories/id/${id}`).then(response => {
		const data = response && response.data;
		dispatch({ type: UPDATE_RELATED_CATEGORIES, relatedCategories: data });
	}).catch(err => {
		dispatch({ type: FAILED_TO_UPDATE_RELATED_CATEGORIES });
	});
};

export function updatePriceSort(priceSort) {
	return { type: UPDATE_PRICE_SORT, priceSort }
}

export function updateQuery(query) {
	return { type: UPDATE_QUERY, query };
}

export const updateLimit = (limit) => dispatch => {
	dispatch({ type: UPDATE_LIMIT, limit });
};

export const updateCategoryId = (categoryId) => dispatch => {
	dispatch({ type: UPDATE_CATEGORY_ID, categoryId: categoryId ? parseInt(categoryId, 10) : '' });
};

export const updateOffset = (offset) => dispatch => {
	dispatch({ type: UPDATE_OFFSET, offset });
};

export const fetchAllProducts = () => dispatch => {

	let state = store.getState().products;

	axios.get('/api/products', {
		params: {
			limit: state.limit,
			offset: state.offset,
			price: state.priceSort,
			q: state.query,
			cat: state.categoryId
		}
	}).then(response => {
		const data = response && response.data;
		dispatch({ type: UPDATE_PRODUCTS, products: data.products });
		dispatch({ type: UPDATE_COUNT, count: data.count });
	}).catch(err => {
		console.log(err);
		dispatch({ type: FAILED_TO_UPDATE_PRODUCTS });
	});
}

export const getProductDetails = productId => dispatch => {

	axios.get(`/api/products/id/${productId}`).then(response => {
		const data = response && response.data && response.data[0];
		dispatch({ type: UPDATE_PRODUCT_DETAILS, productDetails: data });
	}).catch(err => {
		dispatch({ type: FAILED_TO_UPDATE_PRODUCT_DETAILS });
	});
};