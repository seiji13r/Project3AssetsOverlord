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
import ProductsTable from "../../components/Tables/ProductsTable";

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

class ProductsPage extends React.Component {
  state = {
    form_action: "",
    products: [],
    name: "",
    sku: "",
    category: "",
    epc: "",
    id: undefined
  };

  getProducts = () => {
    axios.get("/api/products").then(response => {
      let products = response.data.map(({ name, sku, category, epc, id }) => {
        return {
          id,
          name,
          sku,
          category,
          epc
        };
      });

      this.setState({
        products
      });
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  handleAddClick = event => {
    event.preventDefault();
    this.setState({
      form_action: "Add a product",
      name: "",
      sku: "",
      category: "",
      epc: "",
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
    axios.get(`/api/products/${id}`).then(response => {
      const { name, sku, category, epc, id } = response.data;

      this.setState({
        id,
        name,
        sku,
        category,
        epc,
        form_action: "Update product"
      });
    });
  };

  handleDeleteClick = id => {
    axios.delete(`/api/products/${id}`).then(() => {
      this.getProducts();
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
      .put("/api/products", {
        name: this.state.name,
        sku: this.state.sku,
        category: this.state.category,
        epc: this.state.epc,
        id: this.state.id
      })
      .then(() => {
        this.getProducts();
        this.setState({
          form_action: "",
          name: "",
          sku: "",
          category: "",
          epc: "",
          id: undefined
        });
      });
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
        this.getProducts();
        this.setState({
          form_action: "",
          name: "",
          sku: "",
          category: "",
          epc: "",
          id: undefined
        });
      });
  };

  render() {
    const { classes } = this.props;
    const labelClass = this.state.id ? "active" : "";
    return (
      <GridContainer>
        {this.state.form_action != "" ? (
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
                <h4 className={classes.cardTitleWhite}>Product List</h4>
              </CardHeader>
              <CardBody>
                <p className="right-align">
                  <button
                    type="button"
                    className="btn waves-effect purple"
                    onClick={this.handleAddClick}
                  >
                    Add a product
                    <i className="material-icons right">add</i>
                  </button>
                </p>
                <ProductsTable
                  tableHeaderColor="primary"
                  tableHead={["Name", "SKU", "Category", "EPC", "Action"]}
                  tableData={this.state.products}
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

export default withStyles(styles)(ProductsPage);
