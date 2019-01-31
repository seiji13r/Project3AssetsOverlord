/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
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

// const switchRoutes = (
//   <Switch>
//     {this.state.allowedRoutes.map((prop, key) => {
//       if (prop.redirect)
//         return <Redirect from={prop.path} to={prop.to} key={key} />;
//       return <Route path={prop.path} component={prop.component} key={key} appstate={this.state}/>;
//     })}
//   </Switch>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      mobileOpen: false,
      allowedRoutes: []
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    // New Addition
    this.updateAppState = this.updateAppState.bind(this);
  }
  // New Addition
  updateAppState(Obj) {
    this.setState(Obj);
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
    // Define a Set of path  that don´t require Authorization
    const noAuthPathsArr = ["/login", "/signup"]
    // Filter the No Auth Required Routes from the dashboard Routes
    const noAuthRoutes = dashboardRoutes.filter(element => {
      return noAuthPathsArr.includes(element.path);
    });
    // Filter the No Auth Required Routes from the dashboard Routes
    const authRoutes = dashboardRoutes.filter(element => {
      return !noAuthPathsArr.includes(element.path);
    });
    // Control Which Routes / Pages are available upon LogIn
    if(this.state.loggedIn) {
      this.setState({allowedRoutes:authRoutes});
    } else {
      this.setState({allowedRoutes:noAuthRoutes});
    }
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
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={this.state.allowedRoutes}
          logoText={"Creative Tim"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={this.state.allowedRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
                <Switch>
                  {this.state.allowedRoutes.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    // return <Route path={prop.path} component={prop.component} key={key} appstate={this.state}/>;
                    return <Route 
                              path={prop.path}
                              key={key} render={(props) => (
                                <prop.component 
                                  {...props}
                                  appState={this.state}
                                  updateAppState={this.updateAppState}
                                />
                              )}
                            />;
                    
                  })}
                </Switch>
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
              <Switch>
                {this.state.allowedRoutes.map((prop, key) => {
                  if (prop.redirect)
                    return <Redirect from={prop.path} to={prop.to} key={key} />;
                  // return <Route path={prop.path} component={prop.component} key={key} appstate={this.state}/>;
                  return <Route 
                            path={prop.path}
                            key={key} render={(props) => (
                              <prop.component 
                                {...props}
                                appState={this.state}
                                updateAppState={this.updateAppState}
                              />
                            )}
                          />;
                  
                })}
              </Switch>
            </div>
          )}
          {/* {this.getRoute() ? <Footer /> : null} */}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
