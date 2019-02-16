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

let interval = null;

class Dashboard extends React.Component {
  state = {
    value: 0,
    categories: [],
    tableInfo: {
      reader1: [],
      reader2: []
    },
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

  getDashoardInfo = () => {
    API.getDashboardInfo().then(result => {
      this.composeChartDataSets(result.data.summary);
      this.composeTableData(result.data.tablesInfo);
    });
  };

  composeChartDataSets = summary => {
    const categoryCount = this.state.categories.length;
    const reader1 = Array(categoryCount).fill(0);
    const reader2 = Array(categoryCount).fill(0);

    summary.forEach(record => {
      const index = this.categoryIndex(record.category);
      if (record.antenna_port === "1") {
        reader1[index] += record.count;
      } else {
        reader2[index] += record.count;
      }
    });

    this.setState({
      series: {
        reader1: [reader1],
        reader2: [reader2]
      }
    });
  };

  composeTableData = tableInfo => {
    const reader1 = [];
    const reader2 = [];

    tableInfo.forEach(record => {
      const row = [record.epc, record.name, record.category];

      if (record.antenna_port === "1") {
        reader1.push(row);
      } else {
        reader2.push(row);
      }
    });

    this.setState({
      tableInfo: {
        reader1,
        reader2
      }
    });
  };

  categoryIndex = categoryName => {
    return this.state.categories.findIndex(
      category => categoryName == category
    );
  };

  componentDidMount() {
    API.getCategories().then(response => {
      const categories = response.data.map(item => item.category);
      this.setState(
        {
          categories
        },
        () => {
          interval = setInterval(this.getDashoardInfo, 2000);
        }
      );
    });
  }

  componentWillUnmount() {
    clearInterval(interval);
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
                    labels: this.state.categories
                  }}
                  type="Bar"
                  options={options}
                  listener={animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Entries</h4>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    series: this.state.series.reader2,
                    labels: this.state.categories
                  }}
                  type="Bar"
                  options={options}
                  listener={animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Exits</h4>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>
                  Entries ({this.state.tableInfo.reader1.length})
                </h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="info"
                  tableHead={["EPC", "Name", "Category"]}
                  tableData={this.state.tableInfo.reader1}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>
                  Exits ({this.state.tableInfo.reader2.length})
                </h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["EPC", "Name", "Category"]}
                  tableData={this.state.tableInfo.reader2}
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
