import tableConstants from '../constants/tableConstants';
import api from '../api';

const getDependencies = () => async (dispatch) => {
  try {
    dispatch({ type: tableConstants.TABLE_DEPENDENCIES_REQUEST });
    const { data } = await api.get('/table/dependencies');
    dispatch({type: tableConstants.TABLE_DEPENDENCIES_SUCCESS, payload: data})
  } catch (error) {
    dispatch({ type: tableConstants.TABLE_DEPENDENCIES_FAIL, payload: error.response });
  }
}

const getTables = () => async (dispatch) => {
  try {
    dispatch({ type: tableConstants.TABLE_LIST_REQUEST });
    const { data } = await api.get('/table');
    dispatch({ type: tableConstants.TABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: tableConstants.TABLE_LIST_FAIL, payload: error.response });
  }
}
export { getDependencies, getTables };