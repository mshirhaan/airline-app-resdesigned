import React from "react";
import { connect } from "react-redux";
import { addPassenger, changeSeat } from "../../redux/actions/passengerActions";
import {
  Card,
  Badge,
  Row,
  Col,
  Table,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair, faBaby } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
/* eslint react/prop-types: 0 */
/* eslint react/validateDOMNesting: 0 */

class StaffPassengerDetails extends React.Component {
  state = {
    availableSeatNumbers: [],
  };

  componentWillMount() {
    let tempFlightSeats = Object.entries(this.props.flightSeats)
      .filter(([key]) => key === this.props.passenger.flightNumber)
      .map(([, flightSeats]) => flightSeats)[0];

    let tempSeatNumbers = [];
    Object.entries(tempFlightSeats).map(([, flightSeats]) =>
      flightSeats
        .filter((flightSeat) => flightSeat.isBooked === false)
        .forEach((flightSeat) => tempSeatNumbers.push(flightSeat.seatNumber))
    );
    this.setState({ availableSeatNumbers: tempSeatNumbers });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.passengers !== this.props.passengers) {
      let tempFlightSeats = Object.entries(this.props.flightSeats)
        .filter(([key]) => key === this.props.passenger.flightNumber)
        .map(([, flightSeats]) => flightSeats)[0];

      let tempSeatNumbers = [];
      Object.entries(tempFlightSeats).map(([, flightSeats]) =>
        flightSeats
          .filter((flightSeat) => flightSeat.isBooked === false)
          .forEach((flightSeat) => tempSeatNumbers.push(flightSeat.seatNumber))
      );
      this.setState({ availableSeatNumbers: tempSeatNumbers });
    }
  }

  index =
    this.props.passenger.seatNumber === "1A" ||
    this.props.passenger.seatNumber === "2A" ||
    this.props.passenger.seatNumber === "3A" ||
    this.props.passenger.seatNumber === "4A" ||
    this.props.passenger.seatNumber === "5A" ||
    this.props.passenger.seatNumber === "6A" ||
    this.props.passenger.seatNumber === "7A" ||
    this.props.passenger.seatNumber === "8A" ||
    this.props.passenger.seatNumber === "9A" ||
    this.props.passenger.seatNumber === "10A"
      ? 0
      : this.props.passenger.seatNumber === "1B" ||
        this.props.passenger.seatNumber === "2B" ||
        this.props.passenger.seatNumber === "3B" ||
        this.props.passenger.seatNumber === "4B" ||
        this.props.passenger.seatNumber === "5B" ||
        this.props.passenger.seatNumber === "6B" ||
        this.props.passenger.seatNumber === "7B" ||
        this.props.passenger.seatNumber === "8B" ||
        this.props.passenger.seatNumber === "9B" ||
        this.props.passenger.seatNumber === "10B"
      ? 1
      : this.props.passenger.seatNumber === "1C" ||
        this.props.passenger.seatNumber === "2C" ||
        this.props.passenger.seatNumber === "3C" ||
        this.props.passenger.seatNumber === "4C" ||
        this.props.passenger.seatNumber === "5C" ||
        this.props.passenger.seatNumber === "6C" ||
        this.props.passenger.seatNumber === "7C" ||
        this.props.passenger.seatNumber === "8C" ||
        this.props.passenger.seatNumber === "9C" ||
        this.props.passenger.seatNumber === "10C"
      ? 2
      : this.props.passenger.seatNumber === "1D" ||
        this.props.passenger.seatNumber === "2D" ||
        this.props.passenger.seatNumber === "3D" ||
        this.props.passenger.seatNumber === "4D" ||
        this.props.passenger.seatNumber === "5D" ||
        this.props.passenger.seatNumber === "6D" ||
        this.props.passenger.seatNumber === "7D" ||
        this.props.passenger.seatNumber === "8D" ||
        this.props.passenger.seatNumber === "9D" ||
        this.props.passenger.seatNumber === "10D"
      ? 3
      : this.props.passenger.seatNumber === "1E" ||
        this.props.passenger.seatNumber === "2E" ||
        this.props.passenger.seatNumber === "3E" ||
        this.props.passenger.seatNumber === "4E" ||
        this.props.passenger.seatNumber === "5E" ||
        this.props.passenger.seatNumber === "6E" ||
        this.props.passenger.seatNumber === "7E" ||
        this.props.passenger.seatNumber === "8E" ||
        this.props.passenger.seatNumber === "9E" ||
        this.props.passenger.seatNumber === "10E"
      ? 4
      : 5;

  seatRow = parseInt(this.props.passenger.seatNumber.charAt(0), 10);
  isCheckedIn =
    this.props.flightSeats[this.props.passenger.flightNumber][this.seatRow][
      this.index
    ].isCheckedIn === true
      ? "Checked In"
      : "Not checked in";

  handleSeatSelection(evt) {
    this.props.changeSeat(
      this.props.passenger,
      evt,
      this.props.passenger.seatNumber
    );
  }

  render() {
    return (
      <>
        <Table>
          <Card.Body>
            <Row className="justify-content-md-center">
              <div className="centerBlock">
                <Col style={{ fontSize: "30px" }}> Passenger Details</Col>
              </div>
            </Row>
            <hr></hr>
            <tbody>
              <tr>
                <th> First Name: </th>
                <th> {this.props.passenger.firstName} </th>
              </tr>
              <tr>
                <th> Last Name:</th>
                <th> {this.props.passenger.lastName} </th>
              </tr>
              {this.props.passenger.requiresWheelChair ? (
                <tr>
                  <th>
                    <FontAwesomeIcon icon={faWheelchair} />
                  </th>
                  <th>Requires Wheel Chair</th>
                </tr>
              ) : null}
              {this.props.passenger.withInfant ? (
                <tr>
                  <th>
                    <FontAwesomeIcon icon={faBaby} />
                  </th>
                  <th>Carries infant</th>
                </tr>
              ) : null}
              <tr>
                <th>Address: </th>
                <th> {this.props.passenger.address} </th>
              </tr>
              <tr>
                <th> Passport#: </th>
                <th> {this.props.passenger.passportNumber}</th>
              </tr>
              <tr>
                <th> Seat#: </th>
                <th>
                  {" "}
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={this.props.passenger.seatNumber}
                    onSelect={(evt) => this.handleSeatSelection(evt)}
                    variant="info"
                  >
                    {this.state.availableSeatNumbers.map((seatNumber) => (
                      <Dropdown.Item key={seatNumber} eventKey={seatNumber}>
                        {seatNumber}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </th>
              </tr>
              <tr>
                <th> Status:</th>
                <th>
                  {this.props.passenger.isCheckedIn
                    ? "Checked In"
                    : "Not Checked In"}
                </th>
              </tr>
              <tr>
                <th> Ancillary Services:</th>
                <td>
                  {this.props.passenger.ancillaryServices !== null
                    ? Object.entries(
                        this.props.passenger.ancillaryServices
                      ).map(([key, ancillaryService]) => {
                        return (
                          <Badge key={key} variant="secondary">
                            {ancillaryService.name}
                          </Badge>
                        );
                      })
                    : null}
                </td>
              </tr>
              <tr>
                <th> Special_Meals:</th>
                <td>
                  {this.props.passenger.specialMeals !== null
                    ? Object.entries(this.props.passenger.specialMeals).map(
                        ([key, specialMeal]) => {
                          return (
                            <Badge key={key} variant="success">
                              {specialMeal.name}
                            </Badge>
                          );
                        }
                      )
                    : null}
                </td>
              </tr>
              <tr>
                <th> Shopping_Items:</th>
                <td>
                  {this.props.passenger.shoppingItems !== null
                    ? Object.entries(this.props.passenger.shoppingItems).map(
                        ([key, shoppingItem]) => {
                          return (
                            <Badge key={key} variant="info">
                              {shoppingItem.name}
                            </Badge>
                          );
                        }
                      )
                    : null}
                </td>
              </tr>
              <tr>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    this.props.history.push(
                      "/staff/flights/" +
                        this.props.passenger.flightNumber +
                        "/passengers/manage-passenger/" +
                        this.props.passenger.id +
                        "/services"
                    );
                  }}
                >
                  Manage In-Flight Services
                </Button>
              </tr>
            </tbody>
          </Card.Body>
        </Table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers,
    flightSeats: state.flightSeats,
  };
}
const mapDispatchToProps = {
  addPassenger,
  changeSeat,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StaffPassengerDetails)
);
