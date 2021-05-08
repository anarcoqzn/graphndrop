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

export { objectListReducer, userDependenciesReducer };