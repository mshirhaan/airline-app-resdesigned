import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PassengersListPage.css";
/* eslint react/prop-types: 0 */

class PassengersListPage extends React.Component {
  state = {
    passengers: {},
    filters: {
      passport: false,
      address: false,
      dob: false,
    },
    buttonColors: {
      passport: "red",
      address: "red",
      dob: "red",
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
        (this.state.filters.passport === false) &
        (this.state.filters.address === false) &
        (this.state.filters.dob === false)
      ) {
        this.setState({
          passengers: { ...this.props.passengers },
        });
      } else {
        let passengers = {};
        let ids = new Set();

        if (this.state.filters.passport === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.passportNumber === "")
            .forEach(([, passenger]) => ids.add(passenger.id));
        }
        if (this.state.filters.address === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.address === "")
            .forEach(([, passenger]) => ids.add(passenger.id));
        }
        if (this.state.filters.dob === true) {
          Object.entries(this.props.passengers)
            .filter(([, passenger]) => passenger.dob === "")
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
          Apply Filters
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: this.state.buttonColors.passport,
              marginLeft: "10px",
            }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  passport: buttonColors.passport === "green" ? "red" : "green",
                },
                filters: { ...filters, passport: !filters.passport },
              }));
            }}
          >
            Missing Passport
          </Button>{" "}
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: this.state.buttonColors.address }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  address: buttonColors.address === "green" ? "red" : "green",
                },
                filters: { ...filters, address: !filters.address },
              }));
            }}
          >
            Missing Address
          </Button>{" "}
          <Button
            variant="primary"
            type="submit"
            style={{ backgroundColor: this.state.buttonColors.dob }}
            onClick={() => {
              this.setState(({ buttonColors, filters }) => ({
                buttonColors: {
                  ...buttonColors,
                  dob: buttonColors.dob === "green" ? "red" : "green",
                },
                filters: { ...filters, dob: !filters.dob },
              }));
            }}
          >
            Missing Date of Birth
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

export default PassengersListPage;
