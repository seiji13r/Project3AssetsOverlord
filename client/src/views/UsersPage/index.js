import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";
import UsersTable from "../../components/Tables/UsersTable";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class UsersPage extends React.Component {
  state = {
    id: undefined
  };

  getUsers = () => {
    axios.get("/auth/users").then(response => {
      // console.log(response.data)
      // let users = response.data.map(
      //   ({
      //     email,
      //     username,
      //     first_name,
      //     last_name,
      //     company,
      //     country,
      //     city,
      //     id
      //   }) => {
      //     return {
      //       email,
      //       username,
      //       first_name,
      //       last_name,
      //       company,
      //       country,
      //       city,
      //       id
      //     };
      //   }
      // );

      let users = response.data;
      this.setState({
        users
      });
    });
  };

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Users List</h4>
            </CardHeader>
            <CardBody>
              {this.state.users ? (
                <UsersTable
                  tableHeaderColor="primary"
                  tableHead={[
                    "Email",
                    "Username",
                    "First Name",
                    "Last Name",
                    "Company",
                    "Country",
                    "City"
                  ]}
                  tableData={this.state.users}
                  // tableData={[{email: "user@user.com"}]}
                />
              ) : (
                ""
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(UsersPage);
