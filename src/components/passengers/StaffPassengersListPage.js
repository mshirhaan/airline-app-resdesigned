import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./StaffPassengersListPage.css";
/* eslint react/prop-types: 0 */

class StaffPassengersListPage extends React.Component {
  state = {
    passengers: {},
    filters: {
      checkedIn: false,
      notCheckedIn: false,
      requiresWheelChair: false,
      withInfant: false,
    },
    buttonColors: {
      checkedIn: "red",
      notCheckedIn: "red",
      requiresWheelChair: "red",
      withInfant: "red",
    },
  };

  componentDidMount() {
    this.setState({
      passengers: { ...this.props.passengers },
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.filters !== this.state.filters) {
      if (
        (this.state.filters.checkedIn === false) &
        (this.state.filters.notCheckedIn === false) &
        (this.state.filters.requiresWheelChair === false) &
        (this.state.filters.withInfant === false)
      ) {
        this.setState({
          passengers: { ...this.props.passengers },
        });
      } else {
        let passengers = {};
        let ids = new Set();

        if (this.state.filters.checkedIn === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.isCheckedIn === true)
            .forEach(([, passenger]) => ids.add(passenger.id));
        }
        if (this.state.filters.notCheckedIn === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.isCheckedIn === false)
            .forEach(([, passenger]) => ids.add(passenger.id));
        }
        if (this.state.filters.requiresWheelChair === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.requiresWheelChair === true)
            .forEach(([, passenger]) => ids.add(passenger.id));
        }
        if (this.state.filters.withInfant === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.withInfant === true)
            .forEach(([, passenger]) => ids.add(passenger.id));
        }

        passengers = Object.entries(this.props.passengers)
          .filter(([, passenger]) => ids.has(passenger.id))
          .map(([, passenger]) => passenger);

        this.setState({
          passengers: { ...passengers },
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="btn-group" style={{ marginBottom: "25px" }}>
          Apply Filters |
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: this.state.buttonColors.checkedIn }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  checkedIn:
                    buttonColors.checkedIn === "green" ? "red" : "green",
                },
                filters: { ...filters, checkedIn: !filters.checkedIn },
              }));
            }}
          >
            Checked In
          </Button>{" "}
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: this.state.buttonColors.notCheckedIn,
            }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  notCheckedIn:
                    buttonColors.notCheckedIn === "green" ? "red" : "green",
                },
                filters: {
                  ...filters,
                  notCheckedIn: !filters.notCheckedIn,
                },
              }));
            }}
          >
            Not CheckedIn
          </Button>{" "}
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: this.state.buttonColors.requiresWheelChair,
            }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  requiresWheelChair:
                    buttonColors.requiresWheelChair === "green"
                      ? "red"
                      : "green",
                },
                filters: {
                  ...filters,
                  requiresWheelChair: !filters.requiresWheelChair,
                },
              }));
            }}
          >
            Requires Wheel Chair
          </Button>{" "}
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: this.state.buttonColors.withInfant,
            }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  withInfant:
                    buttonColors.withInfant === "green" ? "red" : "green",
                },
                filters: {
                  ...filters,
                  withInfant: !filters.withInfant,
                },
              }));
            }}
          >
            With Infant
          </Button>
        </div>
        <table className="passengers">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Passport Number </th>
              <th>Date of Birth </th>
              <th>Seat Number </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.passengers)
              .filter(
                ([, passenger]) =>
                  passenger.flightNumber === this.props.flightNumber
              )
              .map(([key, passenger]) => {
                return (
                  <tr key={key}>
                    <td>{passenger.firstName} </td>
                    <td> {passenger.lastName}</td>
                    <td> {passenger.address}</td>
                    <td>{passenger.passportNumber} </td>
                    <td>{passenger.dob} </td>
                    <td>{passenger.seatNumber} </td>
                    <td>
                      <Link to={"passengers/manage-passenger/" + passenger.id}>
                        Manage Passenger
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StaffPassengersListPage;
