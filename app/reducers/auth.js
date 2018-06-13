import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST } from "constants/Auth";

const initialState = {
  user: null,
  isAuthenticated: false,
  fetching: false,
  error: null
};

export default function auth (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {...state, fetching: true};
    case LOGIN_SUCCESS:
      return {...state, fetching: false, user: action.payload.user, isAuthenticated: true};
    case LOGIN_FAILURE:
      return {...state, fetching: false, error: action.payload};
    default:
      return state;
  }
}