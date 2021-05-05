export const loginActionTypes = {
  FETCHING_LOGIN_STATUS: 'FETCHING_LOGIN_STATUS',
  FETCHING_LOGIN_STATUS_COMPLETE: 'FETCHING_LOGIN_STATUS_COMPLETE',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT'
}

export const fetchingLoginStatus = () => (dispatch) => {
  return dispatch({ type: loginActionTypes.FETCHING_LOGIN_STATUS });
}

export const fetchingLoginStatusComplete = (userData) => (dispatch) => {
  return dispatch({
    type: loginActionTypes.FETCHING_LOGIN_STATUS_COMPLETE,
    userData: userData,
  });
}

export const loginSuccess = (userDataFromLogin) => (dispatch) => {
  return dispatch({
    type: loginActionTypes.LOGIN_SUCCESS,
    userDataFromLogin: userDataFromLogin,  
  });
}

export const loginFailed = () => (dispatch) => {
  return dispatch({ type: loginActionTypes.LOGIN_FAILED });
}

export const logout = () => (dispatch) => {
  return dispatch({ type: loginActionTypes.LOGOUT });
}