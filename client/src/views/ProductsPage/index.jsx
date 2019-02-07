import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import axios from "axios";
import ProductsTable from "../../components/Tables/ProductsTable";
import ProductForm from "../../components/Forms/ProductForm";
import styles from "./styles";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayForm: false,
      products: []
    };

    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.getProducts();
  }

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
        displayForm: false,
        products
      });
    });
  };

  hideForm = () => {
    this.setState({
      displayForm: false
    });
  };

  handleAddClick = event => {
    event.preventDefault();
    this.setState({ displayForm: true }, () => {
      this.formRef.current.showInsert();
    });
  };

  handleUpdateClick = id => {
    this.setState({ displayForm: true }, () => {
      this.formRef.current.showEdit(id);
    });
  };

  handleDeleteClick = id => {
    axios.delete(`/api/products/${id}`).then(() => {
      this.getProducts();
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <GridContainer>
        {this.state.displayForm ? (
          <GridItem xs={12} sm={12} md={12}>
            <ProductForm
              classes={classes}
              ref={this.formRef}
              getProducts={this.getProducts}
              hideForm={this.hideForm}
            />
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
