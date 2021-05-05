export const fetchUserDataActionTypes = {
  FETCHING_USER_DATA: 'FETCHING_USER_DATA',
  FETCHING_USER_DATA_SUCCESS: 'FETCHING_USER_DATA_SUCCESS',
  FETCHING_USER_DATA_FAILED: 'FETCHING_USER_DATA_FAILED',
}

export const fetchingUserData = () => (dispatch) => {
  return dispatch({ type: fetchUserDataActionTypes.FETCHING_USER_DATA });
}

export const fetchingUserDataSuccess = (user) => (dispatch) => {
  return dispatch({
    type: fetchUserDataActionTypes.FETCHING_USER_DATA_SUCCESS,
    user: user,
  });
}

export const fetchingUserDataFailed = (error) => (dispatch) => {
  return dispatch({
    type: fetchUserDataActionTypes.FETCHING_USER_DATA_FAILED,
    error: error,
  });
}