import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import 'isomorphic-unfetch';

const initialState = {
	search: '',
	isFetching: false,
	results: {},
	product: {}
}

export const actionTypes = {
	SEARCH_REQUEST: 'SEARCH_REQUEST',
	SEARCH_RECEIVE: 'SEARCH_RECEIVE',
	PRODUCT_REQUEST: 'PRODUCT_REQUEST',
	PRODUCT_RECEIVE: 'PRODUCT_RECEIVE'
}

// REDUCERS
export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SEARCH_REQUEST:
			return {...state, search: action.query, isFetching: true}
		case actionTypes.SEARCH_RECEIVE:
			return {...state, isFetching: false, results: action.results}
		case actionTypes.PRODUCT_REQUEST:
			return {...state, isFetching: true}
		case actionTypes.PRODUCT_RECEIVE:
			return {...state, isFetching: false, product: action.product}
		default: return state
	}
}

export const fetchResults = (query) => async dispatch => {
	dispatch({ type: actionTypes.SEARCH_REQUEST, query });
	let response = await fetch('http://localhost:8080/api/items?q='+query);
	await dispatch(receiveResults(response));
}

export const receiveResults = (response) => async (dispatch, getState) => {
	let results = await response.json();
	let { search } = getState();
	await dispatch({ type: actionTypes.SEARCH_RECEIVE, results });
}

export const fetchProduct = (pid) => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_REQUEST, pid });
	let response = await fetch('http://localhost:8080/api/items/'+pid);
	dispatch(receiveProduct(response));
}

export const receiveProduct = (response) => async dispatch => {
	let product = await response.json();
	dispatch({ type: actionTypes.PRODUCT_RECEIVE, product });
}

export function initializeStore (initialState = initialState) {
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}