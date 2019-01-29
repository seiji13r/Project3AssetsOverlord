import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

// Auth Components
import { BrowserRouter } from "react-router-dom"; //don't need to specify localhost url in axios http address
import Signup from "./components_auth/SignUp";
import LoginForm from "./components_auth/Login";
import Navbar from "./components_auth/Navbar";
import Home from "./components_auth/Home";
import NoMatch from "./components_auth/NoMatch";
import axios from "axios";

const hist = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      email: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/auth/").then(response => {
      console.log("Get user response: ");
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })``
  }

  displayDashboard = loggedIn => {
    if (!loggedIn) {
      return (
        <BrowserRouter>
          <div className="App">
            <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
            {/* greet user if logged in: */}
            {this.state.loggedIn && <p>Join the party, {this.state.username}!</p>}
            {/* Routes to different components */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/login"
                render={() => <LoginForm updateUser={this.updateUser} />}
              />
              <Route path="/signup" render={() => <Signup />} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <Router history={hist}>
          <Switch>
            {indexRoutes.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </Router>
      );
    }
  };

  render() {
    return <div>{this.displayDashboard(this.state.loggedIn)}</div>;
  }
}

export default App;
