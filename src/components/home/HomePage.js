import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HomePage.css";
/* eslint react/prop-types: 0 */

const HomePage = (props) => (
  <div className="jumbotron">
    <h1>Airline Management</h1>
    {props.loginDetails.loggedInRole === "admin" ? (
      <>
        <h4> You are logged in as Admin.</h4>
        <Link to="admin/flights" className="btn btn-primary spbtn">
          Admin Portal
        </Link>
      </>
    ) : props.loginDetails.loggedInRole === "staff" ? (
      <>
        <h4> You are logged in as Staff.</h4>
        <Link to="staff/flights" className="btn btn-primary spbtn">
          Staff Portal
        </Link>
      </>
    ) : (
      <>
        <h4> You need to login to proceed </h4>{" "}
        <Link
          style={{ marginRight: "10px" }}
          to="signup"
          className="btn btn-primary btn-lg"
        >
          Sign Up
        </Link>
        <Link to="login" className="btn btn-primary btn-lg">
          Login
        </Link>
      </>
    )}
  </div>
);

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
  };
}
export default connect(mapStateToProps)(HomePage);
