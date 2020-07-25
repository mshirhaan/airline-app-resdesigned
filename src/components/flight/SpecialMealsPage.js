import React from "react";
import "./FlightSeatMap.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightActions from "../../redux/actions/flightActions";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Form, Button, Row, Col } from "react-bootstrap";
/* eslint react/prop-types: 0 */

class SpecialMealsPage extends React.Component {
  state = {
    specialMeal: {
      id: "",
      name: "",
    },
    specialMeals: {},
    readOnlyId: "",
    changesButtonDisplay: false,
  };

  componentDidMount() {
    this.setState({
      specialMeals: {
        ...this.props.flights[this.flightIndex].specialMeals,
      },
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.flights !== this.props.flights) {
      this.setState({
        specialMeals: {
          ...this.props.flights[this.flightIndex].specialMeals,
        },
      });
    }
  }

  flight = this.props.flights.filter(
    (flight) => flight.number === this.props.flightNumber
  )[0];
  serviceId = Object.keys(this.flight.specialMeals).length + 1;
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
  handleExistingChangeEvent = (event, specialMealId) => {
    let specialMeals = { ...this.state.specialMeals };
    let specialMeal = {
      ...specialMeals[specialMealId],
    };
    specialMeal.name = event.target.value;
    specialMeals[specialMealId] = specialMeal;
    this.setState({
      specialMeals: specialMeals,
    });
  };
  handleSubmitExisting = () => {
    this.props.actions.updateAllSpecialMeals(
      this.flightIndex,
      this.state.specialMeals
    );
    this.setState({ changesButtonDisplay: false, readOnlyId: "" });
  };
  handleChangeEvent = (event) => {
    event.preventDefault();
    const specialMeal = {
      id: this.serviceId,
      [event.target.name]: event.target.value,
    };
    this.setState({ specialMeal });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.specialMeal.name !== "") {
      this.props.actions.addSpecialMeal(
        this.flightIndex,
        this.state.specialMeal
      );
      this.setState(
        ({ specialMeal }) => ({
          specialMeal: {
            ...specialMeal,
            id: "",
            name: "",
          },
        }),
        () => {
          this.serviceId = this.serviceId + 1;
        }
      );
    }
  };

  handleDelete = (event, specialMealId) => {
    event.preventDefault();
    this.props.actions.deleteSpecialMeal(this.flightIndex, specialMealId);
  };

  handleEdit = (event, specialMealId) => {
    event.preventDefault();
    this.setState({
      readOnlyId: specialMealId,
      changesButtonDisplay: true,
    });
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
                  <Form.Control
                    type="text"
                    readOnly={
                      this.state.readOnlyId === specialMeal.id ? false : true
                    }
                    value={specialMeal.name}
                    onChange={() =>
                      this.handleExistingChangeEvent(event, specialMeal.id)
                    }
                  />
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
                      this.handleEdit(event, specialMeal.id);
                    }}
                  >
                    <Pencil />
                  </button>{" "}
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
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter new service name"
                onChange={this.handleChangeEvent}
                value={this.state.specialMeal.name}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Add New Service
              </Button>
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
      addSpecialMeal: bindActionCreators(
        flightActions.addSpecialMeal,
        dispatch
      ),
      deleteSpecialMeal: bindActionCreators(
        flightActions.deleteSpecialMeal,
        dispatch
      ),
      updateAllSpecialMeals: bindActionCreators(
        flightActions.updateAllSpecialMeals,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialMealsPage);
