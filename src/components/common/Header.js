import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Auth from "../Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginDetailActions from "../../redux/actions/loginDetailActions";
import { BoxArrowRight } from "react-bootstrap-icons";
import "./Header.css";

/* eslint react/prop-types: 0 */

const Header = (props) => {
  const signOutHandler = () => {
    let loginDetails = {
      isLoggedIn: false,
      loggedInRole: "",
      loggedInEmail: "",
      loggedInName: "",
    };
    props.actions.logout(loginDetails);
    props.history.push("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <img
          src="../../../../favicon.ico"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="AH Airlines logo"
        />
        <Navbar.Brand className="hd">AH Airlines</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink className="d-inline p-2 bg-dark text-white hd" to="/">
            Home
          </NavLink>
        </Nav>
        {props.loginDetails.isLoggedIn ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="hd">
              {props.loginDetails.loggedInName}
            </Navbar.Text>
          </Navbar.Collapse>
        ) : null}
        {" | "}
        {!props.loginDetails.disableGoogleLogin ? (
          <Auth />
        ) : (
          <button
            style={{
              fontSize: "1.25rem",
              lineHeight: "1.5",
              borderRadius: ".3rem",
              backgroundColor: "#555",
              display: "flex",
            }}
            className="btn btn-primary "
            onClick={signOutHandler}
          >
            <BoxArrowRight
              style={{ width: "1em", height: "1em" }}
            ></BoxArrowRight>
          </button>
        )}
      </Navbar>
    </>
  );
};

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(loginDetailActions.logout, dispatch),
    },
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
