import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AdminPage from "./admin/AdminPage";
import StaffPage from "./staff/StaffPage";
import Header from "./common/Header";
import Footer from "./common/Footer";
import PageNotFound from "./PageNotFound";
import { connect } from "react-redux";
import "./App.css";
import Login from "./home/Login";
import Signup from "./home/Signup";
/* eslint react/prop-types: 0 */

const App = (props) => {
  const [isLoggedIn, setLoginIn] = useState(false);

  let routes = (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route component={PageNotFound} />
    </Switch>
  );
  if (props.loginDetails.loggedInRole === "admin") {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route component={PageNotFound} />
      </Switch>
    );
  } else if (props.loginDetails.loggedInRole === "staff") {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/staff" component={StaffPage} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
  return (
    <div className="container-fluid">
      <div className="page-container">
        <div className="content-wrap">
          <Header isLoggedIn={isLoggedIn} setLoginIn={setLoginIn} />
          <div className="testt">{routes}</div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
  };
}

export default connect(mapStateToProps)(App);
