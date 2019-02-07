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
import ReadersTable from "../../components/Tables/ReadersTable";

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
    const labelClass = this.state.id ? "active" : "";
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
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="reader_name"
                        type="text"
                        name="name"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.name}
                        required
                      />
                      <label htmlFor="reader_name" className={labelClass}>
                        Name
                      </label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="reader_mac"
                        type="text"
                        name="mac"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.mac}
                        required
                      />
                      <label htmlFor="reader_mac" className={labelClass}>
                        MAC Address
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="reader_ip"
                        type="text"
                        name="ip"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.ip}
                        required
                      />
                      <label htmlFor="reader_ip" className={labelClass}>
                        IP Address
                      </label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="reader_firmware"
                        type="text"
                        name="firmware"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.firmware}
                      />
                      <label htmlFor="reader_firmware" className={labelClass}>
                        Firmware
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="reader_antenna"
                        type="text"
                        name="antenna_port"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.antenna_port}
                        required
                      />
                      <label htmlFor="antenna_port" className={labelClass}>
                        Antenna Port
                      </label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="reader_brand"
                        type="text"
                        name="brand"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.brand}
                      />
                      <label htmlFor="reader_brand" className={labelClass}>
                        Brand
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        id="reader_model"
                        type="text"
                        name="model"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.model}
                        required
                      />
                      <label htmlFor="reader_model" className={labelClass}>
                        Model
                      </label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="reader_location"
                        type="text"
                        name="location"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.location}
                      />
                      <label htmlFor="reader_location" className={labelClass}>
                        Location
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="reader_notes"
                        type="text"
                        name="notes"
                        className="validate"
                        onChange={this.handleInputChange}
                        value={this.state.notes}
                        required
                      />
                      <label htmlFor="reader_notes" className={labelClass}>
                        Notes
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <button
                        type="submit"
                        className="btn waves-effect waves-light"
                      >
                        Save
                        <i className="material-icons right">send</i>
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn waves-effect waves-light blue-grey lighten-5 black-text"
                        onClick={this.handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </CardBody>
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
                  <button
                    type="button"
                    className="btn waves-effect purple"
                    onClick={this.handleAddClick}
                  >
                    Add a reader
                    <i className="material-icons right">add</i>
                  </button>
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

export default withStyles(styles)(ReadersPage);
