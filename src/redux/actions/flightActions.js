import * as types from "./actionTypes";

export function addAncillaryService(flightIndex, ancillaryService) {
  return {
    type: types.ADD_ANCILLARY_SERVICE,
    ancillaryService,
    flightIndex
  };
}

export function updateAllAncillaryServices(flightIndex, ancillaryServices) {
  return {
    type: types.UPDATE_ALL_ANCILLARY_SERVICES,
    ancillaryServices,
    flightIndex
  };
}

export function deleteAncillaryService(flightIndex, ancillaryServiceId) {
  return {
    type: types.DELETE_ANCILLARY_SERVICE,
    ancillaryServiceId,
    flightIndex
  };
}

export function addSpecialMeal(flightIndex, specialMeal) {
  return {
    type: types.ADD_SPECIAL_MEAL,
    specialMeal,
    flightIndex
  };
}

export function deleteSpecialMeal(flightIndex, specialMealId) {
  return {
    type: types.DELETE_SPECIAL_MEAL,
    specialMealId,
    flightIndex
  };
}

export function updateAllSpecialMeals(flightIndex, specialMeals) {
  return {
    type: types.UPDATE_ALL_SPECIAL_MEALS,
    specialMeals,
    flightIndex
  };
}

export function addShoppingItem(flightIndex, shoppingItem) {
  return {
    type: types.ADD_SHOPPING_ITEM,
    shoppingItem,
    flightIndex
  };
}

export function deleteShoppingItem(flightIndex, shoppingItemId) {
  return {
    type: types.DELETE_SHOPPING_ITEM,
    shoppingItemId,
    flightIndex
  };
}
export function updateAllShoppingItems(flightIndex, shoppingItems) {
  return {
    type: types.UPDATE_ALL_SHOPPING_ITEMS,
    shoppingItems,
    flightIndex
  };
}
