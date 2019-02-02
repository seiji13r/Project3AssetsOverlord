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
        epc
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
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <label>SKU</label>
            <input
              className="form-control"
              name="sku"
              value={this.state.sku}
              onChange={this.handleInputChange}
            />
            <label>Category</label>
            <input
              className="form-control"
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            />
            <label>EPC</label>
            <input
              className="form-control"
              name="epc"
              value={this.state.epc}
              onChange={this.handleInputChange}
            />
            <button type="submit">Save</button>
          </form>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Product List</h4>
            </CardHeader>
            <CardBody>
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
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ProductsPage);
