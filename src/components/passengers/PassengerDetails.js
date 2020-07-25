import React from "react";
import { connect } from "react-redux";
import { addPassenger } from "../../redux/actions/passengerActions";
import { Card, Badge, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheelchair, faBaby } from "@fortawesome/free-solid-svg-icons";
/* eslint react/prop-types: 0 */

function PassengerDetails(props) {
  const index =
    props.passenger.seatNumber === "1A" ||
    props.passenger.seatNumber === "2A" ||
    props.passenger.seatNumber === "3A" ||
    props.passenger.seatNumber === "4A" ||
    props.passenger.seatNumber === "5A" ||
    props.passenger.seatNumber === "6A" ||
    props.passenger.seatNumber === "7A" ||
    props.passenger.seatNumber === "8A" ||
    props.passenger.seatNumber === "9A" ||
    props.passenger.seatNumber === "10A"
      ? 0
      : props.passenger.seatNumber === "1B" ||
        props.passenger.seatNumber === "2B" ||
        props.passenger.seatNumber === "3B" ||
        props.passenger.seatNumber === "4B" ||
        props.passenger.seatNumber === "5B" ||
        props.passenger.seatNumber === "6B" ||
        props.passenger.seatNumber === "7B" ||
        props.passenger.seatNumber === "8B" ||
        props.passenger.seatNumber === "9B" ||
        props.passenger.seatNumber === "10B"
      ? 1
      : props.passenger.seatNumber === "1C" ||
        props.passenger.seatNumber === "2C" ||
        props.passenger.seatNumber === "3C" ||
        props.passenger.seatNumber === "4C" ||
        props.passenger.seatNumber === "5C" ||
        props.passenger.seatNumber === "6C" ||
        props.passenger.seatNumber === "7C" ||
        props.passenger.seatNumber === "8C" ||
        props.passenger.seatNumber === "9C" ||
        props.passenger.seatNumber === "10C"
      ? 2
      : props.passenger.seatNumber === "1D" ||
        props.passenger.seatNumber === "2D" ||
        props.passenger.seatNumber === "3D" ||
        props.passenger.seatNumber === "4D" ||
        props.passenger.seatNumber === "5D" ||
        props.passenger.seatNumber === "6D" ||
        props.passenger.seatNumber === "7D" ||
        props.passenger.seatNumber === "8D" ||
        props.passenger.seatNumber === "9D" ||
        props.passenger.seatNumber === "10D"
      ? 3
      : props.passenger.seatNumber === "1E" ||
        props.passenger.seatNumber === "2E" ||
        props.passenger.seatNumber === "3E" ||
        props.passenger.seatNumber === "4E" ||
        props.passenger.seatNumber === "5E" ||
        props.passenger.seatNumber === "6E" ||
        props.passenger.seatNumber === "7E" ||
        props.passenger.seatNumber === "8E" ||
        props.passenger.seatNumber === "9E" ||
        props.passenger.seatNumber === "10E"
      ? 4
      : 5;

  const seatRow = parseInt(props.passenger.seatNumber.charAt(0), 10);
  const isCheckedIn =
    props.flightSeats[props.passenger.flightNumber][seatRow][index]
      .isCheckedIn === true
      ? "Checked In"
      : "Not checked in";
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
              <th> {props.passenger.firstName} </th>
            </tr>
            <tr>
              <th> Last Name:</th>
              <th> {props.passenger.lastName} </th>
            </tr>
            {props.passenger.requiresWheelChair ? (
              <tr>
                <th>
                  <FontAwesomeIcon icon={faWheelchair} />
                </th>
                <th>Requires Wheel Chair</th>
              </tr>
            ) : null}
            {props.passenger.withInfant ? (
              <tr>
                <th>
                  <FontAwesomeIcon icon={faBaby} />
                </th>
                <th>Carries infant</th>
              </tr>
            ) : null}
            <tr>
              <th>Address: </th>
              <th> {props.passenger.address} </th>
            </tr>
            <tr>
              <th> Passport#: </th>
              <th> {props.passenger.passportNumber}</th>
            </tr>
            <tr>
              <th> Seat#: </th>
              <th> {props.passenger.seatNumber} </th>
            </tr>
            <tr>
              <th> Status:</th>
              <th>{isCheckedIn}</th>
            </tr>
            <tr>
              <th> Ancillary Services:</th>
              <td>
                {Object.entries(props.passenger.ancillaryServices).map(
                  ([key, ancillaryService]) => {
                    return (
                      <Badge key={key} variant="secondary">
                        {ancillaryService.name}
                      </Badge>
                    );
                  }
                )}
              </td>
            </tr>
            <tr>
              <th> Special_Meals:</th>
              <td>
                {Object.entries(props.passenger.specialMeals).map(
                  ([key, specialMeal]) => {
                    return (
                      <Badge key={key} variant="success">
                        {specialMeal.name}
                      </Badge>
                    );
                  }
                )}
              </td>
            </tr>
            <tr>
              <th> Shopping_Items:</th>
              <td>
                {Object.entries(props.passenger.shoppingItems).map(
                  ([key, shoppingItem]) => {
                    return (
                      <Badge key={key} variant="info">
                        {shoppingItem.name}
                      </Badge>
                    );
                  }
                )}
              </td>
            </tr>
          </tbody>
        </Card.Body>
      </Table>
    </>
  );
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers,
    flightSeats: state.flightSeats,
  };
}
const mapDispatchToProps = {
  addPassenger,
};

export default connect(mapStateToProps, mapDispatchToProps)(PassengerDetails);
