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

const unSelectObject = () => async (dispatch) => {
  await dispatch({ type: objectConstants.SELECT_OBJECT_SUCCESS, payload: {} });
}

export { getObjectsList, getUserDependencies, selectObject, unSelectObject };