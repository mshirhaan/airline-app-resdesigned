import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { produce } from "immer";
/* eslint react/prop-types: 0 */

export default function flightSeatReducer(
  state = initialState.flightSeats,
  action
) {
  switch (action.type) {
    case types.BOOK_SEAT: {
      const tempCol = action.passenger.seatNumber.charAt(1);
      const col =
        tempCol === "A"
          ? 0
          : tempCol === "B"
          ? 1
          : tempCol === "C"
          ? 2
          : tempCol === "D"
          ? 3
          : tempCol === "E"
          ? 4
          : 5;
      return produce(state, (draft) => {
        draft[action.passenger.flightNumber][
          action.passenger.seatNumber.charAt(0)
        ][col].isBooked = true;
        draft[action.passenger.flightNumber][
          action.passenger.seatNumber.charAt(0)
        ][col].passengerId = action.passenger.id;
        draft[action.passenger.flightNumber][
          action.passenger.seatNumber.charAt(0)
        ][col].isCheckedIn = false;
      });
    }
    case types.UPDATE_SEAT: {
      const newState = state.slice();

      for (var i in newState) {
        if (newState[i].id == action.passenger.id) {
          newState[i] = action.passenger;
          break;
        }
      }
      return newState;
    }
    case types.CANCEL_SEAT: {
      const newState = state.filter((p) => p.id !== action.passenger.id);
      return newState;
    }
    case types.CHECKIN_SEAT: {
      const index =
        action.seatNumber === "1A" ||
        action.seatNumber === "2A" ||
        action.seatNumber === "3A" ||
        action.seatNumber === "4A" ||
        action.seatNumber === "5A" ||
        action.seatNumber === "6A" ||
        action.seatNumber === "7A" ||
        action.seatNumber === "8A" ||
        action.seatNumber === "9A" ||
        action.seatNumber === "10A"
          ? 0
          : action.seatNumber === "1B" ||
            action.seatNumber === "2B" ||
            action.seatNumber === "3B" ||
            action.seatNumber === "4B" ||
            action.seatNumber === "5B" ||
            action.seatNumber === "6B" ||
            action.seatNumber === "7B" ||
            action.seatNumber === "8B" ||
            action.seatNumber === "9B" ||
            action.seatNumber === "10B"
          ? 1
          : action.seatNumber === "1C" ||
            action.seatNumber === "2C" ||
            action.seatNumber === "3C" ||
            action.seatNumber === "4C" ||
            action.seatNumber === "5C" ||
            action.seatNumber === "6C" ||
            action.seatNumber === "7C" ||
            action.seatNumber === "8C" ||
            action.seatNumber === "9C" ||
            action.seatNumber === "10C"
          ? 2
          : action.seatNumber === "1D" ||
            action.seatNumber === "2D" ||
            action.seatNumber === "3D" ||
            action.seatNumber === "4D" ||
            action.seatNumber === "5D" ||
            action.seatNumber === "6D" ||
            action.seatNumber === "7D" ||
            action.seatNumber === "8D" ||
            action.seatNumber === "9D" ||
            action.seatNumber === "10D"
          ? 3
          : action.seatNumber === "1E" ||
            action.seatNumber === "2E" ||
            action.seatNumber === "3E" ||
            action.seatNumber === "4E" ||
            action.seatNumber === "5E" ||
            action.seatNumber === "6E" ||
            action.seatNumber === "7E" ||
            action.seatNumber === "8E" ||
            action.seatNumber === "9E" ||
            action.seatNumber === "10E"
          ? 4
          : 5;

      let seat = [...state[action.flightNumber][action.seatRow]];
      seat[index] = {
        ...state[action.flightNumber][action.seatRow][index],
        isCheckedIn: !state[action.flightNumber][action.seatRow][index]
          .isCheckedIn,
      };

      return {
        ...state,
        [action.flightNumber]: {
          ...state[action.flightNumber],
          [action.seatRow]: seat,
        },
      };
    }
    case types.CHANGE_SEAT: {
      const tempCol = action.seatNumber.charAt(1);
      const tempColCurrent = action.currentSeatNumber.charAt(1);
      const col =
        tempCol === "A"
          ? 0
          : tempCol === "B"
          ? 1
          : tempCol === "C"
          ? 2
          : tempCol === "D"
          ? 3
          : tempCol === "E"
          ? 4
          : 5;

      const colCurrent =
        tempColCurrent === "A"
          ? 0
          : tempColCurrent === "B"
          ? 1
          : tempColCurrent === "C"
          ? 2
          : tempColCurrent === "D"
          ? 3
          : tempColCurrent === "E"
          ? 4
          : 5;

      return produce(state, (draft) => {
        draft[action.passenger.flightNumber][action.seatNumber.charAt(0)][
          col
        ].isBooked = true;
        draft[action.passenger.flightNumber][action.seatNumber.charAt(0)][
          col
        ].passengerId = action.passenger.id;
        draft[action.passenger.flightNumber][action.seatNumber.charAt(0)][
          col
        ].isCheckedIn = action.passenger.isCheckedIn;

        draft[action.passenger.flightNumber][
          action.currentSeatNumber.charAt(0)
        ][colCurrent].isBooked = false;
        draft[action.passenger.flightNumber][
          action.currentSeatNumber.charAt(0)
        ][colCurrent].passengerId = "";
        draft[action.passenger.flightNumber][
          action.currentSeatNumber.charAt(0)
        ][colCurrent].isCheckedIn = false;
      });
    }
    default:
      return state;
  }
}
