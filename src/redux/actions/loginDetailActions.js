import * as types from "./actionTypes";

export function login(loginDetails) {
  return {
    type: types.LOGIN,
    loginDetails
  };
}

export function logout(loginDetails) {
  return {
    type: types.LOGOUT,
    loginDetails
  };
}
