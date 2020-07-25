import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as passengerActions from "../../redux/actions/passengerActions";
import { Trash } from "react-bootstrap-icons";
import {
  Form,
  Button,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
/* eslint react/prop-types: 0 */

class SpecialMealsPage extends React.Component {
  state = {
    specialMeals: {},
    availableSpecialMeals: [],
    changesButtonDisplay: false,
    selectedSpecialMeal: {
      id: "",
      name: "",
    },
  };

  componentDidMount() {
    let ids = new Set();
    Object.entries(
      this.props.passengers[this.props.passengerId].specialMeals
    ).forEach(([, specialMeal]) => ids.add(specialMeal.id));

    let availableSpecialMeals = Object.entries(
      this.props.flights[this.flightIndex].specialMeals
    )
      .filter(([, specialMeal]) => !ids.has(specialMeal.id))
      .map(([, specialMeal]) => specialMeal);

    this.setState({
      specialMeals: {
        ...this.props.passengers[this.props.passengerId].specialMeals,
      },
      availableSpecialMeals,
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.passengers !== this.props.passengers) {
      let ids = new Set();
      Object.entries(
        this.props.passengers[this.props.passengerId].specialMeals
      ).forEach(([, specialMeal]) => ids.add(specialMeal.id));

      let availableSpecialMeals = Object.entries(
        this.props.flights[this.flightIndex].specialMeals
      )
        .filter(([, specialMeal]) => !ids.has(specialMeal.id))
        .map(([, specialMeal]) => specialMeal);

      this.setState({
        specialMeals: {
          ...this.props.passengers[this.props.passengerId].specialMeals,
        },
        availableSpecialMeals,
      });
    }
  }

  flight = this.props.flights.filter(
    (flight) => flight.number === this.props.flightNumber
  )[0];

  flightIndex =
    this.flight.number === "AH001"
      ? 0
      : this.flight.number === "AH002"
      ? 1
      : this.flight.number === "AH003"
      ? 2
      : this.flight.number === "AH004"
      ? 3
      : 4;

  handleDropdownChange(evt) {
    this.setState(
      {
        selectedSpecialMeal: {
          ...this.props.flights[this.flightIndex].specialMeals[evt],
        },
      },
      () => {
        this.props.actions.addSpecialMealToPassenger(
          this.props.passengerId,
          this.state.selectedSpecialMeal
        );
      }
    );
  }

  handleDelete = (event, specialMealId) => {
    event.preventDefault();
    this.props.actions.deleteSpecialMealForPassenger(
      this.props.passengerId,
      specialMealId
    );
  };

  render() {
    return (
      <div>
        {this.state.changesButtonDisplay ? (
          <Button
            variant="primary"
            type="submit"
            onClick={this.handleSubmitExisting}
          >
            Save all
          </Button>
        ) : null}
        <Form>
          {Object.entries(this.state.specialMeals).map(([key, specialMeal]) => {
            return (
              <Row key={key}>
                <Col>
                  <Form.Control type="text" readOnly value={specialMeal.name} />
                </Col>

                <Col>
                  <button
                    style={{
                      fontSize: "1.25rem",
                      lineHeight: "1.5",
                      borderRadius: ".3rem",
                      backgroundColor: "#555",
                      display: "inline-flex",
                    }}
                    className="btn btn-primary "
                    onClick={() => {
                      this.handleDelete(event, specialMeal.id);
                    }}
                  >
                    <Trash />
                  </button>
                </Col>
              </Row>
            );
          })}
          <Row>
            <Col>
              <DropdownButton
                id="dropdown-basic-button"
                title="Add New Ancillary Service"
                onSelect={(evt) => this.handleDropdownChange(evt)}
              >
                {this.state.availableSpecialMeals.map((specialMeal) => (
                  <Dropdown.Item key={specialMeal.id} eventKey={specialMeal.id}>
                    {specialMeal.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flightSeats: state.flightSeats,
    flights: state.flights,
    passengers: state.passengers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addSpecialMealToPassenger: bindActionCreators(
        passengerActions.addSpecialMealToPassenger,
        dispatch
      ),
      deleteSpecialMealForPassenger: bindActionCreators(
        passengerActions.deleteSpecialMealForPassenger,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialMealsPage);
