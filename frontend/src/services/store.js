import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import Cookie from 'js-cookie';
import { tableDependenciesReducer, tablesInfoReducer } from './reducers/tableReducers';
import { newConnectionReducer } from './reducers/userReducer';

// const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {  };
const reducer = combineReducers({
  tableDependencies: tableDependenciesReducer,
  tablesInfo: tablesInfoReducer,
  newConnection: newConnectionReducer,
});

const conposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, conposeEnhancer(applyMiddleware(thunk)));

export default store;