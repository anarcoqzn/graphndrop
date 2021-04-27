import userConstants from '../constants/userConstants';

function newConnectionReducer(state = { newConnection: {} }, action){
  switch ( action.type ) {
    case userConstants.NEW_CONNECTION_REQUEST:
      return { loading: true };
    case userConstants.NEW_CONNECTION_SUCCESS:
      return { loading: false, newConnection: action.payload };
    case userConstants.NEW_CONNECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { newConnectionReducer };