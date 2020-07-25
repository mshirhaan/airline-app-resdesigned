import React from "react";
import { connect } from "react-redux";
import * as loginDetailActions from "../../redux/actions/loginDetailActions";
import { Form, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
/* eslint react/prop-types: 0 */

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
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
    let credential = Object.entries(this.props.credentialDetails)
      .filter(
        ([, credential]) =>
          credential.email === this.state.user.email &&
          credential.password === this.state.user.password
      )
      .map(([, credential]) => credential)[0];

    if (credential != undefined) {
      let loginDetails = {
        isLoggedIn: "",
        loggedInRole: "",
        loggedInEmail: "",
        loggedInName: "",
      };
      loginDetails.isLoggedIn = true;
      loginDetails.loggedInEmail = credential.email;
      loginDetails.loggedInName = credential.firstName;
      loginDetails.loggedInRole = credential.roleName;
      loginDetails.disableGoogleLogin = true;
      this.props.actions.login(loginDetails);
      this.props.history.push("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={this.handleChangeEvent}
          value={this.state.user.email}
          required
        />
        <br />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={this.handleChangeEvent}
          value={this.state.user.password}
          required
        />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    );
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
      login: bindActionCreators(loginDetailActions.login, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
