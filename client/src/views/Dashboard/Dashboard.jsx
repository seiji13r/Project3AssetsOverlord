import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

// import { dailySalesChart, completedTasksChart } from "variables/charts.jsx";
import { animation, options } from "variables/charts.jsx";
import API from "../../utils/api";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0,
    labels: [],
    series: {
      reader1: [],
      reader2: []
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  randomDataSets = () => {
    const reader1 = [];
    const reader2 = [];

    this.state.labels.forEach(() => {
      reader1.push(Math.floor(Math.random() * 100));
      reader2.push(Math.floor(Math.random() * 100));
    });

    this.setState({
      series: { reader1: [reader1], reader2: [reader2] }
    });
  };

  componentDidMount() {
    //this.swapDataSets();
    API.getCategories().then(response => {
      const labels = response.data.map(item => item.category);
      this.setState(
        {
          labels
        },
        () => {
          setInterval(this.randomDataSets, 2000);
        }
      );
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    series: this.state.series.reader1,
                    labels: this.state.labels
                  }}
                  type="Bar"
                  options={options}
                  listener={animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Entries</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    series: this.state.series.reader2,
                    labels: this.state.labels
                  }}
                  type="Bar"
                  options={options}
                  listener={animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Exits</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Last readings</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="info"
                  tableHead={["ID", "Name", "Sensor", "Date"]}
                  tableData={[
                    ["1", "Product name", "Category", "12"],
                    ["2", "Product 2", "Category", "23"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Product Stats</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Category", "Stock"]}
                  tableData={[
                    ["1", "Product name", "Category", "12"],
                    ["2", "Product 2", "Category", "23"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
