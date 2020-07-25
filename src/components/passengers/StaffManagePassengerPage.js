import React from "react";
import { connect } from "react-redux";
import { addPassenger } from "../../redux/actions/passengerActions";
import StaffPassengerDetails from "./StaffPassengerDetails";
/* eslint react/prop-types: 0 */

function StaffManagePassengerPage(props) {
  let passenger = props.passengers[props.match.params.passengerId];

  return (
    <>
      <h2>Manage Passenger</h2>

      <StaffPassengerDetails passenger={passenger} />
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
)(StaffManagePassengerPage);
