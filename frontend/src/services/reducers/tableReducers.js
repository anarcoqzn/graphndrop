import tableConstants from '../constants/tableConstants';

function tableDependenciesReducer(state = {tableDependencies:[]}, action) {
  switch ( action.type ) {
    case tableConstants.TABLE_DEPENDENCIES_REQUEST:
      return { loading: true };
    case tableConstants.TABLE_DEPENDENCIES_SUCCESS:
      return { loading: false, tableDependencies: action.payload };
    case tableConstants.TABLE_DEPENDENCIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function tablesInfoReducer(state = { tablesInfo: [] }, action) {
  switch (action.type) {
    case tableConstants.TABLE_LIST_REQUEST:
      return { loading: true };
    case tableConstants.TABLE_LIST_SUCCESS:
      return { loading: false, tablesInfo: action.payload };
    case tableConstants.TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;  
  }
}

export { tableDependenciesReducer, tablesInfoReducer }