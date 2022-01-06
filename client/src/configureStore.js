/**
 * Store is a redux store that contains the state of the application.
 */
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

/**
 * Store
 */
const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(ReduxThunk),
);

export default store;