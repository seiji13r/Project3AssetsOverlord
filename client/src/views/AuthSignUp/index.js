import React from "react";
import PropTypes from "prop-types";
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { Redirect } from "react-router-dom";
import axios from "axios";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class AuthSignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      passwdconf: "",
      errorMsg: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit(event) {
    console.log('sign-up handleSubmit, username: ')
    event.preventDefault();

    //request to server to add a new username/password
    axios.post('/auth/signup', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        passwdconf: this.state.passwdconf
      })
      .then(response => {
        console.log(response)
        if (!response.data.error) {
          console.log('successful signup')
          this.setState({
            redirectTo: "/login" //redirect to login page
          });
        } else {
          // if (response.data.error.includes("email")) {
          //   console.log('Email Already Taken');
          // } else if (response.data.error.includes("username")) {
          //   console.log('Username Already Taken');
          // }
          this.setState({
            errorMsg: response.data.error
          });
        }
      })
      .catch(error => {
        console.log('signup error: ');
        console.log(error);
        this.setState({
          errorMsg: error
        });
      })
  }

  renderRedirect = () => {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        {this.renderRedirect()}
        {this.state.errorMsg ? (
          <Paper className={classes.paper}>{this.state.errorMsg}</Paper>
        ) : (
          ""
        )}
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="display1">
            Sign Up
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input 
                id="email" 
                name="email"
                type="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={this.state.username}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwdconf">Confirm Password</InputLabel>
              <Input
                name="passwdconf"
                type="password"
                id="passwdconf"
                autoComplete="current-password"
                value={this.state.passwdconf}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AuthSignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthSignUp);