import objectConstants from '../constants/objectConstants';
import api from '../api';

const objectsList = () => async (dispatch) => {
  try {
    dispatch({ type: objectConstants.OBJECT_LIST_REQUEST });
    const { data } = await api.get('/objects');
    dispatch({ type: objectConstants.OBJECT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: objectConstants.OBJECT_LIST_FAIL, payload: error.response });
  }
}

export { objectsList };