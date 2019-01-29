import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import axios from "axios";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Navbar extends Component {
  logout(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log("logging out");
    axios
      .post("/auth/logout")
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Logout error", error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    // eslint-disable-next-line no-console
    console.log("navbar render, props: ");
    // eslint-disable-next-line no-console
    console.log(this.props);

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className="col-4">
              {loggedIn ? (
                <section className="navbar-section">
                  <Link
                    to="#"
                    className="btn btn-link text-secondary"
                    onClick={this.logout}
                  >
                    <Button color="inherit">Logout</Button>
                  </Link>
                </section>
              ) : (
                <section className="navbar-section">
                  <Link to="/">
                    <Button color="inherit">Home</Button>
                  </Link>

                  <Link to="/login">
                    <Button color="inherit">Login</Button>
                  </Link>

                  <Link to="/signup" className="btn btn-link">
                    <Button color="inherit">Sign Up</Button>
                  </Link>
                </section>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  updateUser: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
};

export default Navbar;
