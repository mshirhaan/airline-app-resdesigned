import React from "react";
import { connect } from "react-redux";
import PassengersListPage from "./PassengersListPage";
import StaffPassengersListPage from "./StaffPassengersListPage";
/* eslint react/prop-types: 0 */

class PassengersPage extends React.Component {
  state = {
    redirectToAddPassengersPage: false,
  };

  render() {
    let l = Object.keys(this.props.passengers).length;
    if (l !== 0) {
      return (
        <>
          {this.state.redirectToAddPassengersPage &&
            this.props.history.push("passengers/add-passenger")}
          <br />
          <br />
          <h2>Passengers</h2>
          {this.props.loginDetails.loggedInRole === "admin" ? (
            <PassengersListPage
              passengers={this.props.passengers}
              flightNumber={this.props.match.params.flightNumber}
            />
          ) : (
            <StaffPassengersListPage
              passengers={this.props.passengers}
              flightNumber={this.props.match.params.flightNumber}
            />
          )}
          {this.props.loginDetails.loggedInRole === "admin" ? (
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
              onClick={() => {
                this.setState({ redirectToAddPassengersPage: true });
              }}
            >
              Add Passenger
            </button>
          ) : null}
        </>
      );
    } else {
      return (
        <>
          {this.state.redirectToAddPassengersPage &&
            this.props.history.push("passengers/add-passenger")}
          <h3>No passengers to display</h3>;
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary"
            onClick={() => {
              this.setState({ redirectToAddPassengersPage: true });
            }}
          >
            Add Passenger
          </button>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers,
    loginDetails: state.loginDetails,
  };
}

function mapDispatchToProps() {
  return {
    actions: {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PassengersPage);
