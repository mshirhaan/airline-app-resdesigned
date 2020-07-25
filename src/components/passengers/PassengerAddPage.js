import React from "react";
import { connect } from "react-redux";
import * as passengerActions from "../../redux/actions/passengerActions";
import * as flightSeatActions from "../../redux/actions/flightSeatActions";
import {
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { bindActionCreators } from "redux";
/* eslint react/prop-types: 0 */

class PassengerAddPage extends React.Component {
  state = {
    passenger: {
      id: "",
      flightNumber: "",
      seatNumber: "",
      firstName: "",
      lastName: "",
      address: "",
      dob: "",
      passportNumber: "",
      ancillaryServices: {},
      specialMeals: {},
      shoppingItems: {},
    },
    firstNameEmpty: false,
    lastNameEmpty: false,
    seatNumberEmpty: false,

    availableSeatNumbers: [],
  };

  handleSeatSelection(evt) {
    const passenger = {
      ...this.state.passenger,
      seatNumber: evt,
    };
    this.setState({ passenger });
  }

  componentWillMount() {
    let tempFlightSeats = Object.entries(this.props.flightSeats)
      .filter(([key]) => key === this.props.match.params.flightNumber)
      .map(([, flightSeats]) => flightSeats)[0];

    let tempSeatNumbers = [];
    Object.entries(tempFlightSeats).map(([, flightSeats]) =>
      flightSeats
        .filter((flightSeat) => flightSeat.isBooked === false)
        .forEach((flightSeat) => tempSeatNumbers.push(flightSeat.seatNumber))
    );
    this.setState({ availableSeatNumbers: tempSeatNumbers });
  }

  handleChangeEvent = (event) => {
    const passenger = {
      ...this.state.passenger,
      [event.target.name]: event.target.value,
    };
    this.setState({ passenger });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      firstNameEmpty: false,
      lastNameEmpty: false,
      seatNumberEmpty: false,
    });
    if (
      this.state.passenger.firstName !== "" &&
      this.state.passenger.lastName !== "" &&
      this.state.passenger.seatNumber !== ""
    ) {
      this.setState(
        {
          passenger: {
            ...this.state.passenger,
            id: Object.keys(this.props.passengers).length + 1,
            flightNumber: this.props.match.params.flightNumber,
          },
        },
        () => {
          this.props.actions.addPassenger(this.state.passenger);
          this.props.actions.bookSeat(this.state.passenger);
          this.setState(({ passenger }) => ({
            passenger: {
              ...passenger,
              flightNumber: "",
              seatNumber: "",
              firstName: "",
              lastName: "",
              address: "",
              dob: "",
              passportNumber: "",
            },
          }));
          this.props.history.goBack();
        }
      );
    } else if (
      this.state.passenger.firstName === "" &&
      this.state.passenger.lastName === "" &&
      this.state.passenger.seatNumber === ""
    ) {
      this.setState({
        firstNameEmpty: true,
        lastNameEmpty: true,
        seatNumberEmpty: true,
      });
    } else if (
      this.state.passenger.firstName === "" &&
      this.state.passenger.lastName === ""
    ) {
      this.setState({
        firstNameEmpty: true,
        lastNameEmpty: true,
      });
    } else if (
      this.state.passenger.firstName === "" &&
      this.state.passenger.seatNumber === ""
    ) {
      this.setState({
        firstNameEmpty: true,
        seatNumberEmpty: true,
      });
    } else if (
      this.state.passenger.lastName === "" &&
      this.state.passenger.seatNumber === ""
    ) {
      this.setState({
        lastNameEmpty: true,
        seatNumberEmpty: true,
      });
    } else if (this.state.passenger.seatNumber === "") {
      this.setState({
        seatNumberEmpty: true,
      });
    } else if (this.state.passenger.firstName === "") {
      this.setState({
        firstNameEmpty: true,
      });
    } else {
      this.setState({
        lastNameEmpty: true,
      });
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col>
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter first name"
              onChange={this.handleChangeEvent}
              value={this.state.passenger.firstName}
            />
            {this.state.firstNameEmpty ? (
              <p style={{ color: "red" }}>First name cannot be empty</p>
            ) : null}
          </Col>
          <Col>
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Enter last name"
              onChange={this.handleChangeEvent}
              value={this.state.passenger.lastName}
            />
            {this.state.lastNameEmpty ? (
              <p style={{ color: "red" }}>Last name cannot be empty</p>
            ) : null}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter address"
              onChange={this.handleChangeEvent}
              value={this.state.passenger.address}
            />
          </Col>
          <Col>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="text"
              name="dob"
              placeholder="Enter date of birth"
              onChange={this.handleChangeEvent}
              value={this.state.passenger.dob}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Label>Passport Number</Form.Label>
            <Form.Control
              type="text"
              name="passportNumber"
              placeholder="Enter passport number"
              onChange={this.handleChangeEvent}
              value={this.state.passenger.passportNumber}
            />
          </Col>
          <Col>
            <Form.Label>Choose an Available Seat Number</Form.Label> <br />
            <DropdownButton
              id="dropdown-basic-button"
              title={this.state.passenger.seatNumber}
              onSelect={(evt) => this.handleSeatSelection(evt)}
              variant="info"
            >
              {this.state.availableSeatNumbers.map((seatNumber) => (
                <Dropdown.Item key={seatNumber} eventKey={seatNumber}>
                  {seatNumber}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {this.state.seatNumberEmpty ? (
              <p style={{ color: "red" }}>Select an available seat</p>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={{ marginTop: "10px" }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    passengers: state.passengers,
    flightSeats: state.flightSeats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addPassenger: bindActionCreators(passengerActions.addPassenger, dispatch),
      bookSeat: bindActionCreators(flightSeatActions.bookSeat, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PassengerAddPage);
