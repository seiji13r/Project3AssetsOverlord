/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, Link } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

// Auth Components
import { BrowserRouter } from "react-router-dom"; //don't need to specify localhost url in axios http address
import Signup from "../../components_auth/SignUp";
import LoginForm from "../../components_auth/Login";
import Navbar from "../../components_auth/Navbar";
import Home from "../../components_auth/Home";
import NoMatch from "../../components_auth/NoMatch";
import axios from "axios";
import Button from "@material-ui/core/Button";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      // Auth State
      loggedIn: false,
      username: null,
      email: null
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    // Auth Methods
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    // this.logout = this.logout.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    // Auth Method - Get User
    this.getUser();
    this.setState({ redirectTo: null });
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  // Auth Methods
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
    });
  }

  renderRedirect = () => {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {/* Block Included Auth */}
        {this.renderRedirect()}
        {!this.state.loggedIn ? (
          // <BrowserRouter>
            <div className="App">
              <div className={classes.mainPanel} ref="mainPanel"></div>
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
                {/* <Route component={NoMatch} /> */}
              </Switch>
            </div>
          // </BrowserRouter>
        ) : (
          <div>
            <Sidebar
              routes={dashboardRoutes}
              logoText={"Creative Tim"}
              logo={logo}
              image={image}
              handleDrawerToggle={this.handleDrawerToggle}
              open={this.state.mobileOpen}
              color="blue"
              {...rest}
            />
            <div className={classes.mainPanel} ref="mainPanel">
              {/* <section className="navbar-section">
                <Link
                  to="/"
                  onClick={this.logout}
                >
                  <Button color="inherit">Logout</Button>
                </Link>
              </section> */}
              <Header
                updateUser={this.updateUser}
                routes={dashboardRoutes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
              />
              {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
              {this.getRoute() ? (
                <div className={classes.content}>
                  <div className={classes.container}>{switchRoutes}</div>
                </div>
              ) : (
                <div className={classes.map}>{switchRoutes}</div>
              )}
              {this.getRoute() ? <Footer /> : null}
            </div>
          </div>
        )};
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
