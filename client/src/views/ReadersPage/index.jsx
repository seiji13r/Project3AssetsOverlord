import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

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

class ReadersPage extends React.Component {
  state = {
    readers: [
      // {
      //   name: "reader1",
      //   mac: "12:ab:cd:ef:gh",
      //   ip: "192.168.1.1",
      //   firmware: "firmware1",
      //   antennas: "2",
      //   brand: "brand1",
      //   model: "model1",
      //   location: "location1",
      //   notes: "notes1"
      // },
      // {
      //   name: "reader2",
      //   mac: "34:ab:cd:ef:gh",
      //   ip: "192.168.1.2",
      //   firmware: "firmware2",
      //   antennas: "2",
      //   brand: "brand2",
      //   model: "model2",
      //   location: "location2",
      //   notes: "notes2"
      // }
    ]
  };

  // var arr2 = Object.keys(readers).map(function (i) {
  //   return readers[i];
  // });

  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Reader List</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Name",
                  "MAC",
                  "Firmware",
                  "Antennas",
                  "Brand",
                  "Model",
                  "Location",
                  "Notes"
                ]}
                tableData={this.state.readers}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ReadersPage);
