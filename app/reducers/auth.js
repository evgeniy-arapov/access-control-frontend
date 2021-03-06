import * as AUTH from "constants/Auth";
import { defaultHeaders } from "api/serverConfig";

export const initialState = {
  user: null,
  jwt: null,
  isAuthenticated: false,
  fetching: false,
  error: null
};

export default function auth (state = initialState, action) {
  const { jwt, user } = action.payload && action.payload.body || {};
  switch (action.type) {
    case AUTH.LOGIN_REQUEST:
    case AUTH.REGISTER_REQUEST:
    case AUTH.LOGOUT_REQUEST:
      return {...state, fetching: true};

    case AUTH.LOGIN_SUCCESS:
    case AUTH.REGISTER_SUCCESS:
      localStorage.jwt = jwt;
      localStorage.user = user;
      defaultHeaders.append("Authorization", `Bearer ${jwt}`);
      return {
        ...state,
        fetching: false,
        user,
        jwt,
        isAuthenticated: true
      };

    case AUTH.LOGOUT_SUCCESS:
      delete localStorage.jwt;
      delete localStorage.user;
      defaultHeaders.delete("Authorization");
      return {...state, user: null, jwt: null, isAuthenticated: false, fetching: false};

    case AUTH.LOGIN_FAILURE:
    case AUTH.LOGOUT_FAILURE:
    case AUTH.REGISTER_FAILURE:
      return {...state, fetching: false, error: action.payload};

    default:
      return state;
  }
}