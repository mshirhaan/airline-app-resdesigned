import React from "react";
import { ArrowRight } from "react-bootstrap-icons";
import { withRouter } from "react-router-dom";
import "./FlightsListPage.css";
/* eslint react/prop-types: 0 */

class FlightsListPageNew extends React.Component {
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
            <table className="flights">
              <thead>
                <tr>
                  <th> DESTINATION </th>
                  <th> DEPARTURE DATE </th>
                  <th> ARRIVAL DATE </th>
                  <th> DEPARTURE TIME </th>
                  <th> ARRIVAL TIME </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {" "}
                    {flight.from} <ArrowRight /> {flight.to}
                  </td>
                  <td> {flight.departDate} </td>
                  <td> {flight.arrivalDate} </td>
                  <td> {flight.departTime} </td>
                  <td> {flight.arrivalTime} </td>
                </tr>
                <tr>
                  <th colSpan="5" style={{ backgroundColor: "#ffff" }}>
                    <div className="text-center">
                      <div className="btn-group">
                        <button
                          style={{ marginBottom: 20 }}
                          className="btn btn-link"
                          onClick={() => {
                            this.props.loginDetails.loggedInRole === "admin"
                              ? this.props.history.push(
                                  "/admin/flights/" +
                                    flight.number +
                                    "/passengers"
                                )
                              : this.props.history.push(
                                  "/staff/flights/" +
                                    flight.number +
                                    "/passengers"
                                );
                            this.setState({
                              redirectToAddPassengersPage: true,
                            });
                          }}
                        >
                          View Passengers
                        </button>

                        <button
                          style={{ marginBottom: 20 }}
                          className="btn btn-link"
                          onClick={() => {
                            this.props.loginDetails.loggedInRole === "admin"
                              ? this.props.history.push(
                                  "/admin/flights/" +
                                    flight.number +
                                    "/seat-map"
                                )
                              : this.props.history.push(
                                  "/staff/flights/" +
                                    flight.number +
                                    "/seat-map"
                                );
                          }}
                        >
                          View Seat Map
                        </button>

                        {this.props.loginDetails.loggedInRole === "admin" ? (
                          <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-link"
                            onClick={() => {
                              this.props.history.push(
                                "/admin/flights/" +
                                  flight.number +
                                  "/in-flight-services"
                              );
                              this.setState({
                                redirectToAddPassengersPage: true,
                              });
                            }}
                          >
                            Manage In Flight Services
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(FlightsListPageNew);
