import firebase from "firebase/app";
import "firebase/firebase-auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React from "react";
import * as loginDetailActions from "../redux/actions/loginDetailActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
/* eslint react/prop-types: 0 */

firebase.initializeApp({
  apiKey: "AIzaSyAiq795jTX4WdxoQ0BBTngegXF0j-m76_g",
  authDomain: "airline-app-f08ea.firebaseapp.com",
});

class Auth extends React.Component {
  state = {
    isSignedIn: false,

    loginDetails: {
      isLoggedIn: "",
      loggedInRole: "",
      loggedInEmail: "",
      loggedInName: "",
    },
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user }, () => {
        let loginDetails = {
          isLoggedIn: "",
          loggedInRole: "",
          loggedInEmail: "",
          loggedInName: "",
        };
        if (this.state.isSignedIn === true) {
          loginDetails.isLoggedIn = true;
          loginDetails.loggedInEmail = user.email;
          loginDetails.loggedInName = user.displayName;
          loginDetails.loggedInRole = Object.entries(this.props.roles)
            .filter(([, role]) => role.email === user.email)
            .map(([, role]) => role.roleName)[0];

          this.setState({ loginDetails });
          this.props.actions.login(loginDetails);
          this.props.history.push("/");
        } else {
          loginDetails.isLoggedIn = false;
          loginDetails.loggedInEmail = "";
          loginDetails.loggedInName = "";
          loginDetails.loggedInRole = "";
          this.props.actions.logout(loginDetails);
          this.setState({ loginDetails });
        }
      });
    });
  };
  render() {
    return (
      <div className="Auth">
        {this.state.isSignedIn ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => firebase.auth().signOut()}
            >
              Sign out!
            </button>
          </>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
    roles: state.roles,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      login: bindActionCreators(loginDetailActions.login, dispatch),
      logout: bindActionCreators(loginDetailActions.logout, dispatch),
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
