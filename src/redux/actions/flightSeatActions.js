import * as types from "./actionTypes";

export function bookSeat(passenger) {
  return {
    type: types.BOOK_SEAT,
    passenger
  };
}

export function cancelSeat(passenger) {
  return {
    type: types.CANCEL_SEAT,
    passenger
  };
}

export function updateSeat(passenger) {
  return {
    type: types.UPDATE_SEAT,
    passenger
  };
}

export function checkinSeat(flightNumber, seatNumber, seatRow, passengerId) {
  return {
    type: types.CHECKIN_SEAT,
    flightNumber,
    seatNumber,
    seatRow,
    passengerId
  };
}
