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

export { objectListReducer };