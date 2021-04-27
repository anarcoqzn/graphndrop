import userConstants from '../constants/userConstants';
import api from '../api'

const newConnection = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.NEW_CONNECTION_REQUEST, payload: data });
    const response = await api.post('/newConnection', data);
    dispatch({ type: userConstants.NEW_CONNECTION_SUCCESS, payload: response.data });
  }catch (error) {
    dispatch({ type: userConstants.NEW_CONNECTION_FAIL, payload: error.response });
  }
}

export { newConnection };