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

class AncillaryServicesPage extends React.Component {
  state = {
    ancillaryServices: {},
    availableAncillaryServices: [],
    changesButtonDisplay: false,
    selectedAncillaryService: {
      id: "",
      name: "",
    },
  };

  componentDidMount() {
    let ids = new Set();
    Object.entries(
      this.props.passengers[this.props.passengerId].ancillaryServices
    ).forEach(([, ancillaryService]) => ids.add(ancillaryService.id));

    let availableAncillaryServices = Object.entries(
      this.props.flights[this.flightIndex].ancillaryServices
    )
      .filter(([, ancillaryService]) => !ids.has(ancillaryService.id))
      .map(([, ancillaryService]) => ancillaryService);

    this.setState({
      ancillaryServices: {
        ...this.props.passengers[this.props.passengerId].ancillaryServices,
      },
      availableAncillaryServices,
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.passengers !== this.props.passengers) {
      let ids = new Set();
      Object.entries(
        this.props.passengers[this.props.passengerId].ancillaryServices
      ).forEach(([, ancillaryService]) => ids.add(ancillaryService.id));

      let availableAncillaryServices = Object.entries(
        this.props.flights[this.flightIndex].ancillaryServices
      )
        .filter(([, ancillaryService]) => !ids.has(ancillaryService.id))
        .map(([, ancillaryService]) => ancillaryService);

      this.setState({
        ancillaryServices: {
          ...this.props.passengers[this.props.passengerId].ancillaryServices,
        },
        availableAncillaryServices,
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
        selectedAncillaryService: {
          ...this.props.flights[this.flightIndex].ancillaryServices[evt],
        },
      },
      () => {
        this.props.actions.addAncillaryServiceToPassenger(
          this.props.passengerId,
          this.state.selectedAncillaryService
        );
      }
    );
  }

  handleDelete = (event, ancillaryServiceId) => {
    event.preventDefault();
    this.props.actions.deleteAncillaryServiceForPassenger(
      this.props.passengerId,
      ancillaryServiceId
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
          {Object.entries(this.state.ancillaryServices).map(
            ([key, ancillaryService]) => {
              return (
                <Row key={key}>
                  <Col>
                    <Form.Control
                      type="text"
                      readOnly
                      value={ancillaryService.name}
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
                        this.handleDelete(event, ancillaryService.id);
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
                {this.state.availableAncillaryServices.map(
                  (ancillaryService) => (
                    <Dropdown.Item
                      key={ancillaryService.id}
                      eventKey={ancillaryService.id}
                    >
                      {ancillaryService.name}
                    </Dropdown.Item>
                  )
                )}
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
      addAncillaryServiceToPassenger: bindActionCreators(
        passengerActions.addAncillaryServiceToPassenger,
        dispatch
      ),
      deleteAncillaryServiceForPassenger: bindActionCreators(
        passengerActions.deleteAncillaryServiceForPassenger,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AncillaryServicesPage);
