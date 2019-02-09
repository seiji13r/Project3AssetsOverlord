import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.jsx";
import { bindCallback } from "rxjs";

const styles = {
  ...cardImagesStyles,
  textWhite: {
    "&, & *": {
      color: "#FFF"
    }
  }
};

class CardsImages extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div id="welcomePage">
      <Card id="welcomeCard" style={{ width: "350px" }}>
      <img
        className={classes.cardImgTop}
        alt="RFID"
        style={{ height: "150px", width: "350px", display: "block" }}
        src="https://cdn.mikroe.com/knowlegebase/uploads/2016/11/04175029/rfid.jpg"
        data-holder-rendered="true"
      />
      <CardBody>
        <div>
        <h2 id="welcometitle">
          Welcome to your inventory managing system.</h2>
         <h3> It provides 98% accuracy on your product records. 
        </h3>
        </div>
      </CardBody>
    </Card> 
    </div>
    );
  }
}

export default withStyles(styles)(CardsImages);