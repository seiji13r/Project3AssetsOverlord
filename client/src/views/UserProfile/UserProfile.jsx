import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// import avatar from "assets/img/faces/marc.jpg";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import axios from "axios";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      email: "",
      username: "",
      role: "",
      image_link: "",
      company: "",
      first_name: "",
      last_name: "",
      city: "",
      country: "",
      postal_code: "",
      about_me: "",
      updateMsg: null,
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
    event.preventDefault();
    console.log(this.state);
    const { id, company, image_link, first_name, last_name, city, country, about_me } = this.state;
    const user_info = {
      id,
      company,
      image_link,
      first_name,
      last_name,
      city,
      country,
      about_me
    };
    console.log("Click Handle Submit", user_info);

    axios
      .put("/auth/user", user_info)
      .then(response => {
        console.log("Auth User PUT response", response);
        this.setState({
          updateMsg: "Profile Successfully Updated"
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("In Component did mount function");
    this.getUserInfo();
  }

  getUserInfo = () => {
    console.log("Loading the User in UserProfile Page");
    axios
      .get("/auth/")
      .then(res => {
        // console.log("Get user response: ");
        console.log("Here", res.data);
        this.setState({
          id: res.data.user.id,
          email: res.data.user.email,
          username: res.data.user.username,
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          image_link: res.data.user.image_link,
          about_me: res.data.user.about_me,
          company: res.data.user.company,
          city: res.data.user.city,
          country: res.data.user.country
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <form onSubmit={this.handleSubmit}>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                  <p className={classes.cardCategoryWhite}>Complete your profile</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="company">Company</InputLabel>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="company"
                          value={this.state.company}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          disabled
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          disabled
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="first_name">First Name</InputLabel>
                        <Input
                          id="first_name"
                          name="first_name"
                          type="text"
                          autoComplete="first_name"
                          value={this.state.first_name}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="last_name">Last Name</InputLabel>
                        <Input
                          id="last_name"
                          name="last_name"
                          type="text"
                          autoComplete="last_name"
                          value={this.state.last_name}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={2}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="city"
                          value={this.state.city}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <Input
                          id="country"
                          name="country"
                          type="text"
                          autoComplete="country"
                          value={this.state.country}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="image_link">Image Link</InputLabel>
                        <Input
                          id="image_link"
                          name="image_link"
                          type="text"
                          autoComplete="image_link"
                          value={this.state.image_link}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel htmlFor="about_me" style={{ color: "#AAAAAA" }}>About me</InputLabel>
                      <FormControl margin="normal" required fullWidth>
                        <Input
                          id="about_me"
                          name="about_me"
                          type="text"
                          autoComplete="about_me"
                          value={this.state.about_me}
                          onChange={this.handleChange}
                          autoFocus
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Update Profile</Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {this.state.image_link.includes("http") ? (
                    <img src={this.state.image_link} alt="..." />
                  ) : (
                    <img
                      src="https://i1.wp.com/www.royalsmushicafe.dk/wp-content/uploads/2016/02/Profile-Placeholder.jpg"
                      alt="..."
                    />
                  )}
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.first_name} {this.state.last_name}</h6>
                <p className={classes.description}>{this.state.about_me}</p>
              </CardBody>
            </Card>
            {this.state.updateMsg ? (
              <SnackbarContent message={this.state.updateMsg} color="success"/>
            ) : (
              ""
            )}
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
