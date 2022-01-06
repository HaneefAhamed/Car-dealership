import axios from 'axios';
import { setAuthToken, decodeToken } from '../jwtHelper';

import {
	CREATE_NEW_USER,
	FAILED_TO_CREATE_USER,
	CLEAR_USER_ERRORS,
	FAILED_TO_AUTHENTICATE,
	UPDATE_TOKEN,
	SET_CURRENT_USER,
	CLEAR_CURRENT_USER
} from './types';

export const createUser = (user) => dispatch => {
	axios.post('/api/users', user).then((response) => {
		const newUser = response && response.data;
		dispatch({ type: CREATE_NEW_USER, newUser });
	}).catch(error => {
		dispatch({ type: FAILED_TO_CREATE_USER, error: error && error.response && error.response.data || 'Unable to make user' });
	});
};

export const clearUserErrors = () => dispatch => {
	dispatch({ type: CLEAR_USER_ERRORS });
};

export const login = (credentials) => dispatch => {
	axios.post('/api/users/authenticate', credentials).then(response => {
		const token = response && response.data && response.data;
		localStorage.setItem('token', token);
		dispatch(updateToken(token));
		const decoded = decodeToken(token);
		dispatch(setCurrentUser(decoded));
	}).catch(error => {
		console.log(error)
		dispatch({ type: FAILED_TO_AUTHENTICATE, error: error && error.response && error.response.data || 'Unable to authenticate.' })
	});
};

export const logout = () => dispatch => {
	// window.location.href = '/login';
	localStorage.removeItem('token');
	dispatch({ type: UPDATE_TOKEN, token: null });
	dispatch(clearCurrentUser());
	setAuthToken(false);
	window.location.reload();
};

export const clearCurrentUser = () => dispatch => {
	dispatch({ type: CLEAR_CURRENT_USER })
};

export const updateToken = (token) => dispatch => {
	dispatch({ type: UPDATE_TOKEN, token });
};

export const setCurrentUser = (decoded) => dispatch => {
	dispatch({
		type: SET_CURRENT_USER,
		decoded
	});
};