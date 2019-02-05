import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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

class AuthLogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      messages: {},
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
    event.preventDefault()
    console.log('handleSubmit')

    axios
      .post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log('login response: ');
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateAppState({
            loggedIn: true,
            user: response.data.username,
            email: response.data.email
          });
          this.props.updateRoutes();
          // update the state to redirect to home
          this.setState({
            errorMsg: "Welcome!!",
            redirectTo: "/"
          });
        }
      })
      .catch(error => {
        console.log('login error: ');
        console.log(error);
        this.setState({
          errorMsg: "Bad Credentials, Try Again"
        });
      });
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
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="display1">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={this.state.email}
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
                value={this.state.password}
                onChange={this.handleChange}
                autoComplete="current-password"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

AuthLogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthLogIn);