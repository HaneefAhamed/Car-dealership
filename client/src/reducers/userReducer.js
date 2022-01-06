import {
	FAILED_TO_CREATE_USER,
	CREATE_NEW_USER,
	CLEAR_USER_ERRORS,
	UPDATE_TOKEN,
	FAILED_TO_AUTHENTICATE,
	SET_CURRENT_USER,
	CLEAR_CURRENT_USER
} from '../actions/types';

const initialState = {
	newUser: null,
	error: null,
	token: null,
	currentUser: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...state, currentUser: action.decoded };
		case CLEAR_CURRENT_USER:
			return { ...state, currentUser: null };
		case UPDATE_TOKEN:
			return { ...state, token: action.token };
		case FAILED_TO_AUTHENTICATE:
			return { ...state, error: action.error };
		case CLEAR_USER_ERRORS:
			return { ...state, error: null };
		case FAILED_TO_CREATE_USER:
			return { ...state, error: action.error };
		case CREATE_NEW_USER:
			return { ...state, newUser: action.newUser, error: null };
		default:
      return state;
	}
};