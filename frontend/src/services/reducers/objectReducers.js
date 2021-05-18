import objectConstants from '../constants/objectConstants';

function objectListReducer(state = { objectsList: [] }, action) {
  switch (action.type) {
    case objectConstants.OBJECT_LIST_REQUEST:
      return { loading: true };
    case objectConstants.OBJECT_LIST_SUCCESS:
      return { loading: false, objectsList: action.payload };
    case objectConstants.OBJECT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function userDependenciesReducer(state = { userDependencies: [] }, action) {
  switch (action.type) {
    case objectConstants.USER_DEPENDENCIES_REQUEST:
      return { loading: true };
    case objectConstants.USER_DEPENDENCIES_SUCCESS:
      return { loading: false, userDependencies: action.payload };
    case objectConstants.USER_DEPENDENCIES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function selectedObjectReducer(state = { selectedObject: {} }, action) {
  switch (action.type) {
    case objectConstants.SELECT_OBJECT_REQUEST:
      return { loading: true };
    case objectConstants.SELECT_OBJECT_SUCCESS:
      return { loading: false, selectedObject: action.payload };
    case objectConstants.SELECT_OBJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function operationResultReducer(state = { operationResult: {} }, action) {
  switch (action.type) {
    case objectConstants.OPERATION_RESULT_REQUEST:
      return { loading: true };
    case objectConstants.OPERATION_RESULT_SUCCESS:
      return { loading: false, operationResult: action.payload };
    case objectConstants.OPERATION_RESULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function setGraphDataReducer(state = { graphData: [] }, action) {
  switch (action.type) {
    case objectConstants.SET_GRAPH_DATA_REQUEST:
      return { loading: true };
    
    case objectConstants.SET_GRAPH_DATA_SUCCESS:
      return { loading: false, graphData: action.payload };
    
    case objectConstants.SET_GRAPH_DATA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
}
export { objectListReducer, userDependenciesReducer, selectedObjectReducer, operationResultReducer, setGraphDataReducer };