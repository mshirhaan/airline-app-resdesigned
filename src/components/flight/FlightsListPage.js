import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { withRouter } from "react-router-dom";
/* eslint react/prop-types: 0 */

class FlightsListPage extends React.Component {
  state = {
    flight: {
      id: "",
      number: "",
      from: "",
      to: "",
      departDate: "",
      arrivalDate: "",
      departTime: "",
      arrivalTime: "",
    },
  };

  render() {
    return (
      <div>
        {this.props.flights.map((flight) => (
          <div key={flight.number}>
            <Card>
              <Card.Body>
                <Row className="justify-content-md-center">
                  <div className="centerBlock">
                    <Col>
                      {flight.from}
                      <ArrowRight />
                      {flight.to}
                    </Col>
                  </div>
                </Row>
                <hr></hr>
                <Row>
                  <Col> DEPARTURE DATE </Col>
                  <Col> ARRIVAL DATE </Col>
                  <Col> DEPARTURE TIME </Col>
                  <Col> ARRIVAL TIME </Col>
                </Row>
                <Row>
                  <Col> {flight.departDate} </Col>
                  <Col> {flight.arrivalDate} </Col>
                  <Col> {flight.departTime} </Col>
                  <Col> {flight.arrivalTime} </Col>
                </Row>

                <Row className="justify-content-md-center">
                  <Col>
                    <button
                      style={{ marginBottom: 20 }}
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.loginDetails.loggedInRole === "admin"
                          ? this.props.history.push(
                              "/admin/flights/" + flight.number + "/passengers"
                            )
                          : this.props.history.push(
                              "/staff/flights/" + flight.number + "/passengers"
                            );
                        this.setState({ redirectToAddPassengersPage: true });
                      }}
                    >
                      View Passengers
                    </button>
                  </Col>
                  <Col>
                    <button
                      style={{ marginBottom: 20 }}
                      className="btn btn-primary"
                      onClick={() => {
                        this.props.loginDetails.loggedInRole === "admin"
                          ? this.props.history.push(
                              "/admin/flights/" + flight.number + "/seat-map"
                            )
                          : this.props.history.push(
                              "/staff/flights/" + flight.number + "/seat-map"
                            );
                      }}
                    >
                      View Seat Map
                    </button>
                  </Col>
                  {this.props.loginDetails.loggedInRole === "admin" ? (
                    <Col>
                      <button
                        style={{ marginBottom: 20 }}
                        className="btn btn-primary"
                        onClick={() => {
                          this.props.history.push(
                            "/admin/flights/" +
                              flight.number +
                              "/in-flight-services"
                          );
                          this.setState({ redirectToAddPassengersPage: true });
                        }}
                      >
                        Manage In Flight Services
                      </button>
                    </Col>
                  ) : null}
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(FlightsListPage);
