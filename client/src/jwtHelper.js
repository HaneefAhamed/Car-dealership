import decode from 'jwt-decode';
import axios from 'axios';

export function getTokenExpirationDate(token) {
  const decoded = decode(token);
  if (!decoded.exp) {
    return null;
  }

  const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp);
  return date;
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false;
  }
  return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
}

export const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-access-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}
};

// decodes the token and returns it
export const decodeToken = (token) => decode(token);
