import React from "react";
import "./FlightSeatMap.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as flightActions from "../../redux/actions/flightActions";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Form, Button, Row, Col } from "react-bootstrap";
/* eslint react/prop-types: 0 */

class AncillaryServicesPage extends React.Component {
  state = {
    ancillaryService: {
      id: "",
      name: "",
    },
    ancillaryServices: {},
    readOnlyId: "",
    changesButtonDisplay: false,
  };

  componentDidMount() {
    this.setState({
      ancillaryServices: {
        ...this.props.flights[this.flightIndex].ancillaryServices,
      },
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.flights !== this.props.flights) {
      this.setState({
        ancillaryServices: {
          ...this.props.flights[this.flightIndex].ancillaryServices,
        },
      });
    }
  }

  flight = this.props.flights.filter(
    (flight) => flight.number === this.props.flightNumber
  )[0];
  serviceId = Object.keys(this.flight.ancillaryServices).length + 1;
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
  handleExistingChangeEvent = (event, ancillaryServiceId) => {
    let ancillaryServices = { ...this.state.ancillaryServices };
    let ancillaryService = {
      ...ancillaryServices[ancillaryServiceId],
    };
    ancillaryService.name = event.target.value;
    ancillaryServices[ancillaryServiceId] = ancillaryService;
    this.setState({
      ancillaryServices: ancillaryServices,
    });
  };
  handleSubmitExisting = () => {
    this.props.actions.updateAllAncillaryServices(
      this.flightIndex,
      this.state.ancillaryServices
    );
    this.setState({ changesButtonDisplay: false, readOnlyId: "" });
  };
  handleChangeEvent = (event) => {
    event.preventDefault();
    const ancillaryService = {
      id: this.serviceId,
      [event.target.name]: event.target.value,
    };
    this.setState({ ancillaryService });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.ancillaryService.name !== "") {
      this.props.actions.addAncillaryService(
        this.flightIndex,
        this.state.ancillaryService
      );
      this.setState(
        ({ ancillaryService }) => ({
          ancillaryService: {
            ...ancillaryService,
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

  handleDelete = (event, ancillaryServiceId) => {
    event.preventDefault();
    this.props.actions.deleteAncillaryService(
      this.flightIndex,
      ancillaryServiceId
    );
  };

  handleEdit = (event, ancillaryServiceId) => {
    event.preventDefault();
    this.setState({
      readOnlyId: ancillaryServiceId,
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
          {Object.entries(this.state.ancillaryServices).map(
            ([key, ancillaryService]) => {
              return (
                <Row key={key}>
                  <Col>
                    <Form.Control
                      type="text"
                      readOnly={
                        this.state.readOnlyId === ancillaryService.id
                          ? false
                          : true
                      }
                      value={ancillaryService.name}
                      onChange={() =>
                        this.handleExistingChangeEvent(
                          event,
                          ancillaryService.id
                        )
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
                        this.handleEdit(event, ancillaryService.id);
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
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter new service name"
                onChange={this.handleChangeEvent}
                value={this.state.ancillaryService.name}
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
      addAncillaryService: bindActionCreators(
        flightActions.addAncillaryService,
        dispatch
      ),
      deleteAncillaryService: bindActionCreators(
        flightActions.deleteAncillaryService,
        dispatch
      ),
      updateAllAncillaryServices: bindActionCreators(
        flightActions.updateAllAncillaryServices,
        dispatch
      ),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AncillaryServicesPage);
