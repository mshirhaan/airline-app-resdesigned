import React from "react";
import { connect } from "react-redux";
import { addPassenger } from "../../redux/actions/passengerActions";
import PassengerEditPage from "./PassengerEditPage";
/* eslint react/prop-types: 0 */

function ManagePassengerPage(props) {
  let passenger = props.passengers[props.match.params.passengerId];

  return (
    <>
      <h2>Manage Passenger</h2>

      <PassengerEditPage passenger={passenger} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers,
  };
}
const mapDispatchToProps = {
  addPassenger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePassengerPage);
