import * as AUTH from "constants/Auth";
import { login as loginAPI, register as registerAPI, logout as logoutAPI } from "api/auth";

export function login (authData) {
  return async dispatch => {
    dispatch({
      type: AUTH.LOGIN_REQUEST
    });
    
    const response = await loginAPI(authData);
    if (!response.error)
      dispatch({
        type: AUTH.LOGIN_SUCCESS,
        payload: response
      });
    else
      dispatch({
        type: AUTH.LOGIN_FAILURE,
        payload: response
      });
  };
}

export function register (authData) {
  return async dispatch => {
    dispatch({
      type: AUTH.REGISTER_REQUEST
    });

    const response = await registerAPI(authData);
    if (!response.error)
      dispatch({
        type: AUTH.REGISTER_SUCCESS,
        payload: response
      });
    else
      dispatch({
        type: AUTH.REGISTER_FAILURE,
        payload: response
      });
  };
}

export function logout () {
  return async dispatch => {
    dispatch({
      type: AUTH.LOGOUT_REQUEST
    });

    const response = await logoutAPI();
    if (!response.error)
      dispatch({
        type: AUTH.LOGOUT_SUCCESS,
        payload: response
      });
    else
      dispatch({
        type: AUTH.LOGOUT_FAILURE,
        payload: response
      });
  };
}