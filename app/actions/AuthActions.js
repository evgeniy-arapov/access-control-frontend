import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "constants/Auth";
import { login as loginAPI } from "api/auth";

export function login (authData) {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });
    
    const response = await loginAPI(authData);
    if (!response.error)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response
      });
    else
      dispatch({
        type: LOGIN_FAILURE,
        payload: response
      });
  };
}