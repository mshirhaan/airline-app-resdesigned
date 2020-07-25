import React from "react";
import { connect } from "react-redux";
import * as passengerActions from "../../redux/actions/passengerActions";
import { Form, Button, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
/* eslint react/prop-types: 0 */

class PassengerEditPage extends React.Component {
  state = {
    passenger: {
      id: "",
      flightNumber: "",
      firstName: "",
      lastName: "",
      address: "",
      dob: "",
      passportNumber: "",
    },
  };

  componentDidMount() {
    this.setState({ passenger: this.props.passenger });
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
    this.props.actions.updatePassenger(this.state.passenger);
    this.props.history.goBack();
  };

  render() {
    return (
      <>
        <button
          style={{ marginBottom: 20, backgroundColor: "red" }}
          className="btn btn-primary"
          onClick={() => {
            this.props.actions.deletePassenger(this.state.passenger);
            this.props.history.goBack();
          }}
        >
          Delete Passenger
        </button>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter first name"
                onChange={this.handleChangeEvent}
                value={this.state.passenger.firstName}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter last name"
                onChange={this.handleChangeEvent}
                value={this.state.passenger.lastName}
              />
            </Col>
          </Row>
          <br />
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={this.handleChangeEvent}
            value={this.state.passenger.address}
          />
          <br />
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="text"
            name="dob"
            placeholder="Enter date of birth"
            onChange={this.handleChangeEvent}
            value={this.state.passenger.dob}
          />
          <br />
          <Form.Label>Passport Number</Form.Label>
          <Form.Control
            type="text"
            name="passportNumber"
            placeholder="Enter passport number"
            onChange={this.handleChangeEvent}
            value={this.state.passenger.passportNumber}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addPassenger: bindActionCreators(passengerActions.addPassenger, dispatch),
      deletePassenger: bindActionCreators(
        passengerActions.deletePassenger,
        dispatch
      ),
      updatePassenger: bindActionCreators(
        passengerActions.updatePassenger,
        dispatch
      ),
    },
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PassengerEditPage)
);
