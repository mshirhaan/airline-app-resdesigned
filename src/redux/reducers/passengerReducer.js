import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { produce } from "immer";

export default function passengerReducer(
  state = initialState.passengers,
  action
) {
  switch (action.type) {
    case types.ADD_PASSENGER: {
      return { ...state, [action.passenger.id]: { ...action.passenger } };
    }
    case types.UPDATE_PASSENGER: {
      const newState = { ...state };
      newState[action.passenger.id] = { ...action.passenger };
      return newState;
    }
    case types.DELETE_PASSENGER: {
      const newState = state.filter((p) => p.id !== action.passenger.id);
      return newState;
    }
    case types.CHANGE_SEAT: {
      return produce(state, (draft) => {
        draft[action.passenger.id].seatNumber = action.seatNumber;
      });
    }
    case types.ADD_ANCILLARY_SERVICE_PASSENGER: {
      return produce(state, (draft) => {
        draft[action.passengerId].ancillaryServices[
          action.ancillaryService.id
        ] = action.ancillaryService;
      });
    }
    case types.DELETE_ANCILLARY_SERVICE_PASSENGER: {
      return produce(state, (draft) => {
        delete draft[action.passengerId].ancillaryServices[
          action.ancillaryServiceId
        ];
      });
    }

    case types.ADD_SPECIAL_MEAL_PASSENGER: {
      return produce(state, (draft) => {
        draft[action.passengerId].specialMeals[action.specialMeal.id] =
          action.specialMeal;
      });
    }
    case types.DELETE_SPECIAL_MEAL_PASSENGER: {
      return produce(state, (draft) => {
        delete draft[action.passengerId].specialMeals[action.specialMealId];
      });
    }

    case types.ADD_SHOPPING_ITEM_PASSENGER: {
      return produce(state, (draft) => {
        draft[action.passengerId].shoppingItems[action.shoppingItem.id] =
          action.shoppingItem;
      });
    }
    case types.DELETE_SHOPPING_ITEM_PASSENGER: {
      return produce(state, (draft) => {
        delete draft[action.passengerId].shoppingItems[action.shoppingItemId];
      });
    }

    case types.CHECKIN_SEAT: {
      let isCheckedIn = !state[action.passengerId].isCheckedIn;
      return produce(state, (draft) => {
        draft[action.passengerId].isCheckedIn = isCheckedIn;
      });
    }
    default:
      return state;
  }
}
