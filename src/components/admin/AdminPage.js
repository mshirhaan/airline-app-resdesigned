import React from "react";
import { Route, Switch } from "react-router-dom";
import FlightPage from "../flight/FlightsPage";
import FlightSeatMap from "../flight/FlightSeatMap";
import PassengersPage from "../passengers/PassengersPage";
import PassengerAddPage from "../passengers/PassengerAddPage";
import ManagePassengerPage from "../passengers/ManagePassengerPage";
import InFlightServicesPage from "../flight/InFlightServicesPage";
import PageNotFound from "../PageNotFound";
/* eslint react/prop-types: 0 */

const AdminPage = (props) => (
  <div>
    <h3 className="m-3 d-flex justify-content-center">Admin Portal</h3>
    {/* <Link className="btn btn-primary btn-lg" to="/admin/flights">
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
          "/flights/:flightNumber/passengers/manage-passenger/:passengerId"
        }
        component={ManagePassengerPage}
      />
      <Route
        path={
          props.match.url + "/flights/:flightNumber/passengers/manage-passenger"
        }
        component={ManagePassengerPage}
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

export default AdminPage;
