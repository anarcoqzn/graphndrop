import userConstants from '../constants/userConstants';
import api from '../api'
import Cookies from 'js-cookie';

const newConnection = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.NEW_CONNECTION_REQUEST, payload: data });
    const response = await api.post('/connections', data);
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
  } catch (error) {
    dispatch({ type: userConstants.ALL_CONNECTION_FAIL, payload: error.response });
  }
}

const setConnection = (conn) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.SET_CONNECTION_REQUEST, payload: conn });
    Cookies.set("selectedConnection", JSON.stringify(conn));
    const { data } = await api.patch('/connections', { id: conn.id });
    dispatch({ type: userConstants.SET_CONNECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: userConstants.SET_CONNECTION_FAIL, payload: error.response });
  }
}

const deleteConnection = (connID) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.DELETE_CONNECTION_SUCCESS, payload: connID });
    const { data } = await api.delete('/connections/' + connID);
    dispatch({ type: userConstants.DELETE_CONNECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: userConstants.DELETE_CONNECTION_FAIL, payload: error.response });
  }
}

const editConnection = (connID, data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.EDIT_CONNECTION_REQUEST, payload: connID });
    const response = await api.put(`/connections/${connID}`, data);
    dispatch({ type: userConstants.EDIT_CONNECTION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: userConstants.EDIT_CONNECTION_FAIL, payload: error.response });
  }
}

export { newConnection, getConnections, setConnection, deleteConnection, editConnection };