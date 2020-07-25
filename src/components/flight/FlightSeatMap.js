import React from "react";
import "./FlightSeatMap.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightSeatActions from "../../redux/actions/flightSeatActions";
import PassengerDetails from "../passengers/PassengerDetails";
import StaffPassengerDetails from "../passengers/StaffPassengerDetails";
/* eslint react/prop-types: 0 */

class FlightSeatMap extends React.Component {
  state = {
    passengerIndex: null,
  };

  handleCheckIn(seatNumber, passengerId, seatRow) {
    this.setState({ passengerIndex: passengerId });
    if (this.props.loginDetails.loggedInRole === "staff") {
      this.props.actions.checkinSeat(
        this.props.match.params.flightNumber,
        seatNumber,
        seatRow,
        passengerId
      );
    }
  }

  render() {
    return (
      <>
        <h1 className="flightmap" style={{ textAlign: "center" }}>
          Seat Map
        </h1>
        <div className="foo checkedIn"></div>{" "}
        <h4 className="flightmap" style={{ textAlign: "left" }}>
          Checked In
        </h4>
        <div className="foo notCheckedIn"></div>{" "}
        <h4 className="flightmap" style={{ textAlign: "left" }}>
          Not checked In
        </h4>
        <div className="foo notBooked"></div>{" "}
        <h4 className="flightmap" style={{ textAlign: "left" }}>
          Not Booked
        </h4>
        {this.props.loginDetails.loggedInRole === "staff" ? (
          <h4 style={{ textAlign: "left" }}>
            You can click on the seats to check in seats/undo checked in seats
          </h4>
        ) : null}
        <div className="flex-container">
          <div>
            <div className="plane">
              <div className="cockpit">
                <h1 className="flightmap">Please select a seat</h1>
              </div>
              <div className="exit exit--front fuselage"></div>
              <ol className="cabin fuselage">
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][1].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                1
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][2].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                2
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][3].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                3
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][4].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                4
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][5].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                5
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][6].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                6
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][7].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                7
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][8].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                8
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][9].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                9
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
                <li>
                  <ol className="seats" type="A">
                    {this.props.flightSeats[
                      this.props.match.params.flightNumber
                    ][10].map((flightSeat) => {
                      return (
                        <li key={flightSeat.seatNumber} className="seat">
                          <input
                            type="checkbox"
                            disabled={!flightSeat.isBooked}
                            checked={flightSeat.isCheckedIn}
                            id={flightSeat.seatNumber}
                            onClick={() =>
                              this.handleCheckIn(
                                flightSeat.seatNumber,
                                flightSeat.passengerId,
                                10
                              )
                            }
                          />
                          <label htmlFor={flightSeat.seatNumber}>
                            {flightSeat.seatNumber}
                          </label>
                        </li>
                      );
                    })}
                  </ol>
                </li>
              </ol>
              <div className="exit exit--back fuselage"></div>
            </div>
          </div>
          <div>
            {this.state.passengerIndex != null ? (
              <>
                {this.props.loginDetails.loggedInRole === "admin" ? (
                  <PassengerDetails
                    passenger={this.props.passengers[this.state.passengerIndex]}
                  />
                ) : (
                  <StaffPassengerDetails
                    passenger={this.props.passengers[this.state.passengerIndex]}
                  />
                )}
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    flightSeats: state.flightSeats,
    flights: state.flights,
    passengers: state.passengers,
    loginDetails: state.loginDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      bookSeat: bindActionCreators(flightSeatActions.bookSeat, dispatch),
      cancelSeat: bindActionCreators(flightSeatActions.cancelSeat, dispatch),
      updateSeat: bindActionCreators(flightSeatActions.updateSeat, dispatch),
      checkinSeat: bindActionCreators(flightSeatActions.checkinSeat, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSeatMap);
