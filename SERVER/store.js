import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import 'isomorphic-unfetch';

const initialState = {
	view: '',
	search: '',
	isFetching: false,
	results: {},
	product: {}
}

export const actionTypes = {
	SET_VIEW: 'SHOW_VIEW',
	SET_SEARCH: 'SET_SEARCH',
	SEARCH_REQUEST: 'SEARCH_REQUEST',
	SEARCH_RECEIVE: 'SEARCH_RECEIVE',
	PRODUCT_REQUEST: 'PRODUCT_REQUEST',
	PRODUCT_RECEIVE: 'PRODUCT_RECEIVE',
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
		case actionTypes.SET_VIEW:
			return {...state, view: action.view }
		case actionTypes.SET_SEARCH:
			return {...state, search: action.search }
		default: return state
	}
}

export const setView = (view) => async dispatch => {
	dispatch({ type: actionTypes.SET_VIEW, view });
}

export const setSearch = (search) => async dispatch => {
	dispatch({ type: actionTypes.SET_SEARCH, search  })
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
	await dispatch({ type: actionTypes.SET_VIEW, view: 'results' });
}

export const fetchProduct = (pid) => async dispatch => {
	dispatch({ type: actionTypes.PRODUCT_REQUEST, pid });
	let response = await fetch('http://localhost:8080/api/items/'+pid);
	await dispatch(receiveProduct(response));
}

export const receiveProduct = (response) => async dispatch => {
	let product = await response.json();
	await dispatch({ type: actionTypes.PRODUCT_RECEIVE, product });
	await dispatch({ type: actionTypes.SET_VIEW, view: 'product' });
}

export function initializeStore (initialState = initialState) {
	return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}