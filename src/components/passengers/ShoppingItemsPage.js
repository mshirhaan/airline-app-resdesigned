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

class ShoppingItemsPage extends React.Component {
  state = {
    shoppingItems: {},
    availableShoppingItems: [],
    changesButtonDisplay: false,
    selectedShoppingItem: {
      id: "",
      name: "",
    },
  };

  componentDidMount() {
    let ids = new Set();
    Object.entries(
      this.props.passengers[this.props.passengerId].shoppingItems
    ).forEach(([, shoppingItem]) => ids.add(shoppingItem.id));

    let availableShoppingItems = Object.entries(
      this.props.flights[this.flightIndex].shoppingItems
    )
      .filter(([, shoppingItem]) => !ids.has(shoppingItem.id))
      .map(([, shoppingItem]) => shoppingItem);

    this.setState({
      shoppingItems: {
        ...this.props.passengers[this.props.passengerId].shoppingItems,
      },
      availableShoppingItems,
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.passengers !== this.props.passengers) {
      let ids = new Set();
      Object.entries(
        this.props.passengers[this.props.passengerId].shoppingItems
      ).forEach(([, shoppingItem]) => ids.add(shoppingItem.id));

      let availableShoppingItems = Object.entries(
        this.props.flights[this.flightIndex].shoppingItems
      )
        .filter(([, shoppingItem]) => !ids.has(shoppingItem.id))
        .map(([, shoppingItem]) => shoppingItem);

      this.setState({
        shoppingItems: {
          ...this.props.passengers[this.props.passengerId].shoppingItems,
        },
        availableShoppingItems,
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
        selectedShoppingItem: {
          ...this.props.flights[this.flightIndex].shoppingItems[evt],
        },
      },
      () => {
        this.props.actions.addShoppingItemToPassenger(
          this.props.passengerId,
          this.state.selectedShoppingItem
        );
      }
    );
  }

  handleDelete = (event, shoppingItemId) => {
    event.preventDefault();
    this.props.actions.deleteShoppingItemForPassenger(
      this.props.passengerId,
      shoppingItemId
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
          {Object.entries(this.state.shoppingItems).map(
            ([key, shoppingItem]) => {
              return (
                <Row key={key}>
                  <Col>
                    <Form.Control
                      type="text"
                      readOnly
                      value={shoppingItem.name}
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
              <DropdownButton
                id="dropdown-basic-button"
                title="Add New Ancillary Service"
                onSelect={(evt) => this.handleDropdownChange(evt)}
              >
                {this.state.availableShoppingItems.map((shoppingItem) => (
                  <Dropdown.Item
                    key={shoppingItem.id}
                    eventKey={shoppingItem.id}
                  >
                    {shoppingItem.name}
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
      addShoppingItemToPassenger: bindActionCreators(
        passengerActions.addShoppingItemToPassenger,
        dispatch
      ),
      deleteShoppingItemForPassenger: bindActionCreators(
        passengerActions.deleteShoppingItemForPassenger,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingItemsPage);
