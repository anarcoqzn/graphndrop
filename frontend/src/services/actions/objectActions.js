import objectConstants from '../constants/objectConstants';
import api from '../api';

const getObjectsList = () => async (dispatch) => {
  try {
    dispatch({ type: objectConstants.OBJECT_LIST_REQUEST });
    const { data } = await api.get('/objects');
    dispatch({ type: objectConstants.OBJECT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: objectConstants.OBJECT_LIST_FAIL, payload: error.response });
  }
}

const getUserDependencies = () => async (dispatch) => {
  try {
    dispatch({ type: objectConstants.USER_DEPENDENCIES_REQUEST });
    const { data } = await api.get('/userDependencies');
    dispatch({ type: objectConstants.USER_DEPENDENCIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: objectConstants.USER_DEPENDENCIES_FAIL, payload: error.response });
  }
}

const selectObject = (obj) => async (dispatch) => {
  await dispatch({ type: objectConstants.SELECT_OBJECT_SUCCESS, payload: obj });
}

const cleanSelectObject = () => async (dispatch) => {
  await dispatch({ type: objectConstants.SELECT_OBJECT_SUCCESS, payload: {} });
}

const setOperationResult = (obj) => async (dispatch) => {
  await dispatch({ type: objectConstants.OPERATION_RESULT_SUCCESS, payload: obj });
}

const cleanOperationResult = () => async (dispatch) => {
  await dispatch({ type: objectConstants.OPERATION_RESULT_SUCCESS, payload: {} });
}

const setGraphData = (data) => async (dispatch) => {
  try {
    await dispatch({ type: objectConstants.SET_GRAPH_DATA_REQUEST });
    await dispatch({ type: objectConstants.SET_GRAPH_DATA_SUCCESS, payload: data });
  } catch (error) {
    await dispatch({ type: objectConstants.SET_GRAPH_DATA_FAIL, payload: error });
  }
}

export { getObjectsList, getUserDependencies, selectObject, cleanSelectObject, setOperationResult, cleanOperationResult, setGraphData };