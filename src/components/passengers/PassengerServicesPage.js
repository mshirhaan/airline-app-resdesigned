import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightSeatActions from "../../redux/actions/flightSeatActions";
import AncillaryServicesPage from "./AncillaryServicesPage";
import SpecialMealsPage from "./SpecialMealsPage";
import ShoppingItemsPage from "./ShoppingItemsPage";
import { Route, NavLink, Switch } from "react-router-dom";
/* eslint react/prop-types: 0 */

class PassengerServicesPage extends React.Component {
  state = {
    passengerIndex: null
  };

  render() {
    const activeStyle = { color: "#F15B2A" };
    return (
      <div>
        <nav>
          <NavLink
            to={this.props.match.url + "/ancillary-services"}
            activeStyle={activeStyle}
            exact
          >
            Ancillary Services
          </NavLink>
          {" | "}
          <NavLink
            to={this.props.match.url + "/special-meals"}
            activeStyle={activeStyle}
          >
            Special Meals
          </NavLink>
          {" | "}
          <NavLink
            to={this.props.match.url + "/shopping-items"}
            activeStyle={activeStyle}
          >
            Shopping Items
          </NavLink>
        </nav>
        <Switch>
          <Route
            exact
            path={this.props.match.url + "/ancillary-services"}
            render={props => (
              <AncillaryServicesPage
                {...props}
                flightNumber={this.props.match.params.flightNumber}
                passengerId={this.props.match.params.passengerId}
              />
            )}
          />
          <Route
            path={this.props.match.url + "/special-meals"}
            render={props => (
              <SpecialMealsPage
                {...props}
                flightNumber={this.props.match.params.flightNumber}
                passengerId={this.props.match.params.passengerId}
              />
            )}
          />
          <Route
            path={this.props.match.url + "/shopping-items"}
            render={props => (
              <ShoppingItemsPage
                {...props}
                flightNumber={this.props.match.params.flightNumber}
                passengerId={this.props.match.params.passengerId}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flightSeats: state.flightSeats,
    flights: state.flights,
    passengers: state.passengers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      bookSeat: bindActionCreators(flightSeatActions.bookSeat, dispatch),
      cancelSeat: bindActionCreators(flightSeatActions.cancelSeat, dispatch),
      updateSeat: bindActionCreators(flightSeatActions.updateSeat, dispatch),
      checkinSeat: bindActionCreators(flightSeatActions.checkinSeat, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassengerServicesPage);
