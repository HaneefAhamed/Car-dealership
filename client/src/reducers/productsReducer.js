import {
	UPDATE_PRICE_SORT,
	UPDATE_QUERY,
	UPDATE_PRODUCTS,
	UPDATE_QUERY_PARAMS,
	FAILED_TO_UPDATE_PRODUCTS,
	UPDATE_OFFSET,
	UPDATE_COUNT,
	UPDATE_LIMIT,
	FAILED_TO_UPDATE_PRODUCT_DETAILS,
	UPDATE_PRODUCT_DETAILS,
	UPDATE_CATEGORY_ID,
	UPDATE_CATEGORIES,
	FAILED_TO_UPDATE_CATEGORIES,
	UPDATE_RELATED_CATEGORIES,
	FAILED_TO_UPDATE_RELATED_CATEGORIES
} from '../actions/types';

const initialState = {
	priceSort: 'ASC',
	query: '',
	products: [],
	offset: 0,
	limit: 12,
	count: 0,
	productDetails: {},
	categoryId: null,
	categories: [],
	relatedCategories: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_PRODUCT_DETAILS:
			return { ...state, productDetails: action.productDetails };
		case FAILED_TO_UPDATE_PRODUCT_DETAILS:
			return { ...state, productDetails: {} };
		case UPDATE_PRODUCTS:
			return { ...state, products: action.products };
		case UPDATE_PRICE_SORT:
			return { ...state, priceSort: action.priceSort };
		case UPDATE_QUERY_PARAMS:
			return { ...state, queryParams: action.queryParams };
		case UPDATE_QUERY:
			return { ...state, query: action.query };
		case FAILED_TO_UPDATE_PRODUCTS:
			return { ...state, products: [] };
		case UPDATE_OFFSET:
			return { ...state, offset: action.offset };
		case UPDATE_COUNT:
			return { ...state, count: action.count };
		case UPDATE_LIMIT:
			return { ...state, limit: action.limit };
		case UPDATE_CATEGORY_ID:
			return { ...state, categoryId: action.categoryId };
		case UPDATE_CATEGORIES:
			return { ...state, categories: action.categories };
		case FAILED_TO_UPDATE_CATEGORIES:
			return { ...state, categories: [] };
		case UPDATE_RELATED_CATEGORIES:
			return { ...state, relatedCategories: action.relatedCategories };
		case FAILED_TO_UPDATE_RELATED_CATEGORIES:
			return { ...state, relatedCategories: [] };
		default:
      return state;
	}
};