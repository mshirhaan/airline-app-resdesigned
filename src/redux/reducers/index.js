import { combineReducers } from "redux";
import passengers from "./passengerReducer";
import flights from "./flightReducer";
import flightSeats from "./flightSeatReducer";
import loginDetails from "./loginDetailReducer";
import roles from "./roleReducer";
import credentialDetails from "./credentialDetailsReducer";

const rootReducer = combineReducers({
  passengers,
  flights,
  flightSeats,
  loginDetails,
  roles,
  credentialDetails,
});

export default rootReducer;
