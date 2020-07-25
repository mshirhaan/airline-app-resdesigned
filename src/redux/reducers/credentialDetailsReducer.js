import initialState from "./initialState";
import * as types from "../actions/actionTypes";

export default function credentialReducer(
  state = initialState.credentialDetails,
  action
) {
  switch (action.type) {
    case types.SIGNUP: {
      debugger;
      return {
        ...state,
        [action.newCredential.id]: { ...action.newCredential },
      };
    }

    default:
      return state;
  }
}
