import userConstants from '../constants/userConstants';
import api from '../api'
import Cookie from 'js-cookie';

const newConnection = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.NEW_CONNECTION_REQUEST, payload: data });
    const response = await api.post('/newConnection', data);
    dispatch({ type: userConstants.NEW_CONNECTION_SUCCESS, payload: response.data });
  }catch (error) {
    dispatch({ type: userConstants.NEW_CONNECTION_FAIL, payload: error.response });
  }
}

const getConnections = () => async (dispatch) => {
  try {
    dispatch({ type: userConstants.ALL_CONNECTION_REQUEST });
    const { data } = await api.get('/connections');
    dispatch({ type: userConstants.ALL_CONNECTION_SUCCESS, payload: data });
    Cookie.set('connections', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: userConstants.ALL_CONNECTION_FAIL, payload: error.response });
  }
}

const setConnection = (connID) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.SET_CONNECTION_REQUEST, payload: connID });
    const { data } = await api.patch('/connections', { id: connID });
    dispatch({ type: userConstants.SET_CONNECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: userConstants.SET_CONNECTION_FAIL, payload: error.response });
  }
}

export { newConnection, getConnections, setConnection };