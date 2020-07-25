import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import { produce } from "immer";
/* eslint react/prop-types: 0 */

export default function flightReducer(state = initialState.flights, action) {
  switch (action.type) {
    case types.ADD_ANCILLARY_SERVICE: {
      let ancillaryService = {
        [action.ancillaryService.id]: { ...action.ancillaryService }
      };

      return produce(state, draft => {
        let ancillaryServices = {
          ...draft[action.flightIndex].ancillaryServices,
          ...ancillaryService
        };
        draft[action.flightIndex].ancillaryServices = ancillaryServices;
      });
    }
    case types.DELETE_ANCILLARY_SERVICE: {
      return produce(state, draft => {
        delete draft[action.flightIndex].ancillaryServices[
          action.ancillaryServiceId
        ];
      });
    }
    case types.UPDATE_ALL_ANCILLARY_SERVICES: {
      return produce(state, draft => {
        draft[action.flightIndex].ancillaryServices = action.ancillaryServices;
      });
    }
    case types.ADD_SPECIAL_MEAL: {
      let specialMeal = {
        [action.specialMeal.id]: { ...action.specialMeal }
      };

      return produce(state, draft => {
        let specialMeals = {
          ...draft[action.flightIndex].specialMeals,
          ...specialMeal
        };
        draft[action.flightIndex].specialMeals = specialMeals;
      });
    }
    case types.DELETE_SPECIAL_MEAL: {
      return produce(state, draft => {
        delete draft[action.flightIndex].specialMeals[action.specialMealId];
      });
    }
    case types.UPDATE_ALL_SPECIAL_MEALS: {
      return produce(state, draft => {
        draft[action.flightIndex].specialMeals = action.specialMeals;
      });
    }
    case types.ADD_SHOPPING_ITEM: {
      let shoppingItem = {
        [action.shoppingItem.id]: { ...action.shoppingItem }
      };

      return produce(state, draft => {
        let shoppingItems = {
          ...draft[action.flightIndex].shoppingItems,
          ...shoppingItem
        };
        draft[action.flightIndex].shoppingItems = shoppingItems;
      });
    }
    case types.DELETE_SHOPPING_ITEM: {
      return produce(state, draft => {
        delete draft[action.flightIndex].shoppingItems[action.shoppingItemId];
      });
    }
    case types.UPDATE_ALL_SHOPPING_ITEMS: {
      return produce(state, draft => {
        draft[action.flightIndex].shoppingItems = action.shoppingItems;
      });
    }
    default:
      return state;
  }
}
