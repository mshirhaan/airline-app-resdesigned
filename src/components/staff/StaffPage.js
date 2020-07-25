import React from "react";
import { Route, Switch } from "react-router-dom";
import FlightPage from "../flight/FlightsPage";
import FlightSeatMap from "../flight/FlightSeatMap";
import PassengersPage from "../passengers/PassengersPage";
import PassengerAddPage from "../passengers/PassengerAddPage";
import StaffManagePassengerPage from "../passengers/StaffManagePassengerPage";
import InFlightServicesPage from "../flight/InFlightServicesPage";
import PassengerServicesPage from "../passengers/PassengerServicesPage";
import PageNotFound from "../PageNotFound";
/* eslint react/prop-types: 0 */

const StaffPage = (props) => (
  <div>
    <h3 className="m-3 d-flex justify-content-center">Staff Portal</h3>
    <br />
    {/* <Link className="btn btn-primary btn-lg" to="/staff/flights">
      View Flights
    </Link> */}
    <button
      className="btn btn-primary spbtn"
      onClick={() => {
        props.history.goBack();
      }}
    >
      Go back
    </button>
    <Switch>
      <Route exact path={props.match.url + "/flights"} component={FlightPage} />

      <Route
        exact
        path={props.match.url + "/flights/:flightNumber/passengers"}
        component={PassengersPage}
      />
      <Route
        exact
        path={
          props.match.url + "/flights/:flightNumber/passengers/add-passenger"
        }
        component={PassengerAddPage}
      />

      <Route
        path={
          props.match.url +
          "/flights/:flightNumber/passengers/manage-passenger/:passengerId/services"
        }
        component={PassengerServicesPage}
      />

      <Route
        path={
          props.match.url +
          "/flights/:flightNumber/passengers/manage-passenger/:passengerId"
        }
        component={StaffManagePassengerPage}
      />
      <Route
        path={
          props.match.url + "/flights/:flightNumber/passengers/manage-passenger"
        }
        component={StaffManagePassengerPage}
      />

      <Route
        path={props.match.url + "/flights/:flightNumber/seat-map"}
        component={FlightSeatMap}
      />

      <Route
        path={props.match.url + "/flights/:flightNumber/in-flight-services"}
        component={InFlightServicesPage}
      />
      <Route exact path={props.match.url} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default StaffPage;
