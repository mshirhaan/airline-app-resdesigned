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

export function changeSeat(passenger, seatNumber, currentSeatNumber) {
  return {
    type: types.CHANGE_SEAT,
    passenger,
    seatNumber,
    currentSeatNumber
  };
}

export function addAncillaryServiceToPassenger(passengerId, ancillaryService) {
  return {
    type: types.ADD_ANCILLARY_SERVICE_PASSENGER,
    passengerId,
    ancillaryService
  };
}

export function deleteAncillaryServiceForPassenger(
  passengerId,
  ancillaryServiceId
) {
  return {
    type: types.DELETE_ANCILLARY_SERVICE_PASSENGER,
    passengerId,
    ancillaryServiceId
  };
}

export function addSpecialMealToPassenger(passengerId, specialMeal) {
  return {
    type: types.ADD_SPECIAL_MEAL_PASSENGER,
    passengerId,
    specialMeal
  };
}

export function deleteSpecialMealForPassenger(passengerId, specialMealId) {
  return {
    type: types.DELETE_SPECIAL_MEAL_PASSENGER,
    passengerId,
    specialMealId
  };
}

export function addShoppingItemToPassenger(passengerId, shoppingItem) {
  return {
    type: types.ADD_SHOPPING_ITEM_PASSENGER,
    passengerId,
    shoppingItem
  };
}

export function deleteShoppingItemForPassenger(passengerId, shoppingItemId) {
  return {
    type: types.DELETE_SHOPPING_ITEM_PASSENGER,
    passengerId,
    shoppingItemId
  };
}
