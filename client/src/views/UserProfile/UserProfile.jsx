import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";

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
    console.log(this.state)
    const { id, company, image_link, first_name, last_name } = this.state;
    const user_info = {
      id,
      company,
      image_link,
      first_name,
      last_name
    };
    console.log("Click Handle Submit", user_info);

    axios
      .put("/auth/user", user_info)
      .then(response => {
        console.log("Auth User PUT response", response);
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
                      <CustomInput
                        labelText="Company"
                        id="company-disabled"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "company",
                          // value: this.state.company,
                          // onChange: this.handleInputChange
                        }}
                        value={this.state.company}
                        onChange={this.handleInputChange}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Username"
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          name: "username",
                          value: this.state.username,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: true,
                          name: "email",
                          value: this.state.email,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "first_name",
                          value: this.state.first_name,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "last_name",
                          value: this.state.last_name,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="City"
                        id="city"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "city",
                          value: this.state.city,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Country"
                        id="country"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "country",
                          value: this.state.country,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        labelText="Image Link"
                        id="image-link"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          disabled: false,
                          name: "image_link",
                          value: this.state.image_link,
                          onChange: this.handleInputChange
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                      <CustomInput
                        labelText={this.state.about_me}
                        id="about-me"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 5,
                          disabled: false,
                          name: "about_me",
                          value: this.state.about_me,
                          onChange: this.handleInputChange
                        }}
                      />
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
                  <img src={this.state.image_link} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.first_name} {this.state.last_name}</h6>
                <p className={classes.description}>{this.state.about_me}</p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfile);
