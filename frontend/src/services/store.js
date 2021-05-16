import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { tableDependenciesReducer, tablesInfoReducer } from './reducers/tableReducers';
import { editConnectionReducer, getConnectionsReducer, newConnectionReducer, setConnectionReducer } from './reducers/userReducer';
import { objectListReducer, operationResultReducer, selectedObjectReducer, userDependenciesReducer } from './reducers/objectReducers';

const selectedConn = Cookie.getJSON("selectedConnection") || {};
const initialState = { selectedConnection: { selectedConn } };

const reducer = combineReducers({
  tableDependencies: tableDependenciesReducer,
  tablesInfo: tablesInfoReducer,
  newConnection: newConnectionReducer,
  objectsList: objectListReducer,
  dataBases: getConnectionsReducer,
  userDependencies: userDependenciesReducer,
  selectedConnection: setConnectionReducer,
  editedConnection: editConnectionReducer,
  selectedObject: selectedObjectReducer,
  operationResult: operationResultReducer
});

const conposeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, conposeEnhancer(applyMiddleware(thunk)));

export default store;