import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import FormControl from "@material-ui/core/FormControl";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import PlayArrow from "@material-ui/icons/PlayArrow";
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

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>{this.state.cardTitle}</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={5}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="product_name">Name</InputLabel>
                  <Input
                    id="product_name"
                    type="text"
                    name="name"
                    className="validate"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="product_sku">SKU</InputLabel>
                  <Input
                    id="product_sku"
                    type="text"
                    name="sku"
                    className="validate"
                    onChange={this.handleInputChange}
                    value={this.state.sku}
                    required
                  />
                </FormControl>
              </GridItem>

              <GridItem xs={12} sm={12} md={5}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="product_category">Category</InputLabel>
                  <Input
                    id="product_category"
                    type="text"
                    name="category"
                    className="validate"
                    onChange={this.handleInputChange}
                    value={this.state.category}
                    required
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="product_epc">EPC</InputLabel>
                  <Input
                    id="product_epc"
                    type="text"
                    name="epc"
                    className="validate"
                    onChange={this.handleInputChange}
                    value={this.state.epc}
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
    );
  }
}

ProductForm.propTypes = {
  classes: PropTypes.object,
  getProducts: PropTypes.func,
  hideForm: PropTypes.func
};

export default ProductForm;
