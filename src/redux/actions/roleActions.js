import * as types from "./actionTypes";

export function addPassenger(passenger) {
  return {
    type: types.ADD_PASSENGER,
    passenger
  };
}

export function updatePassenger(passenger) {
  return {
    type: types.UPDATE_PASSENGER,
    passenger
  };
}

export function deletePassenger(passenger) {
  return {
    type: types.DELETE_PASSENGER,
    passenger
  };
}

export function loadPassengers() {
  return {
    type: "LOAD_PASSENGERS"
  };
}
