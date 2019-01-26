import React from "react";
import API from "utils/api";

class SanityCheck extends React.Component {
  state = {
    message: ""
  };

  componentDidMount() {
    API.sanityCheck().then(res => {
      this.setState({ message: res.data });
    });
  }

  render() {
    return <span>{this.state.message}</span>;
  }
}

export default SanityCheck;
