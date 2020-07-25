import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function loginDetailReducer(
  state = initialState.loginDetails,
  action
) {
  switch (action.type) {
    case types.LOGIN: {
      return action.loginDetails;
    }
    case types.LOGOUT: {
      return action.loginDetails;
    }
    default:
      return state;
  }
}
