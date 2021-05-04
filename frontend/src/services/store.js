import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { tableDependenciesReducer, tablesInfoReducer } from './reducers/tableReducers';
import { getConnectionsReducer, newConnectionReducer } from './reducers/userReducer';
import { objectListReducer } from './reducers/objectReducers';

const userInfo = Cookie.getJSON("userInfo") || null;
const connections = Cookie.getJSON("connections") || [];
const initialState = { dataBases: { connections }, userLogin: { userInfo } };

const reducer = combineReducers({
  tableDependencies: tableDependenciesReducer,
  tablesInfo: tablesInfoReducer,
  newConnection: newConnectionReducer,
  objectsList: objectListReducer,
  dataBases: getConnectionsReducer
});

const conposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, conposeEnhancer(applyMiddleware(thunk)));

export default store;