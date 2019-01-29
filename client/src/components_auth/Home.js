import React, { Component } from "react";

class Home extends Component {
  render() {
    const imageStyle = {
      width: 400
    };

    return (
      <div>
        <p>
          This is the Landing Welcome Page @
          <strong>components_auth/Home.js</strong>
        </p>
        <img
          style={imageStyle}
          src="https://www.aures.com/var/aures/storage/images/news-hardware-pos-retail/is-rfid-technology-the-future-of-pos/35736-1-eng-GB/Is-RFID-Technology-the-Future-of-POS_s1.png"
          alt="Welcome RFID"
        />
      </div>
    );
  }
}

export default Home
