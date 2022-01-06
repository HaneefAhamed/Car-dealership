/**
 * This is a wrapper for the BrowserRouter that lets me access history
 * from non-React Components such as topics
 */
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

let history; // eslint-disable-line

// this is for unit testing
if (typeof document !== 'undefined') {
	history = createBrowserHistory();
}

export { history }; 

class CustomBrowserRouter extends BrowserRouter {
	history = history;
}

export default CustomBrowserRouter;
