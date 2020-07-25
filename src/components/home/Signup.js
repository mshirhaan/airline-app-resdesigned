import React from "react";
import { connect } from "react-redux";
import * as signupActions from "../../redux/actions/signupActions";
import { Form, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
/* eslint react/prop-types: 0 */

class Signup extends React.Component {
  state = {
    user: {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      roleName: "admin",
    },
    isRegistered: false,
  };

  handleChangeEvent = (event) => {
    const user = {
      ...this.state.user,
      [event.target.name]: event.target.value,
    };
    this.setState({ user });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props.credentialDetails);
    let credential = Object.entries(this.props.credentialDetails)
      .filter(([, credential]) => credential.email === this.state.user.email)
      .map(([, credential]) => credential)[0];

    if (credential != undefined) {
      alert("Email already exists");
    } else {
      this.setState(
        {
          user: {
            ...this.state.user,
            id: Object.keys(this.props.credentialDetails).length + 1,
          },
        },
        () => {
          this.props.actions.signup(this.state.user);
          this.setState({ isRegistered: true });
        }
      );
    }
  };

  render() {
    if (!this.state.isRegistered) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Enter First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={this.handleChangeEvent}
            value={this.state.user.firstName}
            required
          />
          <br />
          <Form.Label>Enter Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={this.handleChangeEvent}
            value={this.state.user.lastName}
            required
          />
          <br />
          <Form.Label>Select Role</Form.Label>
          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            name="roleName"
            custom
            value={this.state.user.roleName}
            onChange={this.handleChangeEvent}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </Form.Control>

          <br />
          <Form.Label>Enter New Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChangeEvent}
            value={this.state.user.email}
            required
          />
          <br />
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={this.handleChangeEvent}
            value={this.state.user.password}
            required
          />
          <Button variant="primary" type="submit">
            Signup
          </Button>
        </Form>
      );
    } else {
      return (
        <>
          {" "}
          Successfully Registered
          <Link to="login"> Proceed to Login </Link>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
    credentialDetails: state.credentialDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      signup: bindActionCreators(signupActions.signup, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
