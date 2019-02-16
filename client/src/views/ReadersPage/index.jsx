import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Add from "@material-ui/icons/Add";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PlayArrow from "@material-ui/icons/PlayArrow";
import ReadersTable from "../../components/Tables/ReadersTable";

import axios from "axios";

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
    form_action: "",
    readers: [],
    name: "",
    mac: "",
    ip: "",
    firmware: "",
    antenna_port: "",
    brand: "",
    model: "",
    location: "",
    notes: "",
    id: undefined
  };

  getReaders = () => {
    axios.get("/api/readers").then(response => {
      let readers = response.data.map(
        ({
          name,
          mac,
          ip,
          firmware,
          antenna_port,
          brand,
          model,
          location,
          notes,
          id
        }) => {
          return {
            name,
            mac,
            ip,
            firmware,
            antenna_port,
            brand,
            model,
            location,
            notes,
            id
          };
        }
      );

      this.setState({
        readers
      });
    });
  };

  componentDidMount() {
    this.getReaders();
  }

  handleAddClick = event => {
    event.preventDefault();
    this.setState({
      form_action: "Add a reader",
      name: "",
      mac: "",
      ip: "",
      firmware: "",
      antenna_port: "",
      brand: "",
      model: "",
      location: "",
      notes: "",
      id: undefined
    });
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({
      form_action: ""
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleUpdateClick = id => {
    axios.get(`/api/readers/${id}`).then(response => {
      const {
        name,
        mac,
        ip,
        firmware,
        antenna_port,
        brand,
        model,
        location,
        notes,
        id
      } = response.data;

      this.setState({
        name,
        mac,
        ip,
        firmware,
        antenna_port,
        brand,
        model,
        location,
        notes,
        id,
        form_action: "Update reader"
      });
    });
  };

  handleDeleteClick = id => {
    axios.delete(`/api/readers/${id}`).then(() => {
      this.getReaders();
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.id) {
      this.handleUpdate();
    } else {
      this.handleCreate();
    }
  };

  handleUpdate = () => {
    axios
      .put("/api/readers", {
        name: this.state.name,
        mac: this.state.mac,
        ip: this.state.ip,
        firmware: this.state.firmware,
        antenna_port: this.state.antenna_port,
        brand: this.state.brand,
        model: this.state.model,
        location: this.state.location,
        notes: this.state.notes,
        id: this.state.id
      })
      .then(() => {
        this.getReaders();
        this.setState({
          form_action: "",
          name: "",
          mac: "",
          ip: "",
          firmware: "",
          antenna_port: "",
          brand: "",
          model: "",
          location: "",
          notes: "",
          id: undefined
        });
      });
  };

  handleCreate = () => {
    axios
      .post("/api/readers", {
        name: this.state.name,
        mac: this.state.mac,
        ip: this.state.ip,
        firmware: this.state.firmware,
        antenna_port: this.state.antenna_port,
        brand: this.state.brand,
        model: this.state.model,
        location: this.state.location,
        notes: this.state.notes
      })
      .then(() => {
        this.getReaders();
        this.setState({
          form_action: "",
          name: "",
          mac: "",
          ip: "",
          firmware: "",
          antenna_port: "",
          brand: "",
          model: "",
          location: "",
          notes: "",
          id: undefined
        });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        {this.state.form_action !== "" ? (
          <GridItem xs={12} sm={12} md={12}>
            <form onSubmit={this.handleSubmit}>
              <Card>
                <CardHeader color="success">
                  <h4 className={classes.cardTitleWhite}>
                    {this.state.form_action}
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_name">Name</InputLabel>
                        <Input
                          id="reader_name"
                          type="text"
                          name="name"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.name}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_mac">
                          MAC Address
                        </InputLabel>
                        <Input
                          id="reader_mac"
                          type="text"
                          name="mac"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.mac}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_ip">IP Address</InputLabel>
                        <Input
                          id="reader_ip"
                          type="text"
                          name="ip"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.ip}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_firmware">
                          Firmware
                        </InputLabel>
                        <Input
                          id="reader_firmware"
                          type="text"
                          name="firmware"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.firmware}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_antenna">
                          Antenna Port
                        </InputLabel>
                        <Input
                          id="reader_antenna"
                          type="text"
                          name="antenna_port"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.antenna_port}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_brand">Brand</InputLabel>
                        <Input
                          id="reader_brand"
                          type="text"
                          name="brand"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.brand}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_model">Model</InputLabel>
                        <Input
                          id="reader_model"
                          type="text"
                          name="model"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.model}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_location">
                          Location
                        </InputLabel>
                        <Input
                          id="reader_location"
                          type="text"
                          name="location"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.location}
                          required
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="reader_notes">Notes</InputLabel>
                        <Input
                          id="reader_notes"
                          type="text"
                          name="notes"
                          className="validate"
                          onChange={this.handleInputChange}
                          value={this.state.notes}
                          required
                        />
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <p>
                    <Button type="submit" color="success">
                      <PlayArrow />
                      Save
                    </Button>
                    <Button type="button" onClick={this.handleCancelClick}>
                      Cancel
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        ) : (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Reader List</h4>
              </CardHeader>
              <CardBody>
                <p className="right-align">
                  <Button
                    type="button"
                    onClick={this.handleAddClick}
                    color="primary"
                  >
                    <Add />
                    Add a product
                  </Button>
                </p>
                <ReadersTable
                  tableHeaderColor="primary"
                  tableHead={[
                    "Name",
                    "Mac",
                    "IP",
                    "Firmware",
                    "Antenna Port",
                    "Brand",
                    "Model",
                    "Location",
                    "Notes"
                  ]}
                  tableData={this.state.readers}
                  onUpdateClick={this.handleUpdateClick}
                  onDeleteClick={this.handleDeleteClick}
                />
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    );
  }
}

ReadersPage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(ReadersPage);
