import React from "react";
import FlightsListPageNew from "./FlightsListPageNew";
import { connect } from "react-redux";
/* eslint react/prop-types: 0 */

class FlightsPage extends React.Component {
  state = {
    flight: {
      id: "",
      number: "",
      from: "",
      to: "",
      departDate: "",
      arrivalDate: "",
      departTime: "",
      arrivalTime: "",
    },
  };

  render() {
    return (
      <>
        <br />
        <br />
        <h2>Flights</h2>

        <FlightsListPageNew
          flights={this.props.flights}
          loginDetails={this.props.loginDetails}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    flights: state.flights,
    loginDetails: state.loginDetails,
  };
}

export default connect(mapStateToProps)(FlightsPage);
