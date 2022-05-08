import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import Authentication from "../../pages/Authentication";
// import Navbar from "../Navbar";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/authentication" component={Authentication} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
