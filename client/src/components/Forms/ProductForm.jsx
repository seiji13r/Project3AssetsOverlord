import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardTitle: "",
      id: undefined,
      name: "",
      sku: "",
      category: "",
      epc: ""
    };
  }

  showInsert() {
    this.setState({
      cardTitle: "Add a product",
      id: undefined,
      name: "",
      sku: "",
      category: "",
      epc: ""
    });
  }

  showEdit(id) {
    axios.get(`/api/products/${id}`).then(response => {
      const { name, sku, category, epc, id } = response.data;

      this.setState({
        cardTitle: "Update product",
        id,
        name,
        sku,
        category,
        epc
      });
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
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

  handleCreate = () => {
    axios
      .post("/api/products", {
        name: this.state.name,
        sku: this.state.sku,
        category: this.state.category,
        epc: this.state.epc
      })
      .then(() => {
        this.props.getProducts();
      });
  };

  handleUpdate = () => {
    axios
      .put("/api/products", {
        name: this.state.name,
        sku: this.state.sku,
        category: this.state.category,
        epc: this.state.epc,
        id: this.state.id
      })
      .then(() => {
        this.props.getProducts();
      });
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.props.hideForm();
  };

  render() {
    const { classes } = this.props;
    const labelClass = this.state.id ? "active" : "";

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>{this.state.cardTitle}</h4>
          </CardHeader>
          <CardBody>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="product_name"
                  type="text"
                  name="name"
                  className="validate"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  required
                />
                <label htmlFor="product_name" className={labelClass}>
                  Name
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  id="product_sku"
                  type="text"
                  name="sku"
                  className="validate"
                  onChange={this.handleInputChange}
                  value={this.state.sku}
                  required
                />
                <label htmlFor="product_sku" className={labelClass}>
                  SKU
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="product_category"
                  type="text"
                  name="category"
                  className="validate"
                  onChange={this.handleInputChange}
                  value={this.state.category}
                  required
                />
                <label htmlFor="product_category" className={labelClass}>
                  Category
                </label>
              </div>
              <div className="input-field col s6">
                <input
                  id="product_epc"
                  type="text"
                  name="epc"
                  className="validate"
                  onChange={this.handleInputChange}
                  value={this.state.epc}
                />
                <label htmlFor="product_epc" className={labelClass}>
                  EPC
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button type="submit" className="btn waves-effect waves-light">
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
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object,
  getProducts: PropTypes.func,
  hideForm: PropTypes.func
};

export default ProductForm;
