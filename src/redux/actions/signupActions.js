import * as types from "./actionTypes";

export function signup(newCredential) {
  return {
    type: types.SIGNUP,
    newCredential,
  };
}
