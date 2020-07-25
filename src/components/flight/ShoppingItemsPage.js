import React from "react";
import "./FlightSeatMap.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightActions from "../../redux/actions/flightActions";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Form, Button, Row, Col } from "react-bootstrap";
/* eslint react/prop-types: 0 */

class ShoppingItemsPage extends React.Component {
  state = {
    shoppingItem: {
      id: "",
      name: "",
    },
    shoppingItems: {},
    readOnlyId: "",
    changesButtonDisplay: false,
  };

  componentDidMount() {
    this.setState({
      shoppingItems: {
        ...this.props.flights[this.flightIndex].shoppingItems,
      },
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.flights !== this.props.flights) {
      this.setState({
        shoppingItems: {
          ...this.props.flights[this.flightIndex].shoppingItems,
        },
      });
    }
  }

  flight = this.props.flights.filter(
    (flight) => flight.number === this.props.flightNumber
  )[0];
  serviceId = Object.keys(this.flight.shoppingItems).length + 1;
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
  handleExistingChangeEvent = (event, shoppingItemId) => {
    let shoppingItems = { ...this.state.shoppingItems };
    let shoppingItem = {
      ...shoppingItems[shoppingItemId],
    };
    shoppingItem.name = event.target.value;
    shoppingItems[shoppingItemId] = shoppingItem;
    this.setState({
      shoppingItems: shoppingItems,
    });
  };
  handleSubmitExisting = () => {
    this.props.actions.updateAllShoppingItems(
      this.flightIndex,
      this.state.shoppingItems
    );
    this.setState({ changesButtonDisplay: false, readOnlyId: "" });
  };
  handleChangeEvent = (event) => {
    event.preventDefault();
    const shoppingItem = {
      id: this.serviceId,
      [event.target.name]: event.target.value,
    };
    this.setState({ shoppingItem });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.shoppingItem.name !== "") {
      this.props.actions.addShoppingItem(
        this.flightIndex,
        this.state.shoppingItem
      );
      this.setState(
        ({ shoppingItem }) => ({
          shoppingItem: {
            ...shoppingItem,
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

  handleDelete = (event, shoppingItemId) => {
    event.preventDefault();
    this.props.actions.deleteShoppingItem(this.flightIndex, shoppingItemId);
  };

  handleEdit = (event, shoppingItemId) => {
    event.preventDefault();
    this.setState({
      readOnlyId: shoppingItemId,
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
          {Object.entries(this.state.shoppingItems).map(
            ([key, shoppingItem]) => {
              return (
                <Row key={key}>
                  <Col>
                    <Form.Control
                      type="text"
                      readOnly={
                        this.state.readOnlyId === shoppingItem.id ? false : true
                      }
                      value={shoppingItem.name}
                      onChange={() =>
                        this.handleExistingChangeEvent(event, shoppingItem.id)
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
                        this.handleEdit(event, shoppingItem.id);
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
                        this.handleDelete(event, shoppingItem.id);
                      }}
                    >
                      <Trash />
                    </button>
                  </Col>
                </Row>
              );
            }
          )}
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter new service name"
                onChange={this.handleChangeEvent}
                value={this.state.shoppingItem.name}
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
      addShoppingItem: bindActionCreators(
        flightActions.addShoppingItem,
        dispatch
      ),
      deleteShoppingItem: bindActionCreators(
        flightActions.deleteShoppingItem,
        dispatch
      ),
      updateAllShoppingItems: bindActionCreators(
        flightActions.updateAllShoppingItems,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemsPage);
