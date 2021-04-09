import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON("userInfo") || {"name":"name"};
const initialState = { userLogin: { userInfo } };
const reducer = combineReducers({});

const conposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, conposeEnhancer(applyMiddleware(thunk)));

export default store;